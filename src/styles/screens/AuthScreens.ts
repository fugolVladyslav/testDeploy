import { styled } from 'styled-components';

interface StyledProps {
  showmodal?: boolean;
}

export const StyledAuthScreens = styled.div<StyledProps>`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .player video {
    object-fit: cover;
  }

  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%);
    z-index: ${({ showmodal }) => (showmodal ? '29' : '10001')};
    .form-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: calc(100% - 56px);
    }

    .footer-wrapper {
      width: 100%;
      height: 56px;
      border-top: 1px solid ${({ theme }) => theme.white};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;

      a {
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: 0.12px;
        color: ${({ theme }) => theme.white};
        text-decoration: none;

        &:hover {
          color: ${({ theme }) => theme.grey};
          text-decoration: underline;
        }
      }
    }
  }
`;
