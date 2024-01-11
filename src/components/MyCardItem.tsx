import { StyledMyCardItem } from '../styles/components/MyCardItem';
import { FC, HTMLProps } from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from '../assets/svg';
import { Button } from './Button';
import { useAddToCardMutation, useDeleteOneProductMutation } from '../services/auth';
import { useToaster } from '../hooks/useToaster';

interface MyCardItemProps extends HTMLProps<HTMLElement> {
  name: string;
  price: string;
  image: string;
  sizes: undefined | string;
  quantity: number;
  size_id: number;
  product_id: number;
  eventId: string | undefined;
  refreshMyCard: any;
}

export const MyCardItem: FC<MyCardItemProps> = ({
  name,
  price,
  sizes,
  image,
  quantity,
  size_id,
  product_id,
  eventId,
  refreshMyCard,
}) => {
  const { toastTrigger, ToastAnchor } = useToaster();

  const [addToCard] = useAddToCardMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();
  const [deleteOneProduct] = useDeleteOneProductMutation<{
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
  const addNewProduct = async () => {
    try {
      await addToCard({
        id: eventId,
        productId: product_id,
        sizeId: Number(size_id),
        quantity: 1,
      }).unwrap();
      await refreshMyCard();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
  };

  const removeOneProduct = async () => {
    try {
      await deleteOneProduct({
        id: eventId,
        productId: product_id,
        sizeId: Number(size_id),
        quantity: 1,
      }).unwrap();
      await refreshMyCard();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
  };

  const removeProduct = async () => {
    try {
      await deleteOneProduct({
        id: eventId,
        productId: product_id,
        sizeId: Number(size_id),
        quantity: quantity,
      }).unwrap();
      await refreshMyCard();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrors(error);
    }
  };

  return (
    <StyledMyCardItem>
      <img src={image} alt="image_1" className="image" />
      <div className="description-container">
        <p className="title-my-card">{name}</p>
        <p className="sizes">
          size: <span>{sizes}</span>
        </p>
        <div className="selected-sizes">
          <p className="price">${price}</p>
          <div className="counter-container">
            <Button onClick={removeOneProduct} textButton width="auto">
              <img src={MinusIcon} alt="minus" />
            </Button>
            <span className="counter">{quantity}</span>
            <Button onClick={addNewProduct} textButton width="auto">
              <img src={PlusIcon} alt="plus" />
            </Button>
          </div>
          <Button onClick={removeProduct} textButton width="auto">
            <img src={TrashIcon} alt="remove" className="trash" />
          </Button>
        </div>
      </div>
      {ToastAnchor}
    </StyledMyCardItem>
  );
};
