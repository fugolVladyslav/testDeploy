import { FC } from 'react';
import { StyledNotFound } from '../styles/screens/NotFound';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledNotFound>
      <div>
        <p className="title">404</p>
        <p className="sub-title">The page you were looking for does not exist</p>
        <Button type="button" onClick={() => navigate('/')} className="button">
          back to main page
        </Button>
      </div>
    </StyledNotFound>
  );
};

export default NotFound;
