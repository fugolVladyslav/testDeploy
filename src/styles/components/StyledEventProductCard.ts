import styled from 'styled-components';

type StyledProductCardProps = {
  disabled: boolean;
  isplay?: boolean;
  duration?: number;
  animationstartpos?: number;
};

export const StyledEventProductCard = styled.div<StyledProductCardProps>`
  width: 178px;
  height: 232px;
  border-radius: 2%;
  gap: 9px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
  padding: 18px 11px;
  transition: 3s;
  position: absolute;
  background: rgba(25, 25, 27, 0.4);
  backdrop-filter: blur(10px);
  opacity: 0;
  animation: fade ${({ duration }) => duration}s linear;
  animation-play-state: ${({ isplay }) => (isplay ? 'running' : 'paused')};

  .card-size-wrapper {
    position: absolute;
    width: 100%;
    height: 30px;
    top: -46px;
    display: grid;
    grid-template-columns: repeat(3, 38px);
    grid-gap: 8px;
    align-items: center;

    & > div {
      border-radius: 4px;
      border: 1px solid #fff;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: AreaInktrap-Semibold;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
      color: #fff;
      transition: all 0.3s ease-in;
      cursor: pointer;

      &.selected {
        background: #fff;
        color: #000;
      }
    }
  }

  .select {
    display: none;
  }

  .animation {
    width: 100%;
    height: 100%;
    position: absolute;

    path#animation {
      stroke: white;
      stroke-width: 1;
      fill: none;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;

      animation: border-card ${({ duration }) => duration}s linear;
      animation-play-state: ${({ isplay }) => (isplay ? 'running' : 'paused')};
    }
  }

  .info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .name-container {
    width: 100%;

    p {
      font-family: AreaInktrap-Extrabold;
      font-size: 14px;
      line-height: 15px;
      color: ${({ theme }) => theme.white};
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      letter-spacing: -0.14px;
    }
  }

  p {
    font-family: AreaInktrap-Regular;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.white};
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  .img-container {
    min-width: 50px;
    min-height: 53px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .btn {
    width: 70%;
    border: 1px solid white;
    border-radius: 4px;
    padding: 4px 20px;
    white-space: nowrap;
    color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 10000;
    height: 30px;

    &:hover {
      color: ${({ theme }) => theme.dark};
    }

    span {
      font-size: 12px;
      line-height: 140%;
    }
  }

  .btn-placed {
    width: 70%;
    border: 1px solid #0EC78F;
    border-radius: 4px;
    padding: 4px 20px;
    white-space: nowrap;
    color: #0EC78F;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 10000;
    height: 30px;
    background: transparent;

    span {
      font-size: 12px;
      line-height: 140%;
    }
  }

  @keyframes border-card {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes fade {
    0% { opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
