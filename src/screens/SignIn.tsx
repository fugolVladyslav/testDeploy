import { FC } from 'react';
import ReactPlayer from 'react-player';
import { StyledAuthScreens } from '../styles/screens/AuthScreens';
import { PhoneAuth } from '../components/PhoneAuth';
import { Link } from 'react-router-dom';
import LoginVideo from '../assets/video/MingoSignUp.mp4';

export const SignIn: FC = () => {
  return (
    <StyledAuthScreens>
      <ReactPlayer
        className="player"
        url={LoginVideo}
        width="100%"
        height="100%"
        playing
        loop
        muted
        playsinline
        stopOnUnmount
      />
      <div className="content-wrapper">
        <div className="form-wrapper">
          <PhoneAuth
            title={'LOG IN TO YOUR ACCOUNT'}
            subtitle={'Don’t have an account? '}
            subtitleLinkText={'Create Account'}
            subtitleLinkPath={'/sign-up'}
            stepsCount={2}
          />
        </div>
        <div className="footer-wrapper">
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </StyledAuthScreens>
  );
};

export default SignIn;
