import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Tooltip } from 'react-tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

import { HomePageProductItem } from '../components/HomePageProductItem';
import { MyCard } from '../components/MyCard';
import { Button } from '../components/Button';
import { setStatusCard } from '../redux/reducers/mainReducer';
import { RootState } from '../redux/store';

import { StyledSelectSizesModal } from '../styles/components/SelectSizesModal';
import { StyledMissedItemsScreens } from '../styles/screens/MissedItemsScreen';
import { StyledProductSizingChart } from '../styles/components/ProductSizingChartModal';

// import HelperIcon from '../assets/images/question-mark-circle.png';
import { Close } from '../assets/svg';
import { useAddToCardMutation, useGetMissedItemsQuery, useGetShoppingCardQuery } from '../services/auth';
import { useToaster } from '../hooks/useToaster';
import { sortSizes } from '../helpers/sortSizes';

export const MissedItems: FC = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: missedItems } = useGetMissedItemsQuery({ id: eventId });
  const { toastTrigger, ToastAnchor } = useToaster();
  const { data: productCard, refetch: refreshMyCard } = useGetShoppingCardQuery({ id: eventId }, { skip: !eventId });

  const [addToCard] = useAddToCardMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [isOpenModalSizes, setIsOpenModalSizes] = useState(false);

  const { myCardActive } = useSelector((state: RootState) => state.main);

  const addItemToCard = (item: any) => {
    let sizesArray: any[] = [];
    item.available_sizes.map((item: any) => sizesArray.push(item));
    let sortedArray = sizesArray?.sort((a: any, b: any) => sortSizes(a, b));

    setSelectedProduct({
      ...item,
      available_sizes: sortedArray,
    });
    setIsOpenModal(true);
  };

  const handleSelectSizesModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSelectSizesChartModal = () => {
    setIsOpenModalSizes(!isOpenModalSizes);
  };

  const handleChangeSize = (e: any) => {
    setSelectedSize(e.target.value);
  };
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
  const addNewProduct = async () => {
    try {
      await addToCard({
        id: eventId,
        productId: selectedProduct?.product_id,
        sizeId: Number(selectedSize),
        quantity: 1,
      }).unwrap();
      setIsOpenModal(!isOpenModal);
      dispatch(setStatusCard(!myCardActive));
      setSelectedSize('');
      setSelectedProduct(null);
      await refreshMyCard();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
  };

  return (
    <StyledMissedItemsScreens scrollEnable={!myCardActive}>
      <h3 className="title">ITEMS YOU MISSED</h3>

      {/* <p className="counter">
        09:59 min left{' '}
        <img
          src={HelperIcon}
          alt="Helper"
          data-tooltip-id="tooltip"
          data-tooltip-content="Time left before items become unavailable for purchase"
        />
      </p> */}
      <div className="products-container">
        {missedItems?.items?.length ? (
          missedItems?.items.map((item: any) => (
            <HomePageProductItem
              image={item.images.find((i: any) => i?.position === 1)?.url}
              price={item.price}
              name={item.name}
              key={uuidv4()}
              hideDetailsButton
              actionButton={() => addItemToCard(item)}
              actionButtonText="ADD TO CART"
              height={'330px'}
              width={window.innerWidth < 965 ? (window.innerWidth < 610 ? '100%' : '45%') : '220px'}
              minheight={'373px'}
            />
          ))
        ) : (
          <h1 className="empty-state">No missed items from this account</h1>
        )}
      </div>

      {productCard?.items[0]?.order_id ? (
        <div className="bottom-navigation">
          <Button
            type="button"
            onClick={() => navigate(`/checkout/${eventId}/${productCard?.items[0].order_id}`)}
            width={'400px'}
            className="event-button"
          >
            GO TO CART
          </Button>
        </div>
      ) : null}

      <StyledSelectSizesModal
        isOpen={isOpenModal}
        onBackgroundClick={handleSelectSizesModal}
        onEscapeKeydown={handleSelectSizesModal}
      >
        <h3>SELECT SIZE</h3>

        <Swiper
          slidesPerView={selectedProduct?.available_sizes.length + 1}
          // spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper-sizes"
          breakpoints={{
            640: {
              slidesPerView: selectedProduct?.available_sizes.length + 1,
            },
          }}
        >
          {selectedProduct?.available_sizes?.map((sizes: any) => {
            return (
              <SwiperSlide key={uuidv4()}>
                <label
                  className={`select-size-options ${
                    selectedSize && selectedSize == sizes.id && 'selected-size-effect'
                  }`}
                  key={sizes.label}
                >
                  {sizes.name}
                  <input type="radio" name="sizes" id={sizes.id} value={sizes.id} onChange={handleChangeSize} />
                </label>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Button flat textButton type="button" className="text-button" onClick={handleSelectSizesChartModal}>
          View sizing chart
        </Button>
        <Button onClick={addNewProduct} transparent={true}>
          CONFIRM
        </Button>
      </StyledSelectSizesModal>

      <StyledProductSizingChart
        isOpen={isOpenModalSizes}
        onBackgroundClick={handleSelectSizesChartModal}
        onEscapeKeydown={handleSelectSizesChartModal}
      >
        <button className="close-button" onClick={handleSelectSizesChartModal}>
          <Close />
        </button>
        <h3>sizing chart</h3>
        <p>Choose your size according the information below</p>
        <img src={selectedProduct?.size_guide_image_url} alt="sizes" />
      </StyledProductSizingChart>
      <MyCard showMyCard={myCardActive} eventId={eventId} />
      <Tooltip id="tooltip" place="top" arrowColor="transparent" />
      {ToastAnchor}
    </StyledMissedItemsScreens>
  );
};

export default MissedItems;
