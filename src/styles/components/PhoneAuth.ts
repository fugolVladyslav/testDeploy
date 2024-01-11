import { styled } from 'styled-components';
import Calendar from '../../assets/icons/calendar-days.svg';

interface StyledProps {
  marginBottom?: string;
  width?: string;
}

export const StyledPhoneAuth = styled.div<StyledProps>`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 52px;
  align-items: center;
  overflow: hidden;
  padding: 0 20px;
  animation: fadeIn 1.5s;
  animation-delay: 1s;
  opacity: 0;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  & > div {
    width: 100%;
  }

  & > div:nth-child(2) {
    text-align: left;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    background: transparent;
    color: #fff;
    padding: 5px 20px 5px 10px;

    appearance: none !important;
    // background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") !important;
    // background-repeat: no-repeat !important;
    // background-position: right !important;
    // background-size: 20px !important;

    appearance: none !important;
    background-image: linear-gradient(45deg, transparent 50%, #fff 50%),
      linear-gradient(135deg, #fff 50%, transparent 50%);
    background-position:
      calc(100% - 13px) 11px,
      calc(100% - 10px) 11px;
    background-size:
      4px 4px,
      4px 4px;
    background-repeat: no-repeat;
  }

  h4 {
    margin: 0;
    margin-bottom: 8px;
    font-size: 26px;
    font-style: normal;
    font-weight: 800;
    line-height: 150%;
    letter-spacing: 0.26px;
    color: ${({ theme }) => theme.white};
    text-transform: uppercase;
    text-align: center;
  }

  .subtitle {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.14px;
    color: ${({ theme }) => theme.white};
    text-align: center;

    a {
      color: ${({ theme }) => theme.white};
      font-weight: 800;

      &:hover {
        color: ${({ theme }) => theme.grey};
        text-decoration: underline;
      }
    }
  }

  .sign-up-btn {
    margin-top: 24px;
  }

  .PhoneInput {
    // margin-bottom: 24px;

    .PhoneInputCountry {
      margin: 0;
      padding: 5px 10px;
      border: 1px solid ${({ theme }) => theme.white};
      border-right: none;
      background: rgba(25, 25, 27, 0.5);
      backdrop-filter: blur(7.5px);

      .PhoneInputCountrySelectArrow {
        border-color: ${({ theme }) => theme.white};
        opacity: 1;
      }
    }

    .PhoneInputInput {
      padding: 11px 15px;
      border: 1px solid ${({ theme }) => theme.white};
      background: transparent;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 17px;
      letter-spacing: 0.12px;
      color: ${({ theme }) => theme.white};
      background: rgba(25, 25, 27, 0.5);
      backdrop-filter: blur(7.5px);

      &:focus-visible {
        outline: none;
      }
    }
  }

  .label-wrapper {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    p {
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
      letter-spacing: 0.12px;
    }

    .label {
      color: ${({ theme }) => theme.white};
      text-transform: uppercase;
    }
  }
  .error {
    margin-top: 5px;
    color: ${({ theme }) => theme.red};
  }
  .form {
    width: 100%;

    .input-text {
      width: 100%;
      padding: 11px 15px;
      border: 1px solid ${({ theme }) => theme.white};
      font-family: 'Manrope', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 17px;
      letter-spacing: 0.12px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.white};
      box-sizing: border-box;
      // margin-bottom: 24px;
      background: rgba(25, 25, 27, 0.5);
      backdrop-filter: blur(7.5px);

      &:focus-visible {
        outline: none;
      }
    }
  }

  .agreement-wrapper {
    margin-top: 24px;
    .agreement-text {
      color: ${({ theme }) => theme.grey};
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;

      a {
        color: ${({ theme }) => theme.white};
        font-weight: 500;
        text-decoration: none;

        &:hover {
          color: ${({ theme }) => theme.grey};
          text-decoration: underline;
        }
      }
    }
  }

  & > div:nth-child(3) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    .tile {
      width: 30px;
      height: 8px;
      border: 1px solid ${({ theme }) => theme.grey};
      background: transparent;
      background: linear-gradient(to right, white 50%, transparent 50%);
      background-size: 200% 100%;
      background-position: right bottom;
      transition: all 0.5s ease-out;

      &.active {
        background-position: left bottom;
        border-color: ${({ theme }) => theme.white};
      }
    }
  }

  .text-button {
    margin-top: 16px;

    &:hover {
      color: ${({ theme }) => theme.grey};
      text-decoration: underline;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
    // margin-bottom: 24px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 9px;
      right: 16px;
      width: 24px;
      height: 24px;
      background-image: url(${Calendar});
      background-repeat: no-repeat;
      background-size: contain;
      pointer-events: none;
    }

    .react-datepicker__input-container {
      input {
        width: 100%;
        padding: 11px 15px;
        border: 1px solid ${({ theme }) => theme.white};
        font-family: 'Manrope', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 17px;
        letter-spacing: 0.12px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.white};
        box-sizing: border-box;
        background: rgba(25, 25, 27, 0.5);
        backdrop-filter: blur(7.5px);

        &:focus-visible {
          outline: none;
        }
      }
    }
  }

  .react-datepicker {
    border: 1px solid ${({ theme }) => theme.white};
    background: ${({ theme }) => theme.dark};
    border-radius: 0;
    font-family: 'Manrope', sans-serif;

    &__header {
      background: ${({ theme }) => theme.dark};
      border-radius: 0;
      border-bottom: 0;
      padding: 20px 20px 0;
    }

    &__triangle {
      display: none;
    }

    &__navigation {
      width: 28px;
      height: 28px;
      top: 14px;
    }

    &__navigation--next {
      right: 25px;
    }

    &__navigation--previous {
      left: 25px;
    }

    &__navigation-icon::before {
      border-color: ${({ theme }) => theme.white};
      border-width: 1px 1px 0 0;
    }

    &__month {
      margin: 20px 32px 22px;
    }

    &__current-month {
      color: ${({ theme }) => theme.white};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      margin-bottom: 15px;
    }

    &__day-name,
    &__day {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      color: ${({ theme }) => theme.grey};
      text-transform: uppercase;
      transition: all 0.2s ease-out;
    }

    &__day--selected,
    &__day:hover {
      color: ${({ theme }) => theme.dark};
      background: ${({ theme }) => theme.white};
      border-radius: 0;
    }

    &__day--keyboard-selected {
      color: ${({ theme }) => theme.dark};
      background: rgba(255, 255, 255, 0.7);
      border-radius: 0;
    }

    &__day--outside-month {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .gender-select {
    // margin-bottom: 24px;

    &:focus-visible {
      outline: none;
    }

    &__control {
      border-radius: 0;
      border: 1px solid ${({ theme }) => theme.white};
      background: rgba(25, 25, 27, 0.5);
      backdrop-filter: blur(7.5px);
      box-shadow: none;
      height: 41px;

      &:hover {
        border: 1px solid ${({ theme }) => theme.white};
      }
    }

    &__value-container {
      padding: 2px 14px;
    }

    &__placeholder {
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      text-transform: uppercase;
    }

    &__single-value {
      color: ${({ theme }) => theme.white};
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
      letter-spacing: 0.12px;
      text-transform: uppercase;
    }

    &__menu-list {
      padding: 0;
      border: 1px solid ${({ theme }) => theme.white};
      background: ${({ theme }) => theme.black};

      .gender-select__option {
        color: ${({ theme }) => theme.white};
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        letter-spacing: 0.12px;
        text-transform: uppercase;

        &.gender-select__option--is-focused {
          background: ${({ theme }) => theme.grey};
        }

        &.gender-select__option--is-selected {
          background: ${({ theme }) => theme.white};
          color: ${({ theme }) => theme.dark};
        }
      }
    }

    &__indicator-separator {
      background-color: transparent;
    }

    &__indicator {
      color: ${({ theme }) => theme.white};

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .gender-dob-container {
    display: flex;
    justify-content: space-between;

    .gender-dob-field-container {
      display: flex;
      flex-direction: column;
      width: 48%;
    }
  }

  @media (max-width: 965px) {
    .PhoneInputInput {
      border-radius: 0px;
    }

    .gender-dob-container {
      flex-wrap: wrap;
      .gender-dob-field-container {
        width: 100%;
      }
    }
  }
`;
