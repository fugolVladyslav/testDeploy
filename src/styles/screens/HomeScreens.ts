import { styled } from 'styled-components';

export const StyledHomeScreens = styled.div`
  scroll-behavior: smooth;
  .player-container {
    width: 100%;
    height: 100vh;
    position: relative;
    // overflow: hidden;
  }

  .player video {
    object-fit: cover;
  }

  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    z-index: 2;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      linear-gradient(0.75deg, #19191b 4.74%, rgba(25, 25, 27, 0) 46.34%);

    .event-info {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      padding: 0 40px 40px 40px;
      opacity: 0;
      position: relative;
      bottom: -250px;
      animation: fadeIn 3s;
      animation-delay: 1s;
      animation-fill-mode: forwards;
      z-index: 1000;
      // bottom: 0px;
      // opacity: 1;

      @keyframes fadeIn {
        0% {
          opacity: 0;
          bottom: -250px;
        }
        50% {
          opacity: 0.5;
          bottom: 0px;
        }
        100% {
          bottom: 0px;
          opacity: 1;
        }
      }

      .event-info-block {
        width: 30%;
      }
    }

    .event-description {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.01em;
      color: ${({ theme }) => theme.white};
    }

    .price-event {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0.01em;
      color: ${({ theme }) => theme.white};
      text-align: center;
      width: 100%;
      display: inline-block;
      margin-bottom: 15px;
    }

    .event-name {
      font-size: 22px;
      font-weight: 600;
      line-height: 33px;
      letter-spacing: 0em;
      color: ${({ theme }) => theme.white};
    }

    .event-date {
      display: flex;
      width: 100%;

      div:first-child {
        margin-right: 50px;
      }

      div {
        display: flex;
        align-items: center;
      }

      span {
        color: ${({ theme }) => theme.white};
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        margin-left: 6px;
      }
    }

    .event-name-container {
      border-bottom: 1px solid ${({ theme }) => theme.white};
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .event-info-block-right {
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      padding-top: 20px;
    }

    .event-info-block-center {
      justify-content: center;
      display: flex;
      flex-direction: column;

      a {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
  .products-container {
    background-color: ${({ theme }) => theme.dark};
    padding: 100px 40px 120px 40px;

    .title {
      color: #fff;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 60px;
      opacity: 0;
    }

    .products-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 80px;
      column-gap: 53px;
      opacity: 0;
    }

    .show-products {
      animation: showProducts 3s;
      animation-fill-mode: forwards;
    }
  }

  @keyframes showProducts {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .mute-button {
    position: absolute;
    top: 50%;
    left: 40px;
    cursor: pointer;
    background: none;
    border: 0px;
    z-index: 3;
  }

  .bottom-arrow {
    position: relative;
    background: red;

    img {
      animation: bottomArrowAnimation 1.5s infinite;
      animation-fill-mode: forwards;
      top: -5px;
      position: absolute;

      @keyframes bottomArrowAnimation {
        0% {
          top: -5px;
        }
        100% {
          top: 0px;
        }
      }
    }
  }

  @media (max-width: 965px) {
    .bottom-arrow {
      display: none;
    }

    .content-wrapper {
      .event-info {
        flex-direction: column;
        height: auto;
        padding: 0 20px 20px 20px;

        @keyframes fadeIn {
          0% {
            opacity: 0;
            bottom: -250px;
          }
          50% {
            opacity: 0.5;
            bottom: 0px;
          }
          100% {
            bottom: 0px;
            opacity: 1;
          }
        }

        .event-info-block {
          width: 100%;
        }

        .event-name-container {
          margin-bottom: 30px;
          padding-bottom: 12px;

          .event-name {
            margin-bottom: 12px;
          }
        }

        .event-info-block-center {
          margin-bottom: 30px;
        }

        .event-info-block-right {
          flex-direction: row;
          align-items: center;

          .price-event {
            text-align: left;
            margin-bottom: 0px;
          }
        }
      }
    }

    .products-container {
      padding-bottom: 50px;

      .products-list {
        justify-content: center;
        row-gap: 40px;
      }
    }
  }
  @media (max-width: 600px) {
    .mute-button {
      display: none;
    }
  }
`;
