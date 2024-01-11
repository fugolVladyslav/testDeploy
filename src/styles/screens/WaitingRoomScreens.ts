import { styled } from 'styled-components';

export const StyledWaitingRoomScreens = styled.div`
  position: relative;
  .player-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .player video {
    object-fit: cover;
  }

  .content-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-end;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      linear-gradient(0.75deg, #19191b 4.74%, rgba(25, 25, 27, 0) 46.34%);

    .event-description {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.01em;
      color: ${({ theme }) => theme.white};
    }

    .start-event {
      font-size: 16px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0.01em;
      color: ${({ theme }) => theme.white};
      // text-align: center;
      width: 100%;
      display: inline-block;
      text-transform: uppercase;
    }

    .event-name {
      font-size: 22px;
      font-weight: 600;
      line-height: 33px;
      letter-spacing: 0em;
      color: ${({ theme }) => theme.white};
      margin-bottom: 12px;
    }

    .event-date {
      display: flex;
      width: 100%;
      border-bottom: 1px solid ${({ theme }) => theme.white};
      margin-bottom: 30px;
      padding-bottom: 12px;

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
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .event-info-block-right {
      justify-content: flex-start;
      display: flex;
      flex-direction: column;
    }

    .event-info-block-center {
      justify-content: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .text-button {
    text-transform: none;
    text-align: right;
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;

    svg {
      stroke: ${({ theme }) => theme.white};
    }

    span {
      margin-left: 6px;
    }
    &:hover {
      span {
        color: ${({ theme }) => theme.grey};
      }

      svg {
        stroke: ${({ theme }) => theme.grey};
      }
    }
  }

  .invite-friend {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
  }

  .select-sizes-button {
    margin-bottom: 16px;
  }

  .mute-button {
    position: absolute;
    top: 50%;
    left: 40px;
    cursor: pointer;
    background: none;
    border: 0px;
    z-index: 10;
  }

  .event-info {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    padding: 0 40px 40px 40px;
    // opacity: 0;
    position: relative;
    // bottom: -250px;
    animation: fadeIn 3s;
    animation-delay: 1s;
    animation-fill-mode: both;

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

  .select-size-btn {
    position: relative;
    margin-bottom: 20px;
  }
  .select-size-btn-green-dot {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: #0EC78F;
  }
  .mobile-counter {
    display: none;
  }

  @media (max-width: 965px) {
    .event-info {
      flex-direction: column;
    }

    .content-wrapper {
      .event-info-block-right {
        display: none;
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
        margin-bottom: 60px;
        width: 60%;
        margin: 0px auto 60px auto;
      }
    }

    .mobile-counter {
      display: block;
      position: absolute;
      top: 100px;
      left: 40px;
      width: calc(100% - 80px) !important;

      .start-event {
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0.01em;
        color: ${({ theme }) => theme.white};
        // text-align: center;
        width: 100%;
        display: inline-block;
        text-transform: uppercase;
      }
    }
  }

  @media (max-width: 600px) {
    .mute-button {
      display: none;
    }

    .select-size-btn-green-dot {
      width: 16px;
      height: 16px;
    }
  }
`;
