import TouchSweep from 'touchsweep';
import { v4 as uuidv4 } from 'uuid';

import {
  FC,
  useRef,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  CSSProperties,
  useImperativeHandle,
} from 'react';
import { RoundedSliderStyles } from '../styles/components/RoundedSlider';
import { CheckedIcon } from '../assets/svg';

export type Images = {
  id: number;
  position: number;
  url: string;
};
export type CarouselItem = Readonly<{
  alt?: string;
  image: string;
  onClick?: () => void;
  checked?: boolean;
  images: Images[];
}>;

export type DecoratedCarouselItem = CarouselItem & Readonly<{ id: string }>;

export type CarouselProps = Readonly<{
  ref?: any;
  items: CarouselItem[];
  itemWidth?: number;
  showControls?: boolean;
  slideOnClick?: boolean;
  classNamePrefix?: string;
  nextButtonContent?: string | React.ReactNode;
  prevButtonContent?: string | React.ReactNode;
  onChangeSlide?: (index: number) => void;
  selectedProductSizes?: any;
}>;

export type CarouselRef = Readonly<{
  next: () => void;
  prev: () => void;
  getItems: () => DecoratedCarouselItem[];
  getSelectedIndex: () => number;
  setSelectedIndex: (index: number) => void;
}>;

export const RoundedSlider: FC<CarouselProps> = forwardRef(
  (
    {
      items,
      itemWidth = 210,
      showControls = false,
      slideOnClick = false,
      classNamePrefix = 'carousel',
      prevButtonContent = 'Previous',
      nextButtonContent = 'Next',
      onChangeSlide,
      selectedProductSizes = [],
    }: CarouselProps,
    CarouselRef,
  ) => {
    const len = useMemo(() => items?.length, [items?.length]);
    const theta = useMemo(() => 360 / len, [len]);

    const radius = useMemo(() => Math.round(itemWidth / 2 / Math.tan(Math.PI / len)), [itemWidth, len]);

    const ref = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentAngle, setCurrentAngle] = useState(0);

    const data: DecoratedCarouselItem[] = useMemo(
      () =>
        items?.map((item) => ({
          ...item,
          ...((item as unknown as DecoratedCarouselItem).id
            ? ({} as unknown as DecoratedCarouselItem)
            : { id: uuidv4() }),
        })),
      [items],
    );

    useEffect(() => {
      onChangeSlide && onChangeSlide(selectedIndex);
    }, [selectedIndex, onChangeSlide]);

    const getSlideStyle = useCallback(
      (index: number): CSSProperties => {
        const style: CSSProperties = {};

        if (index < len) {
          const cellAngle = theta * index;

          style.opacity = 1;
          style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
        } else {
          style.opacity = 0;
          style.transform = 'none';
        }

        if (index == selectedIndex) {
          const cellAngle = theta * index;

          style.opacity = 1;
          style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px) scale(1.3)`;
        }

        return style;
      },
      [len, radius, theta, selectedIndex],
    );

    const getItemStyle = useCallback((): CSSProperties => {
      return {
        transform: `translateZ(${-1 * radius}px) rotateY(${currentAngle}deg)`,
      };
    }, [radius, currentAngle]);

    const getClassName = useCallback(
      (parts: string | string[]) =>
        Array.isArray(parts)
          ? parts?.map((part: string) => `${classNamePrefix}${part}`).join(' ')
          : `${classNamePrefix}${parts}`,
      [classNamePrefix],
    );

    const prev = useCallback(() => {
      setSelectedIndex((prev) => {
        if (prev === 0) {
          return len - 1;
        } else {
          return prev - 1;
        }
      });
      setCurrentAngle((prev) => prev + theta);
    }, [theta, len]);

    const next = useCallback(() => {
      setSelectedIndex((prev) => {
        if (prev === len - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
      setCurrentAngle((prev) => prev - theta);
    }, [selectedIndex, theta, len]);

    useEffect(() => {
      const area = ref?.current;
      const touchsweep = new TouchSweep(area ?? undefined);

      area?.addEventListener('swipeleft', next);
      area?.addEventListener('swiperight', prev);

      return () => {
        touchsweep.unbind();

        area?.removeEventListener('swipeleft', next);
        area?.removeEventListener('swiperight', prev);
      };
    });

    useImperativeHandle(
      CarouselRef,
      (): CarouselRef => ({
        next,
        prev,
        getItems: () => data,
        getSelectedIndex: () => selectedIndex,
        setSelectedIndex: (index: number) => setSelectedIndex(index),
      }),
    );

    return (
      <RoundedSliderStyles>
        <div className={getClassName('')} ref={ref}>
          <div className={getClassName('__container')} style={getItemStyle()}>
            {data?.map((item: DecoratedCarouselItem, index: number) => (
              <div
                key={uuidv4()}
                style={getSlideStyle(index)}
                onClick={() => {
                  if (item.onClick) item.onClick();

                  if (slideOnClick) {
                    setCurrentAngle(theta * index * -1);
                    setSelectedIndex(index);
                  }
                }}
                className={`${getClassName('__slide')} ${index !== selectedIndex ? 'inactive_slide' : 'active_slide'} `}
              >
                <img src={item?.images[0].url} alt={item.alt} />

                <div className={getClassName('__slide-overlay')}>
                  {selectedProductSizes?.find((sizes: any) => sizes.product_id === item?.id) && (
                    <div className="checked_item">
                      <img src={CheckedIcon} alt={'checked'} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <div className={getClassName('__controls')}>
            <button className={getClassName(['__control', '__control--prev'])} onClick={prev}>
              {prevButtonContent}
            </button>

            <button className={getClassName(['__control', '__control--next'])} onClick={next}>
              {nextButtonContent}
            </button>
          </div>
        )}
      </RoundedSliderStyles>
    );
  },
);

export default RoundedSlider;
