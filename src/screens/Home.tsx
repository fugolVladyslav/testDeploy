import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { StyledHomeScreens } from '../styles/screens/HomeScreens';
import { Button } from '../components/Button';
import { ClockIcon, CameraIcon, DownArrow } from '../assets/svg';
import { HomePageProductItem } from '../components/HomePageProductItem';
import { Footer } from '../components/Footer';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useBuyFreeTicketsMutation, useGetEventPreviewQuery, useGetEventsQuery } from '../services/auth';
import moment from 'moment';
import { formattedValue } from '../helpers/formattedValue';
import { Loader } from '../components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useToaster } from '../hooks/useToaster';
import 'moment-timezone';
import { StyledMobileStoresModal } from '../styles/components/MobileStoresModal';
import { RedirectToStoresModal } from '../components/RedirectToStoresModal';
import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '../redux/reducers/mainReducer';

const isMobileDevice = isMobile;
export const Home: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isOpenMobileStoresModal, setIsOpenMobileStoresModal] = useState(false);
  const navigate = useNavigate();
  const { data, isMobile } = useSelector((state: RootState) => state.main);
  const [isMobileState, setIsMobileState] = useState(window.innerWidth < 965);
  const { toastTrigger, ToastAnchor } = useToaster();
  const { data: allEvents, refetch: refetchEventsInfo } = useGetEventsQuery();
  const { data: allProducts } = useGetEventPreviewQuery(
    { id: allEvents?.items[0].event_id },
    { skip: !allEvents?.items[0].event_id },
  );
  const localtimeZone = moment.tz.guess();
  const eventTimeWithTimeZones = moment.tz(allEvents?.items[0]?.start, allEvents?.items[0]?.timezone);

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

  useEffect(() => {
    if (isMobile) {
      setIsOpenMobileStoresModal(true);
      dispatch(setIsMobile(true));
    } else {
      setIsOpenMobileStoresModal(false);
      dispatch(setIsMobile(false));
    }
  }, [isMobile]);

  const handleMobileStoresModalModal = () => {
    // dispatch(setIsMobile(!isMobile));
    setIsOpenMobileStoresModal((prev) => !prev);
  };

  const [buyFreeTickets] = useBuyFreeTicketsMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleJoinEvent = async () => {
    if (isMobileDevice) {
      setIsOpenMobileStoresModal(true);
      dispatch(setIsMobile(false));
      return;
    }

    if (data?.access_token) {
      if (!allEvents?.items[0]?.is_bought) {
        try {
          setLoading(true);
          await buyFreeTickets({
            idEvent: allEvents?.items[0].event_id,
          }).unwrap();
          navigate(`/waiting-room/${allEvents?.items[0].event_id}`);
          setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setLoading(false);
          handleErrors(error);
        }
      } else {
        navigate(`/waiting-room/${allEvents?.items[0].event_id}`);
      }
    } else {
      navigate('/sign-up');
    }
  };
  // const [muted, setMuted] = useState(true);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const backgroundColor = allEvents?.items[0]?.home_bg_color;
  const fontColor = allEvents?.items[0]?.home_overlay_color;

  const listenWidth = () => {
    const width = window.innerWidth;

    if (width < 965) {
      !isMobileState && // to limit setting state only the first time
        setIsMobileState(true);
    } else {
      setIsMobileState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', listenWidth);
    return () => window.removeEventListener('resize', listenWidth);
  }, [listenWidth]);

  useEffect(() => {
    refetchEventsInfo();
  }, []);

  return (
    <StyledHomeScreens>
      <div className="player-container">
        {allEvents?.items[0].home_landscape_video_url && (
          <ReactPlayer
            className="player"
            url={
              isMobileState
                ? allEvents?.items[0].home_portrait_video_url.slice(38)
                : allEvents?.items[0].home_landscape_video_url.slice(38)
            }
            width="100%"
            height="100%"
            playing
            loop
            muted
            playsinline
            stopOnUnmount
          />
        )}
        {/* <button className="mute-button" onClick={() => setMuted((prev) => !prev)}>
          <Mute color={'#fff'} muted={muted} />
        </button> */}

        <div
          className="content-wrapper"
          style={{
            backgroundColor: `rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})`,
          }}
        >
          <div className="event-info">
            <div className="event-name-container event-info-block">
              <span
                className="event-name"
                style={{
                  color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                }}
              >
                {allEvents?.items[0].name}
              </span>
              <div className="event-date">
                <div>
                  <img src={CameraIcon} alt="camera" />
                  <span
                    style={{
                      color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                    }}
                  >
                    {Math.ceil(allEvents?.items[0].duration / 60)}
                    min
                  </span>
                </div>
                <div>
                  <img src={ClockIcon} alt="time" />
                  <span
                    style={{
                      color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                    }}
                  >
                    {eventTimeWithTimeZones.tz(localtimeZone).format('MMM. DD, YYYY -  h:mm a')}
                  </span>
                </div>
              </div>
            </div>
            <div className="event-info-block event-info-block-center">
              <span
                className="event-description"
                style={{
                  color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                }}
              >
                {allEvents?.items[0].description}
              </span>
              <a href="#products" className="bottom-arrow">
                <img src={DownArrow} alt="back" />
              </a>
            </div>
            <div className="event-info-block event-info-block-right">
              {allEvents?.items[0]?.ticket_tier?.price ? (
                <span
                  className="price-event"
                  style={{
                    color: `rgba(${fontColor?.r}, ${fontColor?.g}, ${fontColor?.b}, ${fontColor?.a})`,
                  }}
                >
                  Price: {formattedValue(allEvents?.items[0]?.ticket_tier?.price, allEvents?.items[0]?.currency)}
                </span>
              ) : null}
              <Button type="button" onClick={handleJoinEvent}>
                JOIN EVENT
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="products-container" id="products">
        <div className="title-container" ref={ref}>
          <h1 className={`title ${inView && 'show-products'}`}>Products</h1>
          <div className={`products-list ${inView && 'show-products'}`}>
            {allProducts?.products?.length &&
              allProducts.products.map((item: any, index: number) => (
                <HomePageProductItem
                  image={item.images[0]?.url}
                  price={item.price}
                  name={item.name}
                  key={index}
                  height={window.innerWidth < 965 ? '330px' : '450px'}
                  width={window.innerWidth < 965 ? '220px' : '300px'}
                  eventId={allEvents?.items[0].event_id}
                  productId={item.id}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
      {ToastAnchor}
      <StyledMobileStoresModal
        isOpen={isOpenMobileStoresModal}
        onBackgroundClick={handleMobileStoresModalModal}
        onEscapeKeydown={handleMobileStoresModalModal}
      >
        <RedirectToStoresModal handleMobileStoresModalModal={handleMobileStoresModalModal} />
      </StyledMobileStoresModal>
      <Loader show={!allProducts?.products?.length || !allEvents?.items[0]?.home_landscape_video_url || loading} />
    </StyledHomeScreens>
  );
};

export default Home;
