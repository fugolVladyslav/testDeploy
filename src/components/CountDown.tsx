import { StyledCountDown } from '../styles/components/CountDown';

export interface ICountdownData {
  countdownData: {
    seconds: number;
    hours: number;
    minutes: number;
    days: number;
  };
}

const Countdown = ({ countdownData }: ICountdownData) => {
  return (
    <StyledCountDown>
      <div className="countdown-wrapper">
        <div className="countdown-box">
          <span className="time-text">{countdownData.days}</span>
          <span className="legend">Days</span>
        </div>
        <div className="countdown-box">
          <span className="time-text">{countdownData.hours}</span>
          <span className="legend">Hours</span>
        </div>
        <div className="countdown-box">
          <span className="time-text">{countdownData.minutes}</span>
          <span className="legend">Minutes</span>
        </div>
        <div className="countdown-box">
          <span className="time-text">{countdownData.seconds}</span>
          <span className="legend">Seconds</span>
        </div>
      </div>
    </StyledCountDown>
  );
};

export default Countdown;
