import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import citiesOperations from '../redux/cities/city-operations';
import actions from '../redux/cities/city-actions';
import * as citiesSelectors from '../redux/cities/city-selectors';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SearchBar from '../components/Search/Search';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';
import Container from '@material-ui/core/Container';
import  Grid from '@material-ui/core/Grid';
import  Box from '@material-ui/core/Box';
import './../index.css';
import Decoration from '../components/Decorator/Decarator';
import WeatherCard from '../components/WeatherCard/WeatherCard';




function SearchView() {
  const [query, setQuery] = useState('');
  const [request, setRequest] = useState('');

  const { url } = useRouteMatch();
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  const weather = useSelector(citiesSelectors.getItem);
  const locationWeather = useSelector(citiesSelectors.getLocationWeather);
  const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);

  const searchURL = new URLSearchParams(location.search).get('query') ?? '';
  const isFirstRender = useRef(true);



  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (searchURL === '') {
      return;
    }
  }, [ location.search, searchURL]);




  const addCity = event => {
    if (favouriteCities.find(city => city.weather.id === weather.id)) {
      return;
    }
    dispatch(actions.addCity(weather));
  };

  const dateBuilder = d => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };



  const refresh = id => {
    dispatch(citiesOperations.fetchCityByID(id));
  };


  let DayOrNigth
 
 if(  Object.keys(weather).length !== 0){
  switch (weather?.weather[0]?.icon.slice(2)) { 
    case 'n':
      DayOrNigth = 'night';
    
  }

}else if(Object.keys(locationWeather).length !== 0){
  switch (locationWeather?.weather[0]?.icon.slice(2)) { 
    case 'n':
      DayOrNigth = 'night'; 

  };
}else{
  DayOrNigth = 'day';
}


  return (
    <div className="App">
      <div className="search-box">
       <SearchBar/> 
      </div>
      <Decoration DayOrNigth={DayOrNigth} /> 

      {weather.weather && (

<Container maxWidth="xl">
<Box className={classes.box} sx={{ pb: 5 }}>
<Grid item xs={11} sm={8} md={6}>
<WeatherCard weather={weather}/>
</Grid>
</Box>
</Container>

      )}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 24,
  },
  box:{
    display:'flex',
    justifyContent:'center',
  }
}));

export default SearchView;
