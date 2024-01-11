import React from 'react';

interface IconProps {
  className?: string;
  size?: string;
}

export const LocationIcon: React.FC<IconProps> = ({ className, size }) => {
  const s = size ?? '24';
  return (
    <svg className={className} width={s} height={s} fill="none" viewBox="0 0 26 26">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
        d="M13 5.2V1m0 24v-4.2m7.8-7.8H25M1 13h4.2m17.4 0a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0Z"
      />
    </svg>
  );
};
