import { styled } from 'styled-components';
import { HTMLProps } from 'react';

interface StyledButtonProps extends HTMLProps<HTMLButtonElement> {
  flat?: boolean;
  marginBottom?: string;
  borderRadius?: string;
  width?: string;
  transparent?: boolean;
  textButton?: boolean;
  disabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  align-self: center;
  height: ${({ textButton }) => (textButton ? 'auto' : '42px')};
  width: ${({ width }) => (width ? width : '100%')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
  border: ${({ transparent, disabled }) => (disabled ? '1px solid #AFAFB6' : transparent ? '1px solid #FFF' : 'none')};
  color: ${({ flat, theme, transparent, disabled }) => (
    disabled 
      ? transparent
        ? '#AFAFB6' 
        : '#19191B'
      : transparent
        ? '#fff' 
        : flat ? theme.white : theme.dark
  )};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: 0.14px;
  text-transform: uppercase;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ textButton, transparent, theme, disabled }) =>
    disabled 
      ? transparent 
        ? 'transparent'
        : '#AFAFB6'
      : textButton
        ? 'transparent'
        : transparent
        ? `linear-gradient(to right, ${theme.white} 50%, transparent 50%)`
        : `linear-gradient(to right, ${theme.black} 50%, ${theme.white} 50%)`};
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.5s ease-out;
  box-sizing: border-box;

  &:hover {
    background-position: left bottom;
    color: ${({ transparent, theme, disabled }) => (
      disabled 
        ? transparent 
          ? '#AFAFB6' 
          : '#19191B'
        : transparent 
          ? theme.black 
          : theme.white
    )};
  }
`;
