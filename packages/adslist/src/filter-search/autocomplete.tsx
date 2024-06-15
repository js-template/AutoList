'use client';
import { useRef, useState } from 'react';

const LocationAutocomplete = ({ onPlaceSelect }: any) => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();

  const [locationInput, setLocationInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const fetchLocationSuggestions = async (input: any) => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();

      if (data.status === 'OK') {
        setSuggestions(data.predictions);
      } else {
        console.error('Error fetching location suggestions:', data.status);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleInputChange = (e: any) => {
    const input = e.target.value;
    setLocationInput(input);
    fetchLocationSuggestions(input);
  };

  const handleSelect = (place: any) => {
    setInputValue(place.description);
    setSuggestions([]);
    onPlaceSelect(place);
  };

  const handleBlur = () => {
    // Clear suggestions when the input field loses focus
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        // @ts-ignore
        onChange={handleInputChange}
        onBlur={handleBlur}
        // @ts-ignore
        ref={inputRef}
        placeholder="Where"
        className="h-14 rounded-lg z-0 focus:outline-none border border-themeWhiteLight2 w-full pl-14"
      />
      <div className="autocomplete-dropdown-container">
        {suggestions.map((suggestion) => (
          <div
            //   @ts-ignore
            key={suggestion.place_id}
            onClick={() => handleSelect(suggestion)}
            className="suggestion-item"
          >
            {/* @ts-ignore */}
            {suggestion.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationAutocomplete;
