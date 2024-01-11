import { useState } from 'react';
import { useGoogleMap } from '@react-google-maps/api';
import { StyledMapControls } from '../../styles/components/Map/StyledMapControls';
import { LocationIcon, MinusIcon, Plus } from '../../assets/icons';

type MapControlsType = {
  setMarker: (pos: { lat: number; lng: number }) => void;
};

export const MapControls = ({ setMarker }: MapControlsType) => {
  const [isCurrentLocationLoading, setIsCurrentLocationLoading] = useState<boolean>(false);
  const map = useGoogleMap();

  const handleZoom = () => {
    const currentZoom = map?.getZoom();
    if (currentZoom) {
      map?.setZoom(currentZoom + 1);
    }
  };

  const handleUnZoom = () => {
    const currentZoom = map?.getZoom();
    if (currentZoom) {
      map?.setZoom(currentZoom - 1);
    }
  };

  const handleCurrentLocation = () => {
    if (isCurrentLocationLoading) return;

    if (map) {
      setIsCurrentLocationLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((geo) => {
          const pos = {
            lat: geo.coords.latitude,
            lng: geo.coords.longitude,
          };

          setIsCurrentLocationLoading(false);
          setMarker(pos);
          map.setCenter(pos);
        });
      } else {
        alert('geolocation not allowed');
      }
    }
  };

  return (
    <StyledMapControls>
      <div className="control-item zoom-control" onClick={handleZoom}>
        <Plus />
      </div>
      <div className="control-item zoom-control" onClick={handleUnZoom}>
        <MinusIcon size="20" />
      </div>
      <div
        className={'control-item location-control ' + (isCurrentLocationLoading ? 'location-search' : '')}
        onClick={handleCurrentLocation}
      >
        <div className="dot" />
        <LocationIcon size="20" />
      </div>
    </StyledMapControls>
  );
};
