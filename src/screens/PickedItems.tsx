import { FC } from 'react';
import { StyledPickedItemsScreens } from '../styles/screens/PickedItems';
import { v4 as uuidv4 } from 'uuid';
import { Tooltip } from 'react-tooltip';
import { useNavigate, useParams } from 'react-router-dom';

import { HomePageProductItem } from '../components/HomePageProductItem';
import Carroussel from '../components/Carousel';

import { Button } from '../components/Button';
// import HelperIcon from '../assets/images/question-mark-circle.png';
import { useGetMyInfoQuery, useGetShoppingCardQuery } from '../services/auth';

export const PickedItems: FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { data: myInfo } = useGetMyInfoQuery({ id: eventId });
  const { data: productCard } = useGetShoppingCardQuery({ id: eventId }, { skip: !eventId });

  const selectedProducts = productCard?.items?.map((item: any) => ({
    key: uuidv4(),
    content: (
      <HomePageProductItem
        image={item.image_url}
        price={item.price}
        name={item.product_name}
        key={uuidv4()}
        hideDetailsButton
        width={'20vw'}
        height={'100%'}
      />
    ),
  }));

  const goToMisseditems = () => {
    navigate(`/missed-items/${eventId}`);
  };

  return (
    <StyledPickedItemsScreens>
      <div className="container">
        <h3 className="title">Congratulations, {myInfo?.first_name}! Your picks are in</h3>
        {/* <p className="counter">
          09:59 min left{' '}
          <img
            src={HelperIcon}
            alt="Helper"
            data-tooltip-id="tooltip"
            data-tooltip-content="Time left before items become unavailable for purchase"
          />
        </p> */}
        <div className="slider-container">
          {productCard?.items?.length ? (
            <Carroussel
              cards={selectedProducts}
              height="100%"
              width="90%"
              margin="0 auto"
              offset={2}
              showArrows={false}
            />
          ) : (
            <h1 className="empty-state">No picked items from this event</h1>
          )}
        </div>

        <div className="bottom-navigation">
          <Button type="button" onClick={goToMisseditems} width={'400px'} className="event-button">
            Continue
          </Button>
        </div>
      </div>
      <Tooltip id="tooltip" place="top" arrowColor="transparent" />
    </StyledPickedItemsScreens>
  );
};

export default PickedItems;
