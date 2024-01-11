import { FC, HTMLProps, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StyledHeader } from '../styles/components/Header';

import ShoppingCard from '../assets/svg/ShoppingCard.svg';
import { LeftArrow } from '../assets/svg';
import { Button } from './Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setIsMobile, setStatusCard, logout } from '../redux/reducers/mainReducer';
import { useBuyFreeTicketsMutation, useGetEventsQuery, useGetShoppingCardQuery } from '../services/auth';
import { isMobile } from 'react-device-detect';

interface HeaderProps extends HTMLProps<HTMLElement> {
  showBackButton?: boolean;
}

export const Header: FC<HeaderProps> = ({ showBackButton = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { myCardActive, data } = useSelector((state: RootState) => state.main);
  const { data: allEvents, refetch: refetchEventsInfo } = useGetEventsQuery();
  const { data: productCard, refetch: refreshMyCard } = useGetShoppingCardQuery(
    { id: allEvents?.items[0].event_id },
    { skip: !allEvents?.items[0].event_id },
  );

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const [buyFreeTickets] = useBuyFreeTicketsMutation<{
    isLoading: boolean;
    isError: boolean;
  }>();

  const handleJoinEvent = async () => {
    if (isMobile) {
      dispatch(setIsMobile(true));
      return;
    }

    if (await localStorage.getItem('accessToken')) {
      if (!allEvents?.items[0]?.is_bought) {
        try {
          await buyFreeTickets({
            idEvent: allEvents?.items[0].event_id,
          }).unwrap();
          navigate(`/waiting-room/${allEvents?.items[0].event_id}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // handleErrors(error);
        }
      } else {
        navigate(`/waiting-room/${allEvents?.items[0].event_id}`);
      }
    } else {
      navigate('/sign-up');
    }
  };

  useEffect(() => {
    refetchEventsInfo();
  }, [data?.access_token]);

  useEffect(() => {
    if (myCardActive) {
      refreshMyCard();
    }
  }, [myCardActive]);

  const listenToScroll = () => {
    const heightToHideFrom = window.innerHeight;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      !isVisible && // to limit setting state only the first time
        setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return !location.pathname.includes('/event') ? (
    <StyledHeader fixedheader={location.pathname.includes('/checkout') ? true : undefined}>
      <div className="left-side">
        {(showBackButton ||
          location.pathname.includes('/products') ||
          location.pathname.includes('/waiting-room') ||
          location.pathname.includes('/terms-and-conditions') ||
          location.pathname.includes('/privacy-policy') ||
          location.pathname.includes('/select-sizes') ||
          location.pathname.includes('/products')) && (
          <button className="back-arrow" onClick={() => navigate(-1)}>
            <LeftArrow />
            <span>Back</span>
          </button>
        )}
      </div>
      <Link to="/">
        <img src={allEvents?.items[0]?.brand_logo_url} className="logo" alt="logo" />
      </Link>

      <div className="right-side">
        {!location.pathname.includes('/sign-up') &&
          !location.pathname.includes('/sign-in') &&
          !location.pathname.includes('/picked-items') &&
          !location.pathname.includes('/checkout') && (
            <>
              {isVisible && location.pathname === '/' ? (
                <Button type="button" onClick={handleJoinEvent} width={'200px'} className="join-event-button">
                  JOIN EVENT
                </Button>
              ) : null}
              {!location.pathname.includes('/missed-items') ? null : (
                // <Link to="/">My Account</Link>
                <>
                  {location.pathname.includes('/missed-items') && productCard?.items?.length ? (
                    <Button
                      type="button"
                      onClick={() =>
                        navigate(`/checkout/${allEvents?.items[0].event_id}/${productCard?.items[0].order_id}`)
                      }
                      width={'200px'}
                      className="join-event-button"
                    >
                      To checkout
                    </Button>
                  ) : null}
                  <Button
                    flat
                    textButton
                    width="auto"
                    type="button"
                    onClick={() => {
                      dispatch(setStatusCard(!myCardActive));
                    }}
                    className="text-button select-sizes-button"
                  >
                    <img className="my-card-icon" src={ShoppingCard} alt="My Cart " />
                    <span className="my-card-text">My Cart</span>
                  </Button>
                </>
              )}
            </>
          )}

        {data?.access_token && (
          <Button
            flat
            textButton
            width="auto"
            type="button"
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
            className="text-button select-sizes-button"
          >
            <span className="my-card-text">Log Out</span>
          </Button>
        )}
      </div>
    </StyledHeader>
  ) : null;
};
