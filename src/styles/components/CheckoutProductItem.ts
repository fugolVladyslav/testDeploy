import { styled } from 'styled-components';

export const StyledCheckoutProductItem = styled.div`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  margin-bottom: 10px;

  .description-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    height: 85px;
  }

  .name-container {
    height: 85px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    display: flex;
  }

  .counter-container {
    display: flex;
    align-items: center;
  }

  .selected-sizes {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      display: inline-flex;
      align-items: center;
    }
  }

  .counter {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-transform: uppercase;
    margin: 0 10px;
    cursor: pointer;
  }
  .title {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .image {
    width: 70px;
    // height: 100%;
    margin-right: 30px;
  }

  .price {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  .sizes {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.12px;
    text-transform: uppercase;
  }
`;
