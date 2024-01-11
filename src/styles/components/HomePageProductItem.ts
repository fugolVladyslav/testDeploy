import { HTMLProps } from 'react';
import { styled } from 'styled-components';

interface StyledHomePageProductItemProps extends HTMLProps<HTMLElement> {
  width?: string;
  height?: string;
  minheight?: string;
}

export const StyledHomePageProductItem = styled.div<StyledHomePageProductItemProps>`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : '300px')};
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  position: relative;
  ${({ minheight }) => (minheight ? `min-height: ${minheight}` : '')};

  img {
    // height: ${({ height }) => (height ? '80%' : '220px')};
    // width: ${({ width }) => (width ? 'fit-content' : 'fit-content')};
    width: 100%;
    margin-bottom: 40px;
    object-fit: contain !important;
    height: -webkit-fill-available;
  }

  .description-container {
    flex: 1;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }

  .name {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .price {
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-weight: 400;
    text-align: center;
  }

  .item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(25, 25, 27, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.5s linear;
  }

  &:hover .item-overlay {
    opacity: 1;
  }

  .button-action {
    margin-top: 32px;
    padding: 10px;
  }
`;
