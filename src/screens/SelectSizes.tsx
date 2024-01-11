import React, { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import Slider from 'react-slick';
import 'react-round-carousel/src/index.css';
import RoundedSlider from '../components/RoundedSlider';

import { Button } from '../components/Button';
import { StyledProductSizingChart } from '../styles/components/ProductSizingChartModal';
import { StyledProductScreens } from '../styles/screens/ProductScreens';
import { CheckedIcon, Close } from '../assets/svg';

import {
  useGetProductSizesQuery,
  useGetSelectedProductSizesQuery,
  useSaveSelectedSizeMutation,
} from '../services/auth';
import { CarouselRef } from 'react-round-carousel';
import { useToaster } from '../hooks/useToaster';
import { sortSizes } from '../helpers/sortSizes';

export const SelectSizes: FC = () => {
  const { eventId } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [_, setSelectedProductsSizes] = useState(null);
  const navigate = useNavigate();
  const sliderRefMob = useRef<any>();
  const carouselRef = React.createRef<CarouselRef>();
  const [currentProduct, setCurrentProduct] = useState<any>();
  const { toastTrigger, ToastAnchor } = useToaster();
  const [currentProductImages, setCurrentProductImages] = useState<any>();

  const { data: productSizes } = useGetProductSizesQuery({ id: eventId });
  const { data: selectedProductSizes, refetch: refreshSelectedSizes } = useGetSelectedProductSizesQuery({
    id: eventId,
  });

  const sortProductImages = (id: number) => {
    const productPhotos: any[] = [];
    productSizes?.items[id].images.map((item: any) => {
      productPhotos.push(item);
    });
    const sortedImages = productPhotos.sort((a: any, b: any) => a.position - b.position);
    setCurrentProductImages(null);
    setTimeout(() => {
      setCurrentProductImages(sortedImages);
    }, 100);
  };

  const [saveSelectedSize] = useSaveSelectedSizeMutation<{
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

  const handleChangeSize = async (e: any) => {
    try {
      await saveSelectedSize({
        product_id: currentProduct.id,
        size_id: Number(e.target.value),
      }).unwrap();
      const sizes = await refreshSelectedSizes();
      console.log(sliderRefMob?.current);

      // sliderRef?.current?.slickGoTo(selectedProduct);
      console.log(carouselRef);

      sliderRefMob?.current?.slickNext();
      setSelectedProductsSizes(sizes.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
    setSelectedSize(e.target.value);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 965);

  const listenWidth = () => {
    const width = window.innerWidth;

    if (width < 965) {
      !isMobile && setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', listenWidth);
    return () => window.removeEventListener('resize', listenWidth);
  }, [listenWidth]);

  const handleSelectSizesModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const [imageIndex, setImageIndex] = useState(0);

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
      setCurrentProduct(productSizes?.items[next]);
      setImageIndex(next);
    },
    responsive: [
      {
        breakpoint: 1490,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    sortProductImages(0);

    setCurrentProduct(productSizes?.items[0]);
  }, [productSizes?.items]);

  const templateImages = productSizes?.items.map((item: any, idx: number) => {
    const isSelected = selectedProductSizes?.find((sizes: any) => sizes.product_id === item.id);

    return (
      <div className={idx === imageIndex ? 'activeSlide' : 'slide'} key={uuidv4()}>
        <div className="slideWrapper">
          <img src={item.images.find((i: any) => i?.position === 1)?.url} alt={item.alt} />
        </div>
        <div className="overlay"></div>

        {isSelected && (
          <div className="checked_item">
            <img src={CheckedIcon} alt={'checked'} />
          </div>
        )}
      </div>
    );
  });

  const selectSizes = () => {
    const isSelected = selectedProductSizes?.find((sizes: any) => sizes.product_id === currentProduct?.id);
    let sizesArray: any[] = [];
    currentProduct?.sizes.map((item: any) => sizesArray.push(item));
    let sortedArray = sizesArray?.sort((a: any, b: any) => sortSizes(a, b));

    return (
      <div className="select-sizes-container">
        <p>Select your size here</p>

        <Swiper
          slidesPerView={isMobile ? 6 : 9}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper-sizes"
        >
          {sortedArray.map((sizes: any) => (
            <SwiperSlide key={uuidv4()}>
              <label
                className={`select-size-options ${
                  ((selectedSize && selectedSize === sizes.id) || isSelected?.size_id === sizes.id) &&
                  'selected-size-effect'
                }`}
                key={sizes.name}
              >
                {sizes.name}
                <input type="radio" name="sizes" id={sizes.id} value={sizes.id} onChange={handleChangeSize} />
              </label>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

  let arrayString = currentProduct?.description.split('- ');

  return (
    <StyledProductScreens>
      {isMobile &&
        (productSizes?.items.length > 5 ? (
          <div className="rounded-slider-container">
            <RoundedSlider
              ref={carouselRef}
              items={productSizes?.items}
              slideOnClick
              itemWidth={isMobile ? 100 : 210}
              onChangeSlide={(index) => {
                sortProductImages(index);

                setCurrentProduct(productSizes?.items[index]);
              }}
              selectedProductSizes={selectedProductSizes}
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
            <SwiperSlide>
              <img src={item.url} alt={item.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="column description-product">
        {!isMobile &&
          (productSizes?.items.length > 5 ? (
            <div className="rounded-slider-container">
              <RoundedSlider
                ref={carouselRef}
                items={productSizes?.items}
                slideOnClick
                itemWidth={isMobile ? 100 : 210}
                onChangeSlide={(index) => {
                  sortProductImages(index);

                  setCurrentProduct(productSizes?.items[index]);
                }}
                selectedProductSizes={selectedProductSizes}
              />
            </div>
          ) : (
            <div className="inner-slider">
              <Slider ref={sliderRefMob} {...settings}>
                {templateImages}
              </Slider>
            </div>
          ))}
        {isMobile && selectSizes()}

        <div className="description-container">
          <h2 className="name-product">{currentProduct?.name}</h2>
          <p className="price-product">${currentProduct?.price}</p>
          <p className="description-product">
            {arrayString &&
              arrayString.map((e: string) => {
                return !!e.length && <p>- {e}</p>;
              })}
          </p>
          <Button flat textButton type="button" className="text-button" onClick={handleSelectSizesModal}>
            View sizing chart
          </Button>
        </div>

        {!isMobile && selectSizes()}

        <Button className="go-to-waiting-btn" onClick={() => navigate(`/waiting-room/${eventId}`)} transparent={true}>
          To waiting room
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
        <img src={currentProduct?.size_guide_image_url} alt="sizes" />
      </StyledProductSizingChart>
      {ToastAnchor}
    </StyledProductScreens>
  );
};

export default SelectSizes;
