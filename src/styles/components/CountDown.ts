import { styled } from 'styled-components';

export const StyledCountDown = styled.div`
  .countdown-wrapper {
    display: flex;
    flex-direction: row;
    margin-right: 16px;
  }
  .countdown-box {
    display: flex;
    flex-direction: column;
    margin-right: 16px;
  }

  .legend {
    color: ${({ theme }) => theme.white};
    text-align: center;
    font-size: 12px;
    font-weight: 400;
  }
  .time-text {
    color: ${({ theme }) => theme.white};
    font-size: 16px;
    font-weight: 400;
    border: 1px solid ${({ theme }) => theme.grey};
    padding: 13px;
    margin-bottom: 10px;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
