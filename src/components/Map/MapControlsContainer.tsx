import React, { useEffect, useRef } from 'react';
import { useGoogleMap } from '@react-google-maps/api';

type MapControlsProps = {
  children: React.ReactNode;
  position: keyof typeof google.maps.ControlPosition;
};

export const MapControlsContainer = ({ children, position }: MapControlsProps) => {
  const map = useGoogleMap();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (map && ref.current) {
      map.controls[window.google.maps.ControlPosition[position]].push(ref.current);
    }
  }, [map, ref]);

  return <div ref={ref}>{children}</div>;
};
