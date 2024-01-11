import { HTMLProps } from 'react';
import { styled } from 'styled-components';

interface StyledMyCardProps extends HTMLProps<HTMLButtonElement> {
  showMyCard?: boolean;
}

export const StyledMyCard = styled.div<StyledMyCardProps>`
  overflow: hidden;
  .overlay {
    background: rgba(25, 25, 27, 0.5);
    height: calc(100vh - 56px);
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 100vw;
    transition: 0.75s;

    &.active {
      left: 0px;
    }
  }

  .panel {
    // animation: ${({ showMyCard }) => (showMyCard ? 'fadeInCard' : 'fadeOutCard')} 2s;
    animation-fill-mode: forwards;
    width: 350px;
    position: fixed;
    background-color: ${({ theme }) => theme.dark};
    height: calc(100vh - 56px);
    right: -350px;
    top: 56px;
    border-left: 1px solid ${({ theme }) => theme.white};
    padding: 40px 30px;
    box-sizing: border-box;
    overflow-y: scroll;
    z-index: 10000;
    transition: 2s;

    &.active {
      right: 0px;
    }
  }

  .bottom-nav {
    position: sticky;
    bottom: -40px;
    background: ${({ theme }) => theme.dark};
    padding: 40px 0;

    .button-action-first {
      margin-bottom: 20px;
    }

    .price-total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;

      span {
        color: ${({ theme }) => theme.white};
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
        letter-spacing: 0.14px;
        &:first-child {
          font-weight: 700;
        }

        &:last-child {
          font-weight: 400;
        }
      }
    }
  }

  .empty-card {
    position: absolute;
    width: calc(100% - 60px);
    bottom: 20px;
  }
`;
