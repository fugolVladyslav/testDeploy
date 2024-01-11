import styled from 'styled-components';

interface Props {
  shippingAddressDelivery: boolean;
}

export const StyledMapPlaces = styled.div<Props>`
  position: relative;
  font-family: AreaInktrap-Regular;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  // top: 20px;
  // left: 50%;
  // transform: translateX(-50%);
  z-index: 11;

  .delete {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%) rotate(45deg);
    cursor: pointer;
  }

  .autocomplete {
    width: 100%;
    box-sizing: border-box;
    background-color: #fcfcfd;
    border-radius: 4px;
    border: 2px solid #dfdfe6;
    padding: 18px 40px 18px 18px;
    outline: none;
  }

  .suggestions {
    width: 100%;
    position: absolute;
    top: 62px;
    border-radius: 4px;
    background-color: #fcfcfd;
    border: 2px solid #dfdfe6;
    box-sizing: border-box;
    padding: 4px 8px;
    cursor: pointer;

    .suggestion-item {
      padding: 8px;

      &:not(:last-child) {
        border-bottom: 1px solid #dfdfe6;
      }

      :hover {
        background-color: ${({ theme }) => theme.white};
      }
    }
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

  // @media (max-width: 1180px) {
  //   width: 300px;
  // }
`;
