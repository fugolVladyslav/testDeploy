import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type IImageProps = {
  loader?: 'circle' | 'skeleton';
  containerClassName?: string;
  skeletonClassName?: string;
  src: string;
  alt: string;
} & React.ComponentProps<'img'>;

export const Image = ({
  src,
  alt,
  loader = 'circle',
  skeletonClassName = '',
  containerClassName = '',
  ...rest
}: IImageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      {loader === 'circle' ? (
        <img
          style={{ display: isLoaded ? 'none' : 'block' }}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: transparent; display: block; shape-rendering: auto;' width='80px' height='80px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cpath d='M10 50A40 40 0 0 0 90 50A40 42.5 0 0 1 10 50' fill='%23691dfc' stroke='none'%3E%3CanimateTransform attributeName='transform' type='rotate' dur='1s' repeatCount='indefinite' keyTimes='0;1' values='0 50 51.25;360 50 51.25'%3E%3C/animateTransform%3E%3C/path%3E%3C/svg%3E"
          alt="loading"
        />
      ) : (
        <>
          {isLoaded || (
            <Skeleton enableAnimation containerClassName={containerClassName} className={skeletonClassName} />
          )}
        </>
      )}
      <img
        src={src}
        style={{ display: isLoaded ? 'block' : 'none' }}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        {...rest}
      />
    </>
  );
};
