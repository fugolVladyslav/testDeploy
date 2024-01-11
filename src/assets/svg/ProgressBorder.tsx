import React from 'react';

interface IconProps {
  color?: string;
  className?: string;
}

export const ProgressBorder: React.FC<IconProps> = ({ color, className }) => {
  return (
    <svg className={className} viewBox="0 0 216 260" preserveAspectRatio="none">
      <path
        id="animation"
        d="M215.4,4 v251.5 a4,4 0 0 1 -4,4 h-207 a4,4 0 0 1 -4,-4 v-251 a4,4 0 0 1 4,-4 h207 a4,4 0 0 1 4,4 z"
        fill="none"
        stroke={color || '#000000'}
        strokeWidth="3"
      />
    </svg>
  );
};
