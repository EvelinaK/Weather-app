
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import citiesOperations from '../../redux/cities/city-operations';
import actions from '../../redux/cities/city-actions';
import * as citiesSelectors from '../../redux/cities/city-selectors';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';
import CardMediaComponent from "../CardMedia/CardMedia";
// material
// import { alpha, styled } from '@mui/material/styles';
import {styled, alpha} from '@mui/material/styles';
// '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import zIndex from '@material-ui/core/styles/zIndex';
// import { Card, Typography } from '@material-ui/material';
// utils




export default function WeatherCard({weather}) {
  const [query, setQuery] = useState('');
  const [request, setRequest] = useState('');

  const { url } = useRouteMatch();
  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  // const weather = useSelector(citiesSelectors.getItem);
  const locationWeather = useSelector(citiesSelectors.getLocationWeather);
  const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);

  const searchURL = new URLSearchParams(location.search).get('query') ?? '';
  const isFirstRender = useRef(true);


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



  let background = 'rgba(200 250 205 / 42%)'

  switch (  Object.keys(weather).length !== 0 && weather?.weather[0].main) {
    case 'Clear':
      background = '#fcf06159';
      break

    case 'Clouds':
      background = '#3f51b56b';
      break

    case 'Haze':
      background = '#fff8e840';
      break

    case 'Thunderstorm':
      background = '#00000063';
      break
      
    case 'Rain':
      background = '#72f6dd59';
      break

    case 'Drizzle':
      background = '#fff8e8';
      break

    case 'Snow':
      background = '#f9fafcc2';
      break

    default:
      background = '#eff6ff6b';
      break
  }





  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.info.dark,
    backgroundColor: theme.palette.info.light,
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundImage: 'none',
    overflow: 'hidden',
    borderRadius: '16px',
    position: 'relative',
    zIndex: '0',


    "& .MuiTypography-h3": {
      fontWeight: '400',
      fontSize:'44px',
      color: '#fff8e8',
      fontFamily: 'Dancing Script',
   },
   "& .MuiTypography-subtitle2": {
    fontWeight: '400',
    fontSize:'24px',
    color: '#fff8e8',
    fontFamily: 'Dancing Script',
 },
 '& .MuiIconButton-colorSecondary': {
  '&:hover': {
    backgroundColor: '#ee898973',
  }

}, 
    
  }));
  
  const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: '0 auto',
    width: '70%',
    height: '60%',

  }));
  


  

  
    return (
    <> 
         {weather?.weather && (
               <RootStyle>
               <IconWrapperStyle>
               <CardMediaComponent weather={weather}/>
               </IconWrapperStyle>
               <Typography variant="h3">{weather.name}</Typography>
               <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
               {weather.sys.country}
               </Typography>
        <CardContent className={classes.root}>
          <div className="location-box">
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="card-details">
            <IconButton color="primary" onClick={() => refresh(weather.id)}>
              <RefreshIcon style={{ color: '#60a5fa' }} />
            </IconButton>
            <IconButton
              className="weather-icon"
              color="secondary"
              aria-label="add to favorites"
            >
              <FavoriteIcon
                style={{ color: red[500] }}
                onClick={() => addCity()}
              />
            </IconButton>
          </div>
          <NavLink
            style={{ textDecoration: 'none' }}
            to={{
              pathname: `${url}/${weather.id}`,
              search: `query=${request}`,
              state: {
                from: location.pathname,
                search: `query=${request}`,
              },
            }}
          >
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </NavLink>
        </CardContent>
        </RootStyle>
      )}
       </>
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
  



