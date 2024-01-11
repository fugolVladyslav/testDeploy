import { styled } from 'styled-components';

interface Props {
  shippingAddressDelivery: boolean;
}

export const StyledCheckoutScreens = styled.div<Props>`
  background-color: ${({ theme }) => theme.dark};
  width: '100%';
  min-height: 100vh;
  padding: 80px 0px 24px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.26px;
    margin-bottom: 26px;
  }
  .error {
    color: #f32837;
  }

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
    color: ${({ theme, shippingAddressDelivery }) => (!shippingAddressDelivery ? theme.white : 'rgba(60, 60, 60)')};
    box-sizing: border-box;
    margin-bottom: 4px;
    background: rgba(25, 25, 27, 0.5);
    backdrop-filter: blur(7.5px);

    &:focus-visible {
      outline: none;
    }
  }

  .products-container {
    width: 50%;
    position: relative;
    height: calc(65vh - 136px);
  }

  .products-list {
    overflow-y: scroll;
    height: 80%;
    margin-bottom: 10px;
    padding-right: 20px;
  }

  .bottom-container {
    // position: sticky;
    // bottom: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.dark};
    border: 1px solid #fff;
    padding: 30px;
    box-sizing: border-box;
  }

  .form-container {
    width: 50%;
  }

  .container {
    display: flex;
    flex-direction: row;
    padding: 40px;
    column-gap: 80px;
    padding-right: 20px;
    width: 70%;
  }

  .column {
    display: flex;
    flex-direction: column;
  }
  .label-sender {
    width: 50%;
  }
  .row {
    display: flex;
    flex-direction: row;
    column-gap: 20px;

    .input-text {
      &.input-text-phone {
        // background: transparent;
        outline: transparent;
        // border: none;
        color: ${({ theme, shippingAddressDelivery }) => (!shippingAddressDelivery ? theme.white : 'rgba(60, 60, 60)')}
          input {
          outline-color: ${({ theme }) => theme.dark};
          outline-width: 0px;
        }

        .PhoneInputInput {
          background: transparent;
          border: none;
          color: ${({ theme, shippingAddressDelivery }) =>
            !shippingAddressDelivery ? theme.white : 'rgba(60, 60, 60)'};
        }
      }
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #19191b inset !important;
    -webkit-text-fill-color: ${({ theme, shippingAddressDelivery }) =>
      !shippingAddressDelivery ? theme.white : 'rgba(60, 60, 60)'};
  }

  form label {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.12px;
    text-transform: uppercase;
    margin-bottom: 8px;
    margin-top: 18px;
  }

  .title-form {
    color: ${({ theme }) => theme.white};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.2px;
    margin-bottom: 30px;
  }

  .subtitle-form {
    margin-top: 50px;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.white};
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.2px;
  }

  .radio-button {
    // margin-top: 16px;
    display: flex;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;

    label {
      color: ${({ theme }) => theme.white};
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 24px */
      letter-spacing: 0.16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      img {
        margin-right: 6px;
        height: 35px;
      }
    }

    input[type='radio'] {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
      width: 20px;
      height: 20px;
      border: 1px solid ${({ theme }) => theme.white};
      border-radius: 50%;
      cursor: pointer;

      display: grid;
      place-content: center;
    }

    input[type='radio']::before {
      content: '';
      width: 10px;
      height: 10px;
      transform: scale(0);
      border-radius: 50%;
      transition: 120ms transform ease-in-out;
    }

    input[type='radio']:checked::before {
      transform: scale(1);
      background-color: ${({ theme }) => theme.white};
    }
  }

  .prices-description {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    span:first-child {
      color: ${({ theme }) => theme.white};
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
      letter-spacing: 0.14px;
    }
    span:last-child {
      color: ${({ theme }) => theme.white};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      letter-spacing: 0.14px;
    }
  }

  .prices {
    border-bottom: 1px solid ${({ theme }) => theme.white};
    margin-bottom: 16px;
    // margin-top: 100px;
  }

  .pay-button {
    margin-top: 15px;
  }

  .map-container {
    width: 200px;
    height: 200px;
  }

  .name-container {
    .title {
      text-align: left;
    }
  }

  @media (max-width: 965px) {
    .container {
      flex-direction: column;
      padding: 20px;
    }

    .form-container,
    .products-container {
      width: 100%;
      height: fit-content;
    }

    .products-list {
      height: auto;
      overflow: hidden;
    }

    .title-form,
    .subtitle-form {
      text-align: center;
      margin-bottom: 30px;
    }

    .form-container {
      margin-bottom: 40px;

      .row {
        flex-wrap: wrap;

        .label-sender {
          width: 100%;
        }
      }
    }

    .bottom-container {
      border-width: 0px;
      padding: 0px;
    }

    .pay-button {
      margin-top: 40px;
    }
  }
`;
