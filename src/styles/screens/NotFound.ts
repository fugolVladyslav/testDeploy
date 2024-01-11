import { styled } from 'styled-components';

export const StyledNotFound = styled.div`
  background-color: ${({ theme }) => theme.dark};
  width: '100%';
  height: 100vh;
  padding: 80px 0px 140px 0px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  .sub-title {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-transform: uppercase;
    margin-bottom: 50px;
  }

  .title {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 170px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 204px */
    letter-spacing: 1.7px;
    text-transform: uppercase;
  }

  .button {
    width: 400px;
    margin: 0 auto;
  }

  @media (max-width: 965px) {
    padding: 20px;
    .title {
      font-size: 96px;
    }
    .sub-title {
      font-size: 14px;
    }

    .button {
      width: 100%;
      margin: 0 auto;
    }
  }
`;
