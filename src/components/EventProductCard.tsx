import React, { useEffect, useState } from 'react';

import { StyledEventProductCard } from '../styles/components/StyledEventProductCard';
import { formattedValue } from '../helpers/formattedValue';
import { IVideoEventCard } from '../models/event';

import tshort from '../assets/images/tshirt.png';
import { ProgressBorder } from '../assets/svg/ProgressBorder';
import { Image } from './Image';
import { Button } from './Button';
import { useAddToCardMutation } from '../services/auth';

type ProductCardProps = {
  card: IVideoEventCard;
  handleCardClick: (card: IVideoEventCard) => void;
  className?: string;
  disabled?: boolean;
  isPlay?: boolean;
  startPos?: { x: number; y: number };
  currency?: string;
  productId: number;
  eventId: string | undefined;
  // style?: any;
} & React.ComponentProps<'div'>;

export const EventProductCard: React.FC<ProductCardProps> = ({
  card,
  handleCardClick,
  className = '',
  disabled = false,
  style,
  isPlay = false,
  startPos,
  currency,
  productId,
  eventId,
}) => {
  const [submited, setSubmited] = useState(false);
  const [productAddded, setProductAddded] = useState(false);
  const [productSoldOut, setProductSoldOut] = useState(false);

  const animationstartpos = Number(card.start);
  const animationDuration = Number(card.duration);

  const [addToCard] = useAddToCardMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  useEffect(() => {
    const el = document.getElementById('animation');
    if (el && isPlay) {
      el.style.animationName = 'none';
      requestAnimationFrame(() => {
        el.style.animationName = 'border-card';
      });
    }
  }, [isPlay]);

  const addNewProduct = async () => {
    setSubmited(true);
    try {
      await addToCard({
        id: eventId,
        productId: productId,
      }).unwrap();
      setProductAddded(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setProductSoldOut(true);
      // handleErrors(error);
    }
  };

  return (
    <StyledEventProductCard
      className={className}
      data-id={card.product_id}
      disabled={disabled}
      style={style}
      isplay={isPlay}
      duration={animationDuration}
      animationstartpos={animationstartpos < 0 ? 0 : animationstartpos}
      data-x={startPos?.x}
      data-y={startPos?.y}
    >
      <ProgressBorder className="animation" />
      <div
        className="select"
        onClick={() =>
          handleCardClick({
            ...card,
            start: null,
            duration: null,
            width: null,
            height: null,
            offsetTop: null,
            offsetLeft: null,
          })
        }
      ></div>
      <div className="img-container">
        <Image src={card.image} alt="Product image" onError={({ currentTarget }) => (currentTarget.src = tshort)} />
      </div>
      <div className="info-container">
        <div className="name-container">
          <p>{card.name}</p>
        </div>
        <p>{formattedValue(Number(card.price), currency)}</p>
      </div>
      <Button className={submited && productAddded ? 'btn-placed' : 'btn'} disabled={submited} onClick={addNewProduct} transparent>
        {!submited || (submited && !productAddded && !productSoldOut)
          ? 'Buy Now'
          : submited && productAddded
          ? 'Placed'
          : 'Sold out'}
      </Button>
    </StyledEventProductCard>
  );
};
