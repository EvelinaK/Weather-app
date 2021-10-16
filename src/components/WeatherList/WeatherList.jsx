import React from 'react';
import WeatherItem from '../WeatherItem/WeatherItem';
import { useSelector } from 'react-redux';
import * as citiesSelectors from '../../redux/cities/city-selectors';
import  Grid from '@material-ui/core/Grid';
import  Box from '@material-ui/core/Box';
export default function WeatherList() {
  const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);
  return (
    <>
      {favouriteCities.map(city => (
  <WeatherItem key={city.weather.id} weather={city.weather} />
      ))}
     
    </>
  );
}
