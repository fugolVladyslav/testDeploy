import { FC } from 'react';

interface IconProps {
  className?: string;
  size?: string;
  color?: string;
}

export const Plus: FC<IconProps> = ({ className, size, color }) => {
  const s = size ?? '20';
  return (
    <svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 20 20"
      fill={color ? color : 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0007 4.45837C11.0007 3.90609 10.5529 3.45837 10.0007 3.45837C9.44837 3.45837 9.00065 3.90609 9.00065 4.45837V9.00004H4.45898C3.9067 9.00004 3.45898 9.44776 3.45898 10C3.45898 10.5523 3.9067 11 4.45898 11H9.00065V15.5417C9.00065 16.094 9.44837 16.5417 10.0007 16.5417C10.5529 16.5417 11.0007 16.094 11.0007 15.5417V11H15.5423C16.0946 11 16.5423 10.5523 16.5423 10C16.5423 9.44776 16.0946 9.00004 15.5423 9.00004H11.0007V4.45837Z"
      />
    </svg>
  );
};
