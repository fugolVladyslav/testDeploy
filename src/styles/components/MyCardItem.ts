import { styled } from 'styled-components';

export const StyledMyCardItem = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

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
  .title-my-card {
    color: ${({ theme }) => theme.white};
    text-align: left;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .image {
    height: auto;
    // margin-bottom: 20px;
    width: 30%;
  }

  .price {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    // margin-bottom: 24px;
  }

  .sizes {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.12px;
    text-transform: uppercase;
    text-align: left;
  }

  .trash {
    // position: absolute;
    // top: 0;
    // right: 0;
    cursor: pointer;
  }

  .description-container {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;
