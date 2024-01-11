import { styled } from 'styled-components';

export const StyledFooter = styled.div`
  width: 100%;
  padding: 40px 52px;
  background: ${({ theme }) => theme.dark};
  box-sizing: border-box;

  .logo {
    height: 26px;
  }

  .links-container {
    border-bottom: 1px solid ${({ theme }) => theme.grey};
  }

  .bottom-container,
  .links-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 33px;
  }

  .bottom-container {
    padding-top: 33px;

    span,
    a {
      color: ${({ theme }) => theme.grey};
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      text-decoration: none;
      margin-left: 20px;

      &:hover {
        color: ${({ theme }) => theme.white};
        text-decoration: underline;
      }
    }
    span {
      margin-left: 0px;
    }
  }

  .web-links {
    display: flex;
    flex-wrap: no-wrap;

    span:hover {
      color: ${({ theme }) => theme.grey};
    }

    span {
      font-weight: 400;
      font-size: 12px;
    }
  }

  .web-links a {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    margin-left: 14px;
    text-decoration: none;
    text-wrap: nowrap;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;

    &:hover {
      color: ${({ theme }) => theme.grey};
    }
  }

  .social-links {
    display: flex;
    column-gap: 30px;
  }

  @media (max-width: 965px) {
    padding: 40px 10px 0px 10px;

    .bottom-container a {
      font-size: 10px;
      margin-left: 10px;
    }

    .bottom-container span {
      margin-left: 0px;
    }

    .web-links a {
      font-size: 12px;

      button {
        padding: 0px;
      }
    }

    .web-links {
      button {
        padding: 0px;
      }
    }

    .links-container {
      padding-bottom: 20px;
    }

    .bottom-container {
      padding-top: 20px;
    }
  }
`;
