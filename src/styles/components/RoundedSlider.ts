import { styled } from 'styled-components';

export const RoundedSliderStyles = styled.div`
  .carousel {
    width: 11.125rem;
    height: 11.125rem;
    position: relative;
    margin: 0 auto;
    // perspective: 62.5rem;
    perspective: 40.5rem;
  }

  .carousel__container {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 1s;
  }

  .carousel__slide {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 6.875rem;
    height: 6.875rem;
    left: 0.625rem;
    top: 0.625rem;
    border: 1px solid;
    cursor: pointer;
    overflow: hidden;
    transition:
      transform 1s,
      opacity 1s;
  }

  .carousel__slide img {
    height: 100%;
    width: auto;
    display: block;
  }

  .carousel__slide-overlay {
    color: #fff;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // opacity: 0;
    transition: opacity 0.35s ease-in-out;
    background-color: rgba(0, 0, 0, 0.7);
    user-select: none;
  }

  .carousel__slide-overlay span,
  .carousel__slide-overlay strong {
    display: block;
    flex: 0 0 100%;
  }

  .carousel__slide:hover .carousel__slide-overlay {
    opacity: 1;
  }

  .carousel__controls {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }

  .carousel__control {
    font-size: 0;
    line-height: 0;
    text-indent: -100%;
    width: 2.5rem;
    height: 2.5rem;
    display: block;
    position: relative;
    border: 1px solid;
    margin: 0 2rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    box-shadow: none;
  }

  .carousel__control::before,
  .carousel__control::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  .carousel__control::before {
    width: 50%;
    height: 1px;
    background-color: #fff;
  }

  .carousel__control::after {
    content: '';
    width: 0.9375rem;
    height: 0.9375rem;
    display: inline-block;
    vertical-align: middle;
    border-color: #fff;
    border-style: solid;
    border-width: 0 0 1px 1px;
    margin: auto;
    transform: rotate(-135deg);
    transform-origin: 50% 50%;
    transition: all 0.35s ease-in-out;
  }

  .carousel__control--prev::after {
    transform: rotate(45deg);
  }

  .active_slide {
    position: relative;

    &:before {
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translateX(-50%);
      background: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
      width: 50px;
      height: 6px;
      content: '';
    }

    &:after {
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      background: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
      width: 50px;
      height: 6px;
      content: '';
    }
  }

  .inactive_slide {
    border-color: #888891;
    .carousel__slide-overlay {
      background-color: rgba(17, 17, 19, 0.7);
      backdrop-filter: blur(1px);
      opacity: 1;
    }
  }

  .checked_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 100px;
    padding: 10px;
  }

  @media (max-width: 965px) {
    .carousel {
      width: 70px;
      height: 100px;
    }
    .carousel__container {
      width: auto;
      height: 100px;
    }

    .carousel__slide {
      width: 50px;
      height: 50px;
    }

    .active_slide {
      position: relative;

      &:before {
        top: -2px;
        width: 20px;
        height: 2px;
      }

      &:after {
        bottom: -2px;
        width: 20px;
        height: 2px;
      }
    }

    .checked_item {
      height: 10px;
      padding: 5px;
    }
  }
`;
