import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open, handleClose, kirjaID}) {

  const [kirjaData, setKirjaData] = useState({})

  useEffect(()=> { // hae data
    if (!kirjaID){
      return
    }
    fetch(`http://localhost:5000/api/kirjat/${kirjaID}`)
  },[kirjaID])

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Kirja"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Nimi
          </DialogContentText>
          <TextField
        type="text"
        id="outlined-basic"
        label="Kuvaus"
        variant="outlined"        
        inputProps={{
            readOnly:true,
          style: {
            height: "100px"
          }
        }}
      />
      <br></br>
      Ostohinta
      <TextField fullWidth label="" id="ostohinta" inputProps={{readOnly:true}} />
      <img
      style={{ maxWidth: 200, margin: 15 }}
      src="https://images.unsplash.com/photo-1565992441121-4367c2967103"
      alt="image"
    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sulje</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}