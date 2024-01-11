export type CoordsType = {
  lat: number;
  lng: number;
};

export type LocationInfoType = {
  city_locality: string;
  state_province: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  country_code: string;
};
export const googleMapsApiKey: string = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

export const handleEncodePlace = async ({ lat, lng }: CoordsType) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`,
  );
  const address = await res.json();

  return address.status === 'OK' ? address : address.status;
};

export const getLocationInfo = (place: google.maps.places.PlaceResult, id: string) =>
  place?.address_components?.find((item: google.maps.GeocoderAddressComponent) =>
    item.types.some((el: string) => el === id),
  );
