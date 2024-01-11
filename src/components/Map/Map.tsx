// import { useCallback, useMemo, useRef, useState } from 'react';
// import { GoogleMap, Marker } from '@react-google-maps/api';

// import { MapControlsContainer } from './MapControlsContainer';
// import { MapControls } from './MapControls';
// import { MapPlaces } from './MapPlaces';
// import { CoordsType } from './mapUtils';
// import { StyledMap } from '../../styles/components/Map/StyledMap';

// type MapProps = {
//   address?: string;
//   handleSelectLocation?: (location: any) => void;
//   setLocationInfo?: (data: any) => void;
//   initCenter?: CoordsType;
// };

export const Map = () => {
  // const [coords, _] = useState<any>(initCenter);
  // const mapRef = useRef<google.maps.Map>();
  // const center = useMemo(() => initCenter, [initCenter?.lat, initCenter?.lng]);
  // const options = useMemo(
  //   () => ({
  //     mapId: '900afbd5cfe4c204',
  //     disableDefaultUI: true,
  //     clickableIcons: false,
  //   }),
  //   [],
  // );

  // const onLoad = useCallback((map: google.maps.Map): void | Promise<void> => {
  //   mapRef.current = map;
  // }, []);

  // const handleSetPlace = async () => {
  // const address = await handleEncodePlace(pos);
  // handleSelectLocation(address.results[0].formatted_address || '');
  // setLocationInfo({
  //   city_locality:
  //     getLocationInfo(address.results[0], 'locality')?.long_name ||
  //     getLocationInfo(address.results[0], 'sublocality')?.long_name ||
  //     getLocationInfo(address.results[0], 'postal_town')?.long_name ||
  //     '',
  //   state_province: getLocationInfo(address.results[0], 'administrative_area_level_1')?.short_name || '',
  //   postal_code: getLocationInfo(address.results[0], 'postal_code')?.long_name || '',
  //   latitude: address.results[0].geometry.location.lat,
  //   longitude: address.results[0].geometry.location.lng,
  //   country_code: getLocationInfo(address.results[0], 'country')?.short_name || '',
  // });
  // setCoords(address.results[0].geometry.location);
  // return address.results[0];
  // };

  // const handleClick = async (event: google.maps.MapMouseEvent) => {
  //   const pos = { lat: Number(event?.latLng?.lat()), lng: Number(event?.latLng?.lng()) };
  //   await handleSetPlace(pos);
  // };

  // const handleChooseLocation = async (pos: { lat: number; lng: number }) => {
  //   const address = await handleSetPlace(pos);
  //   mapRef.current?.panTo(address.geometry.location);
  // };

  return null;
  // <StyledMap>
  //   <MapPlaces address={address} setCoords={handleChooseLocation} setPlace={handleSelectLocation} />
  //   <GoogleMap
  //     zoom={10}
  //     center={center}
  //     options={options}
  //     mapContainerClassName="map-container"
  //     onLoad={onLoad}
  //     onClick={handleClick}
  //   >
  //     <MapControlsContainer position="RIGHT_BOTTOM">
  //       <MapControls setMarker={handleChooseLocation} />
  //     </MapControlsContainer>
  //     {coords && (
  //       <Marker
  //         position={coords}
  //         draggable
  //         onDragEnd={handleClick}
  //         icon={
  //           "data:image/svg+xml,%0A%3Csvg width='30' height='47' viewBox='0 0 30 47' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_8006_50271)'%3E%3Cmask id='path-1-inside-1_8006_50271' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.9988 21.9507C21.0527 21.4496 25 17.1858 25 12C25 6.47715 20.5228 2 15 2C9.47715 2 5 6.47715 5 12C5 17.1858 8.9473 21.4496 14.0012 21.9507C14.0004 21.9671 14 21.9835 14 22L14 40C14 40.5523 14.4477 41 15 41C15.5523 41 16 40.5523 16 40L16 22C16 21.9835 15.9996 21.9671 15.9988 21.9507Z'/%3E%3C/mask%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.9988 21.9507C21.0527 21.4496 25 17.1858 25 12C25 6.47715 20.5228 2 15 2C9.47715 2 5 6.47715 5 12C5 17.1858 8.9473 21.4496 14.0012 21.9507C14.0004 21.9671 14 21.9835 14 22L14 40C14 40.5523 14.4477 41 15 41C15.5523 41 16 40.5523 16 40L16 22C16 21.9835 15.9996 21.9671 15.9988 21.9507Z' fill='%23681CFC'/%3E%3Cpath d='M15.9988 21.9507L15.9001 20.9556L14.9539 21.0495L15 21.9992L15.9988 21.9507ZM14.0012 21.9507L15 21.9992L15.0461 21.0495L14.0999 20.9556L14.0012 21.9507ZM14 22H15H14ZM14 40H13H14ZM16 40H15H16ZM16 22H17H16ZM24 12C24 16.6666 20.4476 20.5047 15.9001 20.9556L16.0975 22.9459C21.6578 22.3945 26 17.7049 26 12H24ZM15 3C19.9706 3 24 7.02944 24 12H26C26 5.92487 21.0751 1 15 1V3ZM6 12C6 7.02944 10.0294 3 15 3V1C8.92487 1 4 5.92487 4 12H6ZM14.0999 20.9556C9.55244 20.5047 6 16.6666 6 12H4C4 17.7049 8.34216 22.3945 13.9025 22.9459L14.0999 20.9556ZM15 22L15 21.9992L13.0024 21.9023C13.0008 21.9345 13 21.9671 13 22H15ZM15 40L15 22H13L13 40H15ZM15 40H13C13 41.1046 13.8954 42 15 42V40ZM15 40V42C16.1046 42 17 41.1046 17 40H15ZM15 22L15 40H17L17 22H15ZM15 21.9992L15 22H17C17 21.9671 16.9992 21.9345 16.9976 21.9023L15 21.9992Z' fill='black' fill-opacity='0.4' mask='url(%23path-1-inside-1_8006_50271)'/%3E%3C/g%3E%3Ccircle cx='15' cy='12' r='3' fill='white'/%3E%3Cdefs%3E%3Cfilter id='filter0_d_8006_50271' x='1' y='0' width='28' height='47' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='2'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_8006_50271'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_8006_50271' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A"
  //         }
  //       />
  //     )}
  //   </GoogleMap>
  // </StyledMap>
};
