import { FC } from 'react';

interface IconProps {
  className?: string;
  width?: string;
}

export const CheckBrokenIcon: FC<IconProps> = ({ className, width }) => {
  const size = width ?? '24';

  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path stroke="currentColor" strokeLinecap="round" d="m7.775 11.07 3.352 3.5 9.826-9.816" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M19.755 11.814a8.477 8.477 0 1 1-4.38-7.164"
      />
    </svg>
  );
};
