import { styled } from 'styled-components';

interface StyledProps {
  scrollEnable?: boolean;
}

export const StyledMissedItemsScreens = styled.div<StyledProps>`
  background-color: ${({ theme }) => theme.dark};
  width: '100%';
  min-height: 100vh;
  padding: 80px 0px 140px 0px;
  box-sizing: border-box;
  overflow-y: ${({ scrollEnable }) => (scrollEnable ? 'scroll' : 'hidden')};

  .counter {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.16px;
    align-items: center;
    display: flex;
    justify-content: center;

    img {
      margin-left: 10px;
      width: 24px;
      cursor: pointer;
    }
  }

  .empty-state {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.26px;
    margin-bottom: 26px;
    text-transform: uppercase;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  #tooltip {
    border: 1px solid #fff;
    background: #19191b;
    padding: 10px;
    width: 250px;
    text-align: center;
  }

  .title {
    color: ${({ theme }) => theme.white};
    margin-bottom: 26px;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.26px;
  }

  .products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 100px;
    column-gap: 53px;
    margin-top: 60px;
    padding: 0px 40px;
    opacity: 0;
    animation: showProducts 3s;
    // animation-delay: 1s;
    animation-fill-mode: forwards;

    @keyframes showProducts {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  // .bottom-navigation {
  //   padding: 30px;
  //   border-top: 1px solid ${({ theme }) => theme.grey};
  //   position: fixed;
  //   bottom: 0;
  //   width: 100%;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   bottom: -100%;
  //   background: rgba(25, 25, 27, 0.4);
  //   backdrop-filter: blur(7.5px);

  //   animation: showBottomPanel 3s;
  //   animation-fill-mode: forwards;

  //   @keyframes showBottomPanel {
  //     0% {
  //       bottom: -100%;
  //     }

  //     100% {
  //       bottom: 0%;
  //     }
  //   }
  // }

  .bottom-navigation {
    display: none;
  }

  .success-added-item {
    position: fixed;
    bottom: -100px;
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    padding: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 3s;

    &.show {
      bottom: 0;
    }

    p {
      color: ${({ theme }) => theme.dark};
      text-align: center;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
      margin-left: 12px;
    }

    img {
      height: 24px;
    }
  }

  @media (max-width: 965px) {
    padding: 80px 0px 0px 0px;

    .products-container {
      padding: 0px 40px 140px 40px;
    }

    .bottom-navigation {
      padding: 30px;
      border-top: 1px solid ${({ theme }) => theme.grey};
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(25, 25, 27, 0.4);
      backdrop-filter: blur(7.5px);
      box-sizing: border-box;
    }
  }
`;
