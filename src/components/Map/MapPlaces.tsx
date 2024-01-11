import { useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

// import { Plus } from '../../assets/icons';
import { StyledMapPlaces } from '../../styles/components/Map/StyledMapPlaces';

type MapPlacesProps = {
  address: string;
  setCoords: (pos: { lat: number; lng: number }) => void;
  setPlace: (place: string) => void;
  shippingAddressDelivery?: boolean;
};

export const MapPlaces = ({ address, setCoords, shippingAddressDelivery }: MapPlacesProps) => {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const res = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(res[0]);
    setCoords({ lat, lng });
  };

  // const handleDelete = () => {
  //   setValue(address, false);
  //   clearSuggestions();

  //   setPlace('');
  // };

  useEffect(() => {
    setValue(address, false);
  }, [address]);

  return (
    <StyledMapPlaces shippingAddressDelivery={!!shippingAddressDelivery}>
      {/* <div onClick={handleDelete}>
        <Plus className="delete" color={'#fff'} />
      </div> */}
      <input
        className="input-text"
        value={value}
        disabled={!!shippingAddressDelivery}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Address 1"
      />
      {status === 'OK' && (
        <div className="suggestions">
          {data.map((item: any) => (
            <div key={item.place_id} className="suggestion-item" onClick={() => handleSelect(item.description)}>
              {item.description}
            </div>
          ))}
        </div>
      )}
    </StyledMapPlaces>
  );
};
