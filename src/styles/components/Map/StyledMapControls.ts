import styled from 'styled-components';

export const StyledMapControls = styled.div`
  padding: 30px;

  .control-item {
    width: 36px;
    height: 36px;
    background-color: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .zoom-control {
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .location-control {
    margin-top: 8px;
    border-radius: 18px;

    .dot {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 4px;
    }
  }

  .location-search {
    color: #681cfc;
    animation: location-loading 2s ease-in-out infinite;

    .dot {
      background-color: #681cfc;
    }
  }

  @keyframes location-loading {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
