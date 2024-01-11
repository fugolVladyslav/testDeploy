import { StyledButton } from '../styles/components/Button';
import { FC, HTMLProps } from 'react';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: () => void;
  flat?: boolean;
  type?: 'button' | 'submit' | 'reset';
  marginBottom?: string;
  borderRadius?: string;
  width?: string;
  transparent?: boolean;
  textButton?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  ...restProps
}) => {
  return (
    <StyledButton {...restProps}>
      {leftIcon}
      <span>{children}</span>
      {rightIcon}
    </StyledButton>
  );
};
