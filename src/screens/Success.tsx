import { FC } from 'react';
import { StyledSuccess } from '../styles/screens/Success';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useGetOrdersQuery } from '../services/auth';

export const Success: FC = () => {
  const navigate = useNavigate();
  const { data: allOrders } = useGetOrdersQuery({});
  console.log(allOrders);

  return (
    <StyledSuccess>
      <div>
        <svg width="61" height="61" viewBox="0 0 61 61" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.125 30.5C6.125 17.0381 17.0381 6.125 30.5 6.125C43.9619 6.125 54.875 17.0381 54.875 30.5C54.875 43.9619 43.9619 54.875 30.5 54.875C17.0381 54.875 6.125 43.9619 6.125 30.5ZM39.5257 25.9648C40.1276 25.1222 39.9325 23.9511 39.0898 23.3493C38.2472 22.7474 37.0761 22.9425 36.4742 23.7852L28.3857 35.1091L24.3258 31.0492C23.5936 30.3169 22.4064 30.3169 21.6742 31.0492C20.9419 31.7814 20.9419 32.9686 21.6742 33.7008L27.2992 39.3258C27.6889 39.7156 28.2304 39.9141 28.7797 39.8686C29.3289 39.8232 29.8304 39.5383 30.1508 39.0898L39.5257 25.9648Z"
            fill="white"
          />
        </svg>
        <p className="title">success!</p>
        <p className="sub-title">
          Your order #{allOrders?.items[0]?.order_number} was placed. Please check your email for order details
        </p>
        <Button type="button" onClick={() => navigate('/')} className="button">
          to homepage
        </Button>
      </div>
    </StyledSuccess>
  );
};

export default Success;
