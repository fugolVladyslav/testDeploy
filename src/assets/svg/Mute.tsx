import React from 'react';

interface IconProps {
  color?: string;
  className?: string;
  muted?: boolean;
}

export const Mute: React.FC<IconProps> = ({ color, className, muted }) => {
  return muted ? (
    <svg className={className} width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M25.875 14.6251L29.25 18.0001M29.25 18.0001L32.625 21.3751M29.25 18.0001L32.625 14.6251M29.25 18.0001L25.875 21.3751M10.125 12.3751L17.2045 5.29563C17.9132 4.58692 19.125 5.08886 19.125 6.09112V29.9091C19.125 30.9114 17.9132 31.4133 17.2045 30.7046L10.125 23.6251H6.76358C5.44457 23.6251 4.20886 22.8654 3.85856 21.5938C3.54336 20.4496 3.375 19.2445 3.375 18.0001C3.375 16.7557 3.54336 15.5507 3.85856 14.4065C4.20886 13.1348 5.44457 12.3751 6.76358 12.3751H10.125Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32" fill="none">
      <path
        d="M25.4854 7.51455C30.1716 12.2008 30.1716 19.7988 25.4854 24.4851M21.9502 11.0502C24.6839 13.7839 24.6839 18.216 21.9502 20.9497M9 10.9999L15.2929 4.70701C15.9229 4.07704 17 4.52321 17 5.41412V26.5857C17 27.4766 15.9229 27.9228 15.2929 27.2928L9 20.9999H6.01207C4.83962 20.9999 3.74121 20.3246 3.42983 19.1943C3.14966 18.1772 3 17.106 3 15.9999C3 14.8938 3.14966 13.8226 3.42983 12.8056C3.74121 11.6752 4.83962 10.9999 6.01207 10.9999H9Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
