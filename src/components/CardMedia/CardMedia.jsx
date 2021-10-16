import React, { useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

import initialIcon from '../../icons/04.svg';
export default function CardMediaComponent({ weather }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const icons = require.context( '../../icons', true, /\.(png|jpe?g|svg)$/);
    const paths = icons.keys ()
    const images = paths.map( path => icons ( path ) )
  
    let icon = initialIcon

    switch (Object.keys(weather).length !== 0 && weather?.weather[0].icon) {
      case '01d':
          console.log(images[0].default)
        icon = images[0].default
        break
  
      case '01n':
        icon = images[1].default
        break
  
      case '02d':
        icon = images[2].default
        break
  
      case '02n':
        icon = images[3].default
        break
  
      case  '03n' ||  '04n':
        console.log(images[0].default);
        icon = images[2].default
        break

        case '03d' ||  '04d':
            console.log(images[0].default);
            icon = images[2].default
            break
  
      case '09d':
        icon = images[5].default
        break
  
      case '09n':
        icon = images[6].default
        break
  
      case '10d' || '10n':
        icon = images[7].default
        break
  
      case '11d':
        icon = images[8].default
        break
      
      case '11n':
        icon = images[9].default
        break
  
      case '13d':
        icon = images[10].default
        break
  
      case '13n':
        icon = images[11].default
        break
  
      case '50d':
        icon = images[12].default
        break
  
      case '50n':
        icon = images[13].default
        break
    }
    return (
      <>
   

  
            <CardMedia
              className={classes.media}
              image={`${icon}`}
            />   
      </>
    );
  }
  const useStyles = makeStyles(theme => ({
    root: {
      width:'50%',
      margin: 25,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.4);',
      boxShadow: '3px 6px rgb(0 0 0 / 20%)',
      textDecoration: 'none',
      color: '#60a5fa',
      fontSize: '30px',
    },
  
    media: {
      display:'flex',
      height: '110px',
      paddingTop: '25.9%',
      backgroundSize: '40%',
    },
  
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));