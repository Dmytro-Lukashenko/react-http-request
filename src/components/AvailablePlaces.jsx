import Places from './Places.jsx';
import Error from './Error.jsx';
import { useState, useEffect } from 'react';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  const fetchPlaces = async () => {
    try {
      setIsLoadingState(true);
      const data = await fetchAvailablePlaces();
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(data.places, position.coords.latitude, position.coords.longitude)
        setAvailablePlaces(sortedPlaces)
      })     
    } catch (error) {
      setError({ message: error.message || "Couldn't fetch places, please try again later!" });
    } finally {
      setIsLoadingState(false);
    }
  }

  useEffect(() => {
    fetchPlaces();
    // fetch('http://localhost:3000/places')
    // .then((response) => {
    //   return response.json();
    // })
    // .then((resData) => {
    //   setAvailablePlaces(resData.places)
    // })
  }, []);

  if (error) {
    console.log(error)
    return <Error title="An error occurred!" message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoadingState}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
