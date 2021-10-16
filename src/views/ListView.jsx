import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import citiesOperations from '../redux/cities/city-operations';
import actions from '../redux/cities/city-actions';
import ForecastMap from '../components/WeatherMap/WeatherMap'
// import '../views/HomeView.scss';
import Decoration from '../components/Decorator/Decarator';
import './../index.css';
import dayBg from '../images/day.png';
import nightBg from '../images/night.png';


import * as citiesSelectors from '../redux/cities/city-selectors';
import WeatherList from '../components/WeatherList/WeatherList';


const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 500,
        fontSize: 48,
        textAlign: 'center',
        background: 'transparent',
    },
    containerMap:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

function ListView() {
    const dispatch = useDispatch();
    const [geoposition, setGeoposition] = useState({});
    const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);
    const locationWeather = useSelector(citiesSelectors.getLocationWeather);
let DayOrNigth

    return (
        <>
            <Decoration DayOrNigth={DayOrNigth} /> 
        <div style={styles.container} className="container-weather">
          <h1 style={styles.title}>Weather</h1>
          {favouriteCities.length > 0 ? (
            <div className="home-title">
              <h1 className="home-title">Your favorite cities</h1>
            <WeatherList cities={favouriteCities} />
            </div>
          ) : (
            <h2 className="home-title">Choose your favorite cities</h2>
          )}
        </div>
       </>
                
      );

}

export default ListView;