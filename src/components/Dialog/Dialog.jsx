import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Dialog from '@mui/material/Dialog';
import Dialog from '@material-ui/core/Dialog';


import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import ForecastMap from '../WeatherMap/WeatherMap'
export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };



  const styles = {
    containerMap:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'white',
    },
    button: {
        border: '1px solid #eff6ff',
          color:'white',  
    },
    buttonClose: {
        color:'#529ffc',  
  },
};

  return (
    <React.Fragment>
      <Button  style={styles.button} variant="outlined" onClick={handleClickOpen}>
             Weather map
      </Button>
      <Dialog 
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Weather map</DialogTitle>
        <DialogContent>
          <DialogContentText>
         You can customize the map by selecting the desired parameter
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <div style={styles.containerMap}><ForecastMap/></div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button  style={styles.buttonClose} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
