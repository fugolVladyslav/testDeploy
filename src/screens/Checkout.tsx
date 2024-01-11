import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import { StyledCheckoutScreens } from '../styles/screens/Checkout';
import { Field, Form, Formik } from 'formik';
import PhoneInput from 'react-phone-number-input';
import { Close } from '../assets/svg';
import { Button } from '../components/Button';
import { CheckoutProductItem } from '../components/CheckoutProductItem';
import { StyledSelectAdressModal } from '../styles/components/SelectAdressModal';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { CoordsType, getLocationInfo, handleEncodePlace } from '../components/Map/mapUtils';
import { MapPlaces } from '../components/Map/MapPlaces';
import {
  useAddShippingAdressesMutation,
  useAddShippingAdressesToOrderMutation,
  useDeleteShippingAdressMutation,
  useGetCheckoutPricesQuery,
  useGetDeliveryyRatesQuery,
  useGetShippingAdressesQuery,
  useGetShoppingCardQuery,
  useGetStripeKeysMutation,
  useValidateShippingAdressMutation,
} from '../services/auth';
import { useParams } from 'react-router-dom';
import { useToaster } from '../hooks/useToaster';
import { StyledStripePayment } from '../styles/components/StyledStripePayment';
import StripeWrapper from '../components/Stripe/StripeWrapper';
import { Loader } from '../components/Loader';

const ShippingAddressShema = Yup.object().shape({
  sender: Yup.string().required('Required.'),
  address_1: Yup.string().required('Required.'),
});

export const googleMapsApiKey: string = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

const initCenter = { lat: 43, lng: -80 };

export const Checkout: FC = () => {
  const { orderId, eventId } = useParams();
  const [phoneValue, setPhoneValue] = useState('');
  const [stripeData, setStripeData] = useState<any>({});
  const [isOpenModalStripe, setIsOpenModalStripe] = useState(false);
  const [loading, setLoading] = useState(false);

  // const [initCenter, setInitCenter] = useState<any>({ lat: 43, lng: -80 });
  const [coord, setCoord] = useState<any>({ lat: 43, lng: -80 });
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [deliveryCompanyid, setDeliveryCompanyid] = useState<any>(null);

  const [address, setAddress] = useState<string>('');
  const mapRef = useRef<google.maps.Map>();
  const { data: shippingAddress, refetch: refetchShippingAddresses } = useGetShippingAdressesQuery({});
  const { data: deliveryRatesList, refetch: refetchDeliveryRatesList } = useGetDeliveryyRatesQuery(
    {
      order_id: Number(orderId),
    },
    { skip: !orderId },
  );
  const { data: checkoutData, refetch: refetchCheckoutData } = useGetCheckoutPricesQuery(
    {
      order_id: Number(orderId),
      rate_id: deliveryCompanyid,
    },
    { skip: !orderId || !deliveryCompanyid },
  );

  useEffect(() => {
    if (deliveryCompanyid) {
      refetchCheckoutData();
    }
  }, [deliveryCompanyid]);

  const { toastTrigger, ToastAnchor } = useToaster();
  const { data: productCard } = useGetShoppingCardQuery({ id: eventId }, { skip: !eventId });
  const [addShippingAdresses] = useAddShippingAdressesMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();
  const [addShippingAdressesToOrder] = useAddShippingAdressesToOrderMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const [deleteShippingAdresses] = useDeleteShippingAdressMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const [validateShippingAdress] = useValidateShippingAdressMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const [initStripeKeys] = useGetStripeKeysMutation<{
    data: any;
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleErrors = (error: any) => {
    if (error?.response?.status === 422) {
      toastTrigger({
        message: `${
          error?.data?.detail[0].msg ? error?.data?.detail[0].msg : 'Something went wrong, please try again later'
        }`,
        type: 'error',
      });
    } else {
      toastTrigger({
        message: `${
          typeof error?.data?.detail == 'string' ? error?.data?.detail : 'Something went wrong, please try again later'
        }`,
        type: 'error',
      });
    }
  };

  const options = useMemo(
    () => ({
      mapId: '8d4d3f6d6171c09d',
      disableDefaultUI: true,
      clickableIcons: false,
      // styles: CustomMapStyle,
    }),
    [],
  );

  const addShippingAddress = async ({ sender, address_1, address_2 }: any) => {
    try {
      setLoading(true);
      await validateShippingAdress({
        address_line1: address_1,
        city_locality: locationInfo.city_locality,
        state_province: locationInfo.state_province,
        postal_code: locationInfo.postal_code,
        country_code: locationInfo.country_code,
      });
      await addShippingAdresses({
        name: sender,
        phone: phoneValue,
        address_line1: address_1,
        address_line2: address_2,
        city_locality: locationInfo.city_locality,
        state_province: locationInfo.state_province,
        postal_code: locationInfo.postal_code,
        country_code: locationInfo.country_code,
        latitude1: locationInfo.latitude,
        longitude1: locationInfo.longitude,
      }).unwrap();
      await addShippingAdressesToOrder({
        name: sender,
        phone: phoneValue,
        address_line1: address_1,
        address_line2: address_2,
        city_locality: locationInfo.city_locality,
        state_province: locationInfo.state_province,
        postal_code: locationInfo.postal_code,
        country_code: locationInfo.country_code,
        latitude1: locationInfo.latitude,
        longitude1: locationInfo.longitude,
        order_id: orderId,
      }).unwrap();
      await refetchShippingAddresses();
      await refetchDeliveryRatesList();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const formikRef = useRef<any>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleSelectAddressModal() {
    setIsOpenModal(!isOpenModal);
  }

  const handleSelectLocation = (value: string) => {
    setAddress(value);
  };

  const handleSetPlace = async (pos: CoordsType) => {
    const address = await handleEncodePlace(pos);
    handleSelectLocation(address.results[0].formatted_address);
    formikRef.current.setFieldValue('address_1', address.results[0].formatted_address);
    setLocationInfo({
      city_locality:
        getLocationInfo(address.results[0], 'locality')?.long_name ||
        getLocationInfo(address.results[0], 'sublocality')?.long_name ||
        getLocationInfo(address.results[0], 'postal_town')?.long_name ||
        '',
      state_province: getLocationInfo(address.results[0], 'administrative_area_level_1')?.short_name || '',
      postal_code: getLocationInfo(address.results[0], 'postal_code')?.long_name || '',
      latitude: address.results[0].geometry.location.lat,
      longitude: address.results[0].geometry.location.lng,
      country_code: getLocationInfo(address.results[0], 'country')?.short_name || '',
    });
    setCoord(address.results[0].geometry.location);
    return address.results[0];
  };

  const clearShippingForm = async () => {
    try {
      setLoading(true);
      await deleteShippingAdresses({
        address_id: shippingAddress?.items[0].id,
      });

      setLocationInfo(null);
      formikRef.current.setFieldValue('address_1', '');
      formikRef.current.setFieldValue('address_1', '');
      formikRef.current.setFieldValue('sender', '');
      setAddress('');
      setPhoneValue('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await refetchShippingAddresses();
      await refetchDeliveryRatesList();
    } catch (error: any) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (event: google.maps.MapMouseEvent) => {
    const pos = { lat: Number(event?.latLng?.lat()), lng: Number(event?.latLng?.lng()) };
    await handleSetPlace(pos);
  };

  const handleChooseLocation = async (pos: { lat: number; lng: number }) => {
    await handleSetPlace(pos);
    // const address = await handleSetPlace(pos);
    // mapRef.current?.panTo(address.geometry.location);
  };

  const onLoad = useCallback((map: google.maps.Map): void | Promise<void> => {
    mapRef.current = map;
  }, []);

  const addAdressToShippingFormAndOrder = async () => {
    try {
      setLoading(true);
      await addShippingAdressesToOrder({
        name: shippingAddress?.items[0]?.name,
        phone: shippingAddress?.items[0]?.phone,
        address_line1: shippingAddress?.items[0]?.address_line1,
        address_line2: shippingAddress?.items[0]?.address_line2,
        city_locality: shippingAddress?.items[0]?.city_locality,
        state_province: shippingAddress?.items[0]?.state_province,
        postal_code: shippingAddress?.items[0]?.postal_code,
        country_code: shippingAddress?.items[0]?.country_code,
        latitude1: shippingAddress?.items[0]?.latitude1,
        longitude1: shippingAddress?.items[0]?.longitude1,
        order_id: orderId,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await refetchShippingAddresses();
      await refetchDeliveryRatesList();
    } catch (error: any) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shippingAddress?.items?.length && orderId) {
      formikRef.current.setFieldValue('address_2', shippingAddress?.items[0]?.address_line2);
      formikRef.current.setFieldValue('address_1', shippingAddress?.items[0]?.address_line1);
      formikRef.current.setFieldValue('sender', shippingAddress?.items[0]?.name);
      setAddress(shippingAddress?.items[0]?.address_line1);

      setPhoneValue(shippingAddress?.items[0]?.phone);
      addAdressToShippingFormAndOrder();
    }
  }, [shippingAddress?.items]);

  useEffect(() => {
    if (!deliveryCompanyid) {
      formikRef.current.setFieldValue('delivery', deliveryRatesList?.items[0]?.rate_id);
      setDeliveryCompanyid(deliveryRatesList?.items[0]?.rate_id);
    }
  }, [deliveryRatesList?.items, orderId]);

  const handleStripeModal = () => {
    setIsOpenModalStripe((prev) => !prev);
  };

  const initStripe = async () => {
    try {
      const stripeDataResponse = await initStripeKeys({
        order_id: orderId,
        rate_id: deliveryCompanyid,
      });
      setStripeData(stripeDataResponse);
      handleStripeModal();
    } catch (error: any) {
      handleErrors(error);
    }
  };

  return (
    <StyledCheckoutScreens shippingAddressDelivery={shippingAddress?.items[0]}>
      <h3 className="title">Checkout</h3>
      <div className="container">
        <div className="form-container">
          <h2 className="title-form">DELIVERY ADDRESS</h2>
          <Formik
            initialValues={{
              sender: '',
              address_1: '',
              address_2: '',
              delivery: '',
            }}
            onSubmit={addShippingAddress}
            innerRef={formikRef}
            validationSchema={ShippingAddressShema}
          >
            {({ setFieldValue, values, errors, handleSubmit, touched }) => (
              <Form className="form">
                <div className="row">
                  <div className="column label-sender">
                    <label htmlFor="#sender">RECIPIENT NAME</label>
                    <Field
                      id="sender"
                      disabled={shippingAddress?.items[0]}
                      name="sender"
                      type="text"
                      className="input-text"
                      placeholder="RECIPIENT NAME"
                    />
                    {errors.sender && touched.sender && <p className="error">Recipient name is required</p>}
                  </div>
                  <div className="column label-sender">
                    <label htmlFor="#phone">PHONE NUMBER</label>
                    <PhoneInput
                      international
                      placeholder="Phone number"
                      defaultCountry="US"
                      name="phone"
                      value={phoneValue}
                      // eslint-disable-next-line
                      onChange={(value: any) => setPhoneValue(value)}
                      smartCaret={false}
                      disabled={shippingAddress?.items[0]}
                      className="input-text-phone input-text"
                      id="phone"
                    />
                    {false && <p className="error">Phone number is required</p>}
                  </div>
                </div>
                <div className="column">
                  <label htmlFor="#address_1">ADDRESS 1</label>
                  {/* <Field
                    name="address_1"
                    type="text"
                    disabled={shippingAddress?.items[0]}
                    className="input-text"
                    placeholder="ADDRESS 1"
                    onFocus={handleSelectAddressModal}
                    autoComplete="off"
                    aria-autocomplete="none"
                    id="address_1"
                    editable={false}
                  /> */}
                  <MapPlaces
                    address={address}
                    shippingAddressDelivery={!!shippingAddress?.items[0]}
                    setCoords={handleChooseLocation}
                    setPlace={handleSelectLocation}
                  />
                  {errors.address_1 && touched.address_1 && !shippingAddress?.items[0]?.address_line1 && (
                    <p className="error">Address 1 is required</p>
                  )}
                </div>
                {/* <div> */}
                {/* </div> */}

                <div className="column">
                  <label htmlFor="#address_2">ADDRESS 2</label>

                  <Field
                    id="address_2"
                    disabled={shippingAddress?.items[0]}
                    name="address_2"
                    type="text"
                    className="input-text"
                    placeholder="ADDRESS 2"
                  />
                </div>
                {}
                <Button
                  type="submit"
                  onClick={!shippingAddress?.items[0] ? handleSubmit : clearShippingForm}
                  width={'100%'}
                  className="pay-button"
                >
                  {!shippingAddress?.items[0] ? 'Add Shipping Address' : 'Clear Shipping Address'}
                </Button>

                {deliveryRatesList?.items?.length && <h2 className="subtitle-form">SHIPPING METHOD</h2>}
                {deliveryRatesList?.items?.map((item: any) => (
                  <div className="radio-button" key={uuidv4()}>
                    <input
                      type="radio"
                      name="delivery"
                      value={item?.carrier_id}
                      id={`${item?.carrier_id}`}
                      checked={values.delivery == item?.rate_id}
                      onChange={() => {
                        setFieldValue('delivery', item?.rate_id);
                        setDeliveryCompanyid(item?.rate_id);
                      }}
                    />
                    <label htmlFor={`${item?.carrier_id}`}>
                      <img src={item?.logo_url} alt="fedex" />
                      {item?.name} (${item?.total})
                    </label>
                  </div>
                ))}
              </Form>
            )}
          </Formik>
        </div>
        <div className="products-container">
          <div className="products-list ">
            {productCard?.items.map((product: any) => (
              <CheckoutProductItem
                name={product?.product_name}
                price={product?.price * product.quantity}
                image={product?.image_url}
                size={product?.size_name}
                key={uuidv4()}
              />
            ))}
          </div>

          <div className="bottom-container">
            <div className="prices">
              <p className="prices-description">
                <span>Subtotal:</span>{' '}
                <span>
                  ${' '}
                  {checkoutData?.subtotal
                    ? checkoutData?.subtotal
                    : productCard?.items.reduce(function (p: any, c: any) {
                        return +p + +c.price * c.quantity;
                      }, '')}
                </span>
              </p>
              <p className="prices-description">
                <span>Shipping:</span> {!!checkoutData?.delivery_price && <span>$ {checkoutData?.delivery_price}</span>}
              </p>
              <p className="prices-description">
                <span>Taxes:</span> {!!checkoutData?.tax && <span>$ {checkoutData?.tax}</span>}
              </p>
              <p className="prices-description">
                <span>Service Fee:</span> {!!checkoutData?.service_fee && <span>$ {checkoutData?.service_fee}</span>}
              </p>
            </div>
            <p className="prices-description">
              <span>Total:</span>{' '}
              <span>
                ${' '}
                {checkoutData?.total
                  ? checkoutData?.total
                  : productCard?.items.reduce(function (p: any, c: any) {
                      return +p + +c.price * c.quantity;
                    }, '')}
              </span>
            </p>

            <Button
              type="button"
              disabled={!shippingAddress?.items[0] || !deliveryCompanyid}
              onClick={initStripe}
              width={'100%'}
              className="pay-button"
            >
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
      <StyledSelectAdressModal
        isOpen={isOpenModal}
        onBackgroundClick={handleSelectAddressModal}
        onEscapeKeydown={handleSelectAddressModal}
      >
        <button className="close-button" onClick={handleSelectAddressModal}>
          <Close />
        </button>
        <h1 className="title">select your location</h1>
        <p className="description">
          Choose your location by clicking on the map or entering the address in the search field
        </p>
        <div className="map-container">
          <GoogleMap
            options={options}
            onClick={handleClick}
            zoom={16}
            center={initCenter}
            mapContainerClassName="map-container"
            onLoad={onLoad}
          >
            <MapPlaces address={address} setCoords={handleChooseLocation} setPlace={handleSelectLocation} />

            <MarkerF
              draggable
              onDragEnd={handleClick}
              position={coord}
              // icon="data:image/svg+xml,%0A%3Csvg width='30' height='47' viewBox='0 0 30 47' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_8006_50271)'%3E%3Cmask id='path-1-inside-1_8006_50271' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.9988 21.9507C21.0527 21.4496 25 17.1858 25 12C25 6.47715 20.5228 2 15 2C9.47715 2 5 6.47715 5 12C5 17.1858 8.9473 21.4496 14.0012 21.9507C14.0004 21.9671 14 21.9835 14 22L14 40C14 40.5523 14.4477 41 15 41C15.5523 41 16 40.5523 16 40L16 22C16 21.9835 15.9996 21.9671 15.9988 21.9507Z'/%3E%3C/mask%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.9988 21.9507C21.0527 21.4496 25 17.1858 25 12C25 6.47715 20.5228 2 15 2C9.47715 2 5 6.47715 5 12C5 17.1858 8.9473 21.4496 14.0012 21.9507C14.0004 21.9671 14 21.9835 14 22L14 40C14 40.5523 14.4477 41 15 41C15.5523 41 16 40.5523 16 40L16 22C16 21.9835 15.9996 21.9671 15.9988 21.9507Z' fill='%23681CFC'/%3E%3Cpath d='M15.9988 21.9507L15.9001 20.9556L14.9539 21.0495L15 21.9992L15.9988 21.9507ZM14.0012 21.9507L15 21.9992L15.0461 21.0495L14.0999 20.9556L14.0012 21.9507ZM14 22H15H14ZM14 40H13H14ZM16 40H15H16ZM16 22H17H16ZM24 12C24 16.6666 20.4476 20.5047 15.9001 20.9556L16.0975 22.9459C21.6578 22.3945 26 17.7049 26 12H24ZM15 3C19.9706 3 24 7.02944 24 12H26C26 5.92487 21.0751 1 15 1V3ZM6 12C6 7.02944 10.0294 3 15 3V1C8.92487 1 4 5.92487 4 12H6ZM14.0999 20.9556C9.55244 20.5047 6 16.6666 6 12H4C4 17.7049 8.34216 22.3945 13.9025 22.9459L14.0999 20.9556ZM15 22L15 21.9992L13.0024 21.9023C13.0008 21.9345 13 21.9671 13 22H15ZM15 40L15 22H13L13 40H15ZM15 40H13C13 41.1046 13.8954 42 15 42V40ZM15 40V42C16.1046 42 17 41.1046 17 40H15ZM15 22L15 40H17L17 22H15ZM15 21.9992L15 22H17C17 21.9671 16.9992 21.9345 16.9976 21.9023L15 21.9992Z' fill='black' fill-opacity='0.4' mask='url(%23path-1-inside-1_8006_50271)'/%3E%3C/g%3E%3Ccircle cx='15' cy='12' r='3' fill='white'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_8006_50271' x='1' y='0' width='28' height='47' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='2'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_8006_50271'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_8006_50271' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A"
              icon="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Cpath d='M25 17.5C25 20.2614 22.7614 22.5 20 22.5C17.2386 22.5 15 20.2614 15 17.5C15 14.7386 17.2386 12.5 20 12.5C22.7614 12.5 25 14.7386 25 17.5Z' fill='white'/%3E%3Cpath d='M32.5 17.5C32.5 29.4036 20 36.25 20 36.25C20 36.25 7.5 29.4036 7.5 17.5C7.5 10.5964 13.0964 5 20 5C26.9036 5 32.5 10.5964 32.5 17.5Z' fill='white'/%3E%3Cpath d='M25 17.5C25 20.2614 22.7614 22.5 20 22.5C17.2386 22.5 15 20.2614 15 17.5C15 14.7386 17.2386 12.5 20 12.5C22.7614 12.5 25 14.7386 25 17.5Z' stroke='%2319191B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M32.5 17.5C32.5 29.4036 20 36.25 20 36.25C20 36.25 7.5 29.4036 7.5 17.5C7.5 10.5964 13.0964 5 20 5C26.9036 5 32.5 10.5964 32.5 17.5Z' stroke='%2319191B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
            />
          </GoogleMap>
        </div>
        <Button type="button" onClick={handleSelectAddressModal} width={'400px'} className="button">
          Save
        </Button>
      </StyledSelectAdressModal>
      {ToastAnchor}

      <StyledStripePayment
        isOpen={isOpenModalStripe}
        onBackgroundClick={handleStripeModal}
        onEscapeKeydown={handleStripeModal}
      >
        <StripeWrapper stripeData={stripeData} />
      </StyledStripePayment>
      <Loader show={loading} />
    </StyledCheckoutScreens>
  );
};

export default Checkout;
