import { styled } from 'styled-components';

export const StyledTermsAndConditionsScreens = styled.div`
  background-color: ${({ theme }) => theme.dark};
  width: '100%';
  min-height: 100vh;
  padding: 80px 20rem 24px 20rem;
  box-sizing: border-box;

  .title {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.24px;
    text-transform: uppercase;
    margin-bottom: 26px;
  }

  .description {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.12px;
    margin-bottom: 20px;

    span {
      font-weight: 800;
    }
  }

  .sub-title {
    color: ${({ theme }) => theme.white};
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.14px;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .list {
    list-style: disc inside none;
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.12px;
    margin-bottom: 20px;

    span {
      font-weight: 800;
    }

    li {
      &:marker {
        color: ${({ theme }) => theme.white};
      }
    }
  }

  a {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.12px;
  }

  .number-list {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.12px;
    list-style: decimal inside none;
    margin-bottom: 20px;
  }

  @media (max-width: 965px) {
    padding: 80px 3rem 24px 3rem;
  }
`;
