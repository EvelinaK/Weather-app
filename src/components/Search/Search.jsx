
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import citiesOperations from '../../redux/cities/city-operations';
import * as citiesSelectors from '../../redux/cities/city-selectors';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:theme.spacing(5),
        marginBottom:theme.spacing(3),
        
        "& .MuiFilledInput-root": {
            backgroundColor: '#f5f5f573',
            color:'white'
          },
          "& .MuiSvgIcon-root": {
            color:'white'
          },
          "& .MuiFormLabel-root": {
            color:'white'
          },
          "& .MuiFormHelperText-root": {
            color:'white'
          },
        
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: '#fff8',
          },
          '& .MuiFilledInput-underline:hover:before': {
            borderBottomColor: '#fff', 
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#fff',
          },
    
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: '#60b6ea', 
          },

    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width:"250px",
    },
    MuiFilledInput: {
        root: {
            backgroundColor:'#f5f5f573',
          }
      },
  }));


  function AlertInfo(props){
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SearchBar = (props) => {
    // const classes = useStyles();
    const [ alert, setAlert ] = useState(true)


    const [query, setQuery] = useState('');
    const [request, setRequest] = useState('');
  
    const { url } = useRouteMatch();
    const location = useLocation();
    let   history = useHistory();
    const dispatch = useDispatch();
  
    const classes = useStyles();
    const weather = useSelector(citiesSelectors.getItem);
    const locationWeather = useSelector(citiesSelectors.getLocationWeather);
  
  
    const favouriteCities = useSelector(citiesSelectors.getFavouriteCities);
  
    const searchURL = new URLSearchParams(location.search).get('query') ?? '';
    const isFirstRender = useRef(true);
  

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlert(false);
      };

      useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        if (searchURL === '') {
          return;
        }
        dispatch(citiesOperations.fetchCityByQuery(query));
        setQuery('');
      }, [request, location.search, dispatch, searchURL]);



      const handleRequestChange = event => {
        setQuery(event.currentTarget.value.toLowerCase());
      };
    

      const handleSubmit = event => {
        event.preventDefault();
        if (query) {
          history.push({
            ...location,
            search: `query=${query}`,
          });
          setRequest(query);
        }
      };
    



    return(
   <React.Fragment>
        <div className={classes.root}>  
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Grid item xs={9} md={4}>
                            <form onSubmit={handleSubmit}>
                        <TextField 
                        className={classes.root}
                            id="filled-basic" 
                            label="Search..." 
                            variant="filled" 
                            autoComplete='off'
                            onChange = {handleRequestChange}
                            onSubmit={handleSubmit}
                            value = {query}
                            helperText={ "Enter a city"}
                            fullWidth
                            InputProps={{
                                endAdornment: 
                                <InputAdornment position="end">
                                     <IconButton
                                        aria-label="search input"
                                        onClick={handleSubmit}
                                        edge="end"
                                        >
                                    <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>,
                            }}/>  
                            </form>
                        </Grid>
                </Grid>  
    </div>

    <div>
        <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} transitionDuration={{enter:3000}} open={alert} onClose={handleClose}>
            <AlertInfo onClose={handleClose} severity="info">
                Tip: If you don't see the place you entered, try adding its country or zip code at the end, Ex: Kharkiv, UA
            </AlertInfo>
        </Snackbar>
    </div>

   </React.Fragment>
    )
}

export default SearchBar;