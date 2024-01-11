import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import { CarouselRef } from 'react-round-carousel';
import { Button } from '../components/Button';
import RoundedSlider from '../components/RoundedSlider';
import { v4 as uuidv4 } from 'uuid';

import { StyledProductScreens } from '../styles/screens/ProductScreens';
import { StyledProductSizingChart } from '../styles/components/ProductSizingChartModal';
import { Close } from '../assets/svg';

import Sizes from '../assets/images/Sizes.png';

import { Loader } from '../components/Loader';
import { useBuyFreeTicketsMutation, useGetEventPreviewQuery, useGetEventsQuery } from '../services/auth';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useToaster } from '../hooks/useToaster';
import { StyledMobileStoresModal } from '../styles/components/MobileStoresModal';
import { RedirectToStoresModal } from '../components/RedirectToStoresModal';
import { Footer } from '../components/Footer';

export const ProductsList: FC = () => {
  const { productId, eventId } = useParams();
  const [imageIndex, setImageIndex] = useState(0);
  const [currentProductImages, setCurrentProductImages] = useState<any>();
  const [currentProduct, setCurrentProduct] = useState<any>();
  const sliderRefMob = useRef<any>();
  const sliderRef = useRef<any>();
  const carouselRef = React.createRef<CarouselRef>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 965);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data } = useSelector((state: RootState) => state.main);
  const { toastTrigger, ToastAnchor } = useToaster();
  const [isOpenMobileStoresModal, setIsOpenMobileStoresModal] = useState(false);

  const { data: allProducts } = useGetEventPreviewQuery({ id: eventId }, { skip: !eventId });
  function handleSelectSizesModal() {
    setIsOpenModal(!isOpenModal);
  }
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
  const { data: allEvents } = useGetEventsQuery();

  const [buyFreeTickets] = useBuyFreeTicketsMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleJoinEvent = async () => {
    if (isMobile) {
      setIsOpenMobileStoresModal(true);
      return;
    }
    if (data?.access_token) {
      if (!allEvents?.items[0]?.is_bought) {
        try {
          setLoading(true);
          await buyFreeTickets({
            idEvent: allProducts.event_id,
          }).unwrap();
          navigate(`/waiting-room/${allProducts.event_id}`);
          setLoading(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setLoading(false);
          handleErrors(error);
        }
      } else {
        navigate(`/waiting-room/${allProducts.event_id}`);
      }
    } else {
      navigate('/sign-up');
    }
  };

  const settings = {
    centerMode: true,
    infinite: true,
    dots: false,
    speed: 300,
    slidesToShow: 3,
    centerPadding: '0',
    swipeToSlide: true,
    slidesToScroll: true,
    focusOnSelect: true,
    arrows: false,

    beforeChange: (_: any, next: number) => {
      sortProductImages(next);
      setCurrentProduct(allProducts?.products[next]);
      setImageIndex(next);
    },
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 820,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const listenWidth = () => {
    const width = window.innerWidth;

    if (width < 965) {
      !isMobile && // to limit setting state only the first time
        setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', listenWidth);
    return () => window.removeEventListener('resize', listenWidth);
  }, [listenWidth]);

  const sortProductImages = (id: number) => {
    const productPhotos: any[] = [];
    allProducts?.products[id].images.map((item: any) => {
      productPhotos.push(item);
    });
    const sortedImages = productPhotos.sort((a: any, b: any) => a.position - b.position);

    setCurrentProductImages(null);
    setCurrentProductImages(sortedImages);
  };

  useEffect(() => {
    if (productId) {
      const selectedProduct = allProducts?.products.findIndex((item: any) => item.id == productId);
      sortProductImages(selectedProduct);

      setCurrentProduct(allProducts?.products[selectedProduct]);
      setImageIndex(selectedProduct);
      sliderRef?.current?.slickGoTo(selectedProduct);
      sliderRefMob?.current?.slickGoTo(selectedProduct);
    } else {
      sortProductImages(0);
      setCurrentProduct(allProducts?.products[0]);
    }
  }, [allProducts, productId]);

  const templateImages = allProducts?.products.map((item: any, idx: number) => {
    return (
      <div className={idx === imageIndex ? 'activeSlide' : 'slide'} key={uuidv4()}>
        <div className="slideWrapper">
          <img src={item?.images[0].url} alt={item.alt} />
        </div>
        <div className="overlay"></div>
      </div>
    );
  });

  const handleMobileStoresModalModal = () => {
    // dispatch(setIsMobile(!isMobile));
    setIsOpenMobileStoresModal((prev) => !prev);
  };

  let arrayString = currentProduct?.description.split('- ');

  return (
    <>
      <StyledProductScreens>
        {isMobile &&
          (allProducts?.products.length > 5 ? (
            <div className="rounded-slider-container">
              <RoundedSlider
                ref={carouselRef}
                items={allProducts?.products}
                slideOnClick
                itemWidth={isMobile ? 100 : 210}
                onChangeSlide={(index) => {
                  sortProductImages(index);

                  setCurrentProduct(allProducts?.products[index]);
                }}
              />
            </div>
          ) : (
            <div className="inner-slider">
              <Slider ref={sliderRefMob} {...settings}>
                {templateImages}
              </Slider>
            </div>
          ))}

        <div className="column image-container">
          <Swiper
            direction={isMobile ? 'horizontal' : 'vertical'}
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            modules={[Mousewheel, Pagination]}
            className="mySwiper"
          >
            {currentProductImages?.map((item: any) => (
              <SwiperSlide key={uuidv4()}>
                <img src={item.url} alt={item.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="column description-product">
          {!isMobile &&
            (allProducts?.products.length > 5 ? (
              <div className="rounded-slider-container">
                <RoundedSlider
                  ref={carouselRef}
                  items={allProducts.products}
                  slideOnClick
                  itemWidth={isMobile ? 100 : 210}
                  onChangeSlide={(index) => {
                    sortProductImages(index);

                    setCurrentProduct(allProducts?.products[index]);
                  }}
                />
              </div>
            ) : (
              <div className="inner-slider">
                <Slider ref={sliderRef} {...settings}>
                  {templateImages}
                </Slider>
              </div>
            ))}
          <div className="description-container">
            <h2 className="name-product">{currentProduct?.name}</h2>
            <p className="price-product">${currentProduct?.price}</p>
            <p className="description-product">
              {arrayString &&
                arrayString.map((e: string) => {
                  return !!e.length && <p>- {e}</p>;
                })}
            </p>
            {/* <Button flat textButton type="button" className="text-button" onClick={handleSelectSizesModal}>
            View sizing chart
          </Button> */}
          </div>
          <Button className="go-to-waiting-btn" onClick={handleJoinEvent}>
            join event
          </Button>
        </div>

        <StyledProductSizingChart
          isOpen={isOpenModal}
          onBackgroundClick={handleSelectSizesModal}
          onEscapeKeydown={handleSelectSizesModal}
        >
          <button className="close-button" onClick={handleSelectSizesModal}>
            <Close />
          </button>
          <h3>sizing chart</h3>
          <p>Choose your size according the information below</p>
          <img src={Sizes} alt="sizes" />
        </StyledProductSizingChart>

        <StyledMobileStoresModal
          isOpen={isOpenMobileStoresModal}
          onBackgroundClick={handleMobileStoresModalModal}
          onEscapeKeydown={handleMobileStoresModalModal}
        >
          <RedirectToStoresModal handleMobileStoresModalModal={handleMobileStoresModalModal} />
        </StyledMobileStoresModal>

        <Loader show={!allProducts?.products?.length || !currentProduct?.name || loading} />
        {ToastAnchor}
      </StyledProductScreens>
      {isMobile && <Footer />}
    </>
  );
};

export default ProductsList;
