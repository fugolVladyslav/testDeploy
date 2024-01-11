import styled from 'styled-components';

export const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  animation: visibility 0.6s linear;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
