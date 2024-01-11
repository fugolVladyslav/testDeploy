import { FC, HTMLProps, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from './Button';
import { MyCardItem } from './MyCardItem';
import { StyledMyCard } from '../styles/components/MyCard';
import { setStatusCard } from '../redux/reducers/mainReducer';

import { useGetShoppingCardQuery } from '../services/auth';

interface MyCardProps extends HTMLProps<HTMLElement> {
  showMyCard?: boolean;
  eventId: string | undefined;
}

export const MyCard: FC<MyCardProps> = ({ showMyCard, eventId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: productCard, refetch: refreshMyCard } = useGetShoppingCardQuery({ id: eventId }, { skip: !eventId });

  useEffect(() => {
    showMyCard && refreshMyCard();
  }, [showMyCard]);

  return (
    <StyledMyCard showMyCard={showMyCard}>
      <div className={`overlay ${showMyCard == true ? 'active' : ''}`}>
        <div className={`panel ${showMyCard == true ? 'active' : ''}`}>
          {productCard?.items?.length ? (
            productCard?.items?.map((product: any) => (
              <MyCardItem
                name={product.product_name}
                price={product.price}
                image={product.image_url}
                sizes={product.size_name}
                quantity={product.quantity}
                key={uuid()}
                size_id={product.size_id}
                product_id={product.product_id}
                eventId={eventId}
                refreshMyCard={refreshMyCard}
              />
            ))
          ) : (
            <h1 className="empty-state">No items in the cart</h1>
          )}
          <div className={`bottom-nav ${!productCard?.items.length ? 'empty-card' : ''}`}>
            {productCard?.items?.length && (
              <p className="price-total">
                <span>Total:</span>
                <span>
                  ${' '}
                  {productCard?.items.reduce(function (p: any, c: any) {
                    return +p + +c.price * c.quantity;
                  }, '')}
                </span>
              </p>
            )}
            <Button
              onClick={() =>
                productCard?.items[0].order_id
                  ? navigate(`/checkout/${eventId}/${productCard?.items[0].order_id}`)
                  : navigate(`/`)
              }
              className="button-action button-action-first"
            >
              {productCard?.items[0]?.order_id ? 'TO checkout' : 'TO home'}
            </Button>
            <Button onClick={() => dispatch(setStatusCard(false))} transparent={true} className="button-action">
              continue shopping
            </Button>
          </div>
        </div>
      </div>
    </StyledMyCard>
  );
};
