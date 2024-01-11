import { styled } from 'styled-components';

export const StyledPickedItemsScreens = styled.div`
  background-color: ${({ theme }) => theme.dark};
  width: '100%';
  height: 100vh;
  padding: 80px 0px 24px 0px;
  box-sizing: border-box;
  overflow: hidden;

  .container {
    opacity: 0;
    animation: showProducts 4s;
    animation-fill-mode: forwards;
  }

  @keyframes showProducts {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
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

  .cardContainer {
    background-color: blue;
    /*margin: 20px;*/
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    align-items: center;
    box-shadow: 5px 4px 5px rgba(0, 0, 0, 0.4);
  }
  .titleContainer {
    background-color: white;
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-top: 5px;
  }
  #title {
    flex-grow: 3;
    position: relative;
  }

  #rating {
    width: 40%;
    background-color: orange;
    flex-direction: row;
  }
  .cardImgContainer {
    background-color: green;
  }

  .cardImgContainer img {
    object-fit: fill;
  }

  .cardTextContainer {
    background-color: red;
  }

  .title {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.26px;
    margin-bottom: 26px;
    text-transform: uppercase;
  }

  .counter {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: 0.16px;
    align-items: center;
    display: flex;
    justify-content: center;

    img {
      margin-left: 10px;
      cursor: pointer;
      width: 24px;
    }
  }

  .event-button {
    margin: 0 auto;

    svg {
      transform: rotate(180deg);
      stroke: #000;
    }

    &:hover {
      svg {
        stroke: ${({ theme }) => theme.white};
      }
    }
  }

  .bottom-navigation {
    padding: 30px 0;
    border-top: 1px solid ${({ theme }) => theme.grey};
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.dark};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-container {
    height: 70vh;
  }

  .slide {
    transform: scale(0.6);
    transition: transform 300ms;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      transform: scale(1);
      opacity: 1;

      .item-overlay {
        display: none;
      }
    }
  }

  .activeSlide {
    transform: scale(1);
    cursor: pointer;
    &:hover {
      .item-overlay {
        display: none;
      }
    }
  }

  .slideWrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  #tooltip {
    border: 1px solid #fff;
    background: #19191b;
    padding: 10px;
    width: 250px;
    text-align: center;
  }

  .slick-cloned {
    display: none;
  }

  @media (max-width: 965px) {
    .slick-cloned {
      display: block;
    }

    .slick-list {
      padding: 0 20% 0 0 !important;
    }

    .event-button {
      width: 100%;
    }

    .bottom-navigation {
      padding: 30px 20px;
      box-sizing: border-box;
    }
  }
`;
