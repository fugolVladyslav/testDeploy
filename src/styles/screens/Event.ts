import { styled } from 'styled-components';

export const StyledEventScreens = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.dark};

  .header {
    width: 100%;
    height: 56px;
    position: fixed;
    top: 0;
    // background: rgba(25, 25, 27, 0.1);
    // backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    box-sizing: border-box;
    z-index: 100000;
    // border-bottom: 1px solid ${({ theme }) => theme.white};
    top: -60px;
    // animation: fadeIn 3s;
    // animation-fill-mode: forwards;
    opacity: 0;
    transition: 2s;
    top: 0px;

    &.showpanel {
      opacity: 1;
    }

    // @keyframes fadeIn {
    //   0% {
    //     opacity: 0;
    //     top: -60px;
    //   }

    //   100% {
    //     top: 0px;

    //     opacity: 1;
    //   }
    // }

    .left-side,
    .right-side {
      width: 45%;
    }

    .right-side {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      a {
        font-size: 14px;
        font-weight: 600;
        line-height: 21px;
        color: ${({ theme }) => theme.white};
        text-decoration: none;
      }
    }

    .logo {
      height: 26px;
    }

    .back-arrow {
      background-color: transparent;
      border: 0px;
      cursor: pointer;
      z-index: 100000;

      svg {
        stroke: ${({ theme }) => theme.white};
      }

      &:hover {
        svg {
          stroke: ${({ theme }) => theme.grey};
        }
        span {
          color: ${({ theme }) => theme.grey};
        }
      }

      span {
        font-size: 14px;
        font-weight: 600;
        line-height: 21px;
        color: ${({ theme }) => theme.white};
        margin-left: 5px;
      }
    }

    .join-event-button {
      height: 30px;
      margin-right: 20px;
    }
  }

  .products-wrapper {
    // display: grid;
    // grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    // gap: 32px;
    // padding: 8px;
    // // max-width: 1370px;
    // margin: 0 auto;
    // z-index: 1000;
    // position: absolute;
    // top: 0;
    // left: 0;
    // bottom: 0;
    // right: 0;

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
  }

  .time-line-progress {
    transition: 1000ms linear;
    height: 2px;
    background-color: ${({ theme }) => theme.white};
  }

  .time-line-container {
    width: 50vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 60px;
    z-index: 1000;
    left: 50%;
    transform: translateX(-50%);
    height: 10px;
    opacity: 0;
    transition: 2s;

    &.showpanel {
      opacity: 1;
    }

    span {
      color: ${({ theme }) => theme.white};
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
    }
  }

  .time-line {
    width: 85%;
    height: 2px;
    background-color: ${({ theme }) => theme.dark};
  }
`;
