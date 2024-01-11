import { StyledCheckoutProductItem } from '../styles/components/CheckoutProductItem';
import { FC, HTMLProps } from 'react';

interface CheckoutProductItemProps extends HTMLProps<HTMLElement> {
  name: string;
  price: number;
  image: string;
  size: number | undefined;
}

export const CheckoutProductItem: FC<CheckoutProductItemProps> = ({ name, price, size, image }) => {
  return (
    <StyledCheckoutProductItem>
      <img src={image} alt="image" className="image" />
      <div className="description-container">
        <div className="name-container">
          <p className="title">{name}</p>
          <p className="sizes">
            size: <span>{size}</span>
          </p>
        </div>
        <div className="selected-sizes">
          <p className="price">${price}</p>
        </div>
      </div>
    </StyledCheckoutProductItem>
  );
};
