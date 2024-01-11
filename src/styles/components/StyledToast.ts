import styled from 'styled-components';

export const StyledToast = styled.div`
  width: 600px;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  animation: visibility 0.6s linear;
  z-index: 1000000;

  &.success {
    border: 1px solid rgba(29, 161, 84, 0.5);
    background-color: #f4fef9;

    .success-icon {
      color: #1da154;
    }
  }

  &.error {
    border: 1px solid rgba(249, 21, 21, 0.5);
    background-color: #fff8f8;

    .error-icon {
      color: #f91515;
    }
  }

  .message-container {
    font-family: AreaInktrap-Semibold;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      padding-top: 3px;
    }
  }

  .close {
    cursor: pointer;
    svg {
      transform: rotate(45deg);
    }
  }

  @keyframes visibility {
    from {
      top: -200px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;
