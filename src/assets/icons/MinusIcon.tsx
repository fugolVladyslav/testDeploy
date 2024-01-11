import React from 'react';

interface IconProps {
  className?: string;
  size?: string;
}

export const MinusIcon: React.FC<IconProps> = ({ className, size }) => {
  const s = size ?? '24';
  return (
    <svg className={className} width={s} height={s} fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M19.2 12H4.8" />
    </svg>
  );
};
