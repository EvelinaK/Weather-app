import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import citiesOperations from '../redux/cities/city-operations';
import actions from '../redux/cities/city-actions';
import ForecastMap from '../components/WeatherMap/WeatherMap'
import Decoration from '../components/Decorator/Decarator';
// import { Box, Grid, Container, Typography } from '@mui/core/material';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMediaComponent from "../components/CardMedia/CardMedia";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { alpha } from '@material-ui/core/styles';
import { RiSearchLine, RiDropFill }  from 'react-icons/ri';
import { WiCloudy, WiStrongWind }  from 'react-icons/wi';

import rainImg from '../images/homePage-card/after-rain.svg';
import cloudImg from '../images/homePage-card/walk.svg';
import sunImg from '../images/homePage-card/sunny.svg';
import snowImg from '../images/homePage-card/winter.svg';
import thunderImg from '../images/homePage-card/rain2.svg';
import cloudyImg from '../images/homePage-card/Cloudy.svg';
import inicialImg from '../images/homePage-card/initialWeather.svg';

import '../index.css';
// import { Time, Temperature } from '../components/temperature/temperature'
import {
    GridList,
    ListItem,
    ListSubheader,
    Typography,
    makeStyles
  } from '@material-ui/core'
// import '../views/HomeView.scss';
import  MaxWidthDialog from '../components/Dialog/Dialog'
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
    contSmall:{
      display: 'flex',
      flexDirection:'column',
    }

};

const useStyles = makeStyles(theme => ({
    root: {
          margin: '0 auto',
      "& .MuiGrid-root .MuiGrid-container": {
          justifyContent:'center',
      },

      "& .MuiBox-root-21": {
       display:'flex',
       flexDirection:'row',
    },

    "& .MuiTypography-h5": {
      color:'white',
   },
      
    },
    gridList: {
      borderTop: 'solid 1px white',
      borderBottom: 'solid 1px white',
    },
    listItem: {
      [theme.breakpoints.down('xs')]: {
        width: '100% !important'
      }
    }
  }))

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(170, 170, 170, 0.3)',
    backdropFilter: 'blur(25px)',
    borderRadius: '12px',
    marginTop: '35px',

  }));



function HomeView() {
    const dispatch = useDispatch();
    const [geoposition, setGeoposition] = useState({});
    const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);
    const weather = useSelector(citiesSelectors.getLocationWeather);
    const classes = useStyles()
    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log(navigator)
            console.log("Available");
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    setGeoposition({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                function(error) {
                    console.error("Error Code = " + error.code + " - " + error.message);
                }
            );
        } else {
            console.log("Not Available");
        }
    }, [navigator]);


    const handler = useCallback(() => {
        dispatch(citiesOperations.fetchCityByLocation(geoposition));
    }, [geoposition])


    useEffect(() => {
        if (Object.keys(geoposition).length !== 0) {
            console.log('est')
            handler(geoposition)
           }
    }, [handler, geoposition]);

  
    let DayOrNigth
 
    if(Object.keys(weather).length !== 0){
     switch (weather?.weather[0]?.icon.slice(2)) { 
       case 'n':
         DayOrNigth = 'night'; 
     }
   }else{
     DayOrNigth = 'day';
   }






  let LandingImg = inicialImg

  switch (  Object.keys(weather).length !== 0 && weather?.weather[0].main) {
    case 'Clear':
      LandingImg = sunImg;
      break

    case 'Clouds':
      LandingImg = cloudImg;
      break

    case 'Haze':
      LandingImg = cloudyImg;
      break

    case 'Thunderstorm':
      LandingImg = thunderImg;
      break
      
    case 'Rain':
      LandingImg = rainImg;
      break

    case 'Drizzle':
      LandingImg = rainImg;
      break

    case 'Snow':
      LandingImg = snowImg;
      break

    default:
      LandingImg = inicialImg
      break
  }




    return (
        <>
          <Decoration DayOrNigth={DayOrNigth} /> 
        <div style={styles.container} className="container-weather">  
          <Grid style={styles.contSmall} item xs={12} md={6} lg={4}>
              <h1 style={styles.title}>Weather</h1>
               <MaxWidthDialog/>
          </Grid>

      <Grid container spacing={0}>
         <Grid item xs={11} md={8} lg={8} className={classes.root}>
           <Item>
           <CardHeader title="Weather in your location" />
           <Box
          sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        bgcolor: 'transparent',
        color:'#fff8e8',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontSize:'18px',
        fontWeight: 'bold',
      }}
    >

      <Box
        component="div"
        sx={{
          height: '80%',
          width: '100%',
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
      >
              <div className="secondary">
                 <div className="secondary-results">
                  <div className="other-secondary-results">
                  <div className="icon-secondary-results humidity">
                  <RiDropFill />
                    </div>
                   <p>Humidity: <br/>
                  {weather?.main?.humidity}%</p>
                </div>
            
                <div className="other-secondary-results">
                 <div className="icon-secondary-results">
                 <WiStrongWind />
              </div>
              <p>Wind speed: <br/>
              {weather?.wind?.speed.toFixed(1)} m/s</p>
            </div>

            <div className="other-secondary-results">
              <div className="icon-secondary-results">
              <WiCloudy />
              </div>
              <p>Clouds: <br/>
              {weather?.clouds?.all}%</p>
            </div>

          </div>
          <div className="landing-figure">
            <img src={LandingImg} alt="Landing"/>
          </div>
        </div>

      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'center' },
          m: 3,
          minWidth: { md: 350 },
        }}
      >
        <div className="result">
              <CardMediaComponent weather={weather}/>
            <h2 className="temperature">
              {weather?.main?.temp.toFixed(0)}<span>ºC</span>
            </h2>
            {Object.keys(weather).length > 0 &&
                <span className="description">{(String(weather?.weather[0].description))}</span>
              }
           
            <span className="local">
              {`${weather?.name}, ${weather?.sys?.country}`}&nbsp;&nbsp;
              {weather?.sys?.country !== '-' && <img src={`https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/${weather?.sys?.country.toLowerCase()}.png`} alt="country"/>}
            </span>
          </div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: 1.5,
            p: 0.5,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderRadius: '5px',
            color: 'primary.main',
            fontWeight: 'medium',
            display: 'flex',
            fontSize: 12,
            alignItems: 'center',
            '& svg': {
              fontSize: 21,
              mr: 0.5,
            },
          }}
        >
          <div className="other-results">
            <div className="other">
            Feels like: <br/>
              <span>{weather?.main?.feels_like.toFixed(1)} ºC</span>
            </div>
            <div className="other">
              Temp. Min: <br/>
              <span>{weather?.main?.temp_min.toFixed(1)} ºC</span>
            </div>
            <div className="other">
              Temp. Max: <br/>
              <span>{weather?.main?.temp_max.toFixed(1)} ºC</span>
            </div>
          </div>
        </Box>
        
      </Box>
    </Box>
           </Item>
         </Grid>
       </Grid>  
        </div>

       </>
                
      );

}

export default HomeView;

