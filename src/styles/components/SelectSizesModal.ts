import Modal from 'styled-react-modal';

export const StyledSelectSizesModal = Modal.styled`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #FFF;
    background: #19191B;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 40px 60px;
    width: 30vw;
    // width: fit-content;

    h3{
    color: #ffffff;

    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.26px;
    margin-bottom: 30px;
}

.text-button {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    padding-bottom: 4px;
    border-bottom: 1px solid #ffffff;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 34px;
  }


  .mySwiper-sizes .swiper-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .swiper {
    width: 100%;
    height: 100%;
    border-top: 1px solid rgba(175, 175, 182, 0.30);
    border-bottom: 1px solid rgba(175, 175, 182, 0.30);
    padding: 15px 0;
    margin-bottom: 16px;
  }
  
  .swiper-slide {
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    position: relative;
    cursor: pointer;
    // margin: 0 15px;

    &:hover {
      &::before {
        display: block;
        content: '';
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 3px;
        background: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
      }
    }

 
  }

  .selected-size-effect {
    position: relative;

    &::before {
      display: block;
      content: '';
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
      background: radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
    }
  }

  .select-size-options {
    cursor: pointer;
    width: 100%;

    input{
      display: none
    }
  }

`;
