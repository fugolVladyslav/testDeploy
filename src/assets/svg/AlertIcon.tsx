import { FC } from 'react';

interface IconProps {
  className?: string;
  size?: string;
}

export const AlertIcon: FC<IconProps> = ({ size, className }) => {
  const s = size ?? '24';
  return (
    <svg className={className} width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM12 7v6"
      />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16h.01" />
    </svg>
  );
};
