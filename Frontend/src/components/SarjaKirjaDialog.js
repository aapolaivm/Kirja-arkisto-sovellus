import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose, kirjaID, rowId, fetchKirjat2 }) {

  const [kirjaData, setKirjaData] = useState({})

  const apiUrl = `http://localhost:5000/api/sarjat/${rowId}/kirjat/${kirjaID}`;
  console.log(apiUrl)

  useEffect(() => { // hae data
    if (!kirjaID) {
      return
    }
    fetch(apiUrl)
      .then(r => r.json())
      .then(d => {
        setKirjaData(d.sarjanKirja)
      })
  }, [kirjaID, fetchKirjat2])

  console.log("Kirjadata on uusi: ", kirjaData.hankintapvm);


  //TODO: Varmistaa että kaikki näkyy oikein + muuttaa datet ehkä datefieldiksi

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{kirjaData?.nimi}</DialogTitle>
        <DialogContent>
          <br></br>
          <TextField
            type="text"
            id="outlined-basic"
            label="Kuvaus"
            variant="outlined"
            value={kirjaData?.kuvausteksti ?? 'Ei kuvausta'}
            inputProps={{
              readOnly: true,
              style: {
                height: "100px",
                width: "500px"
              }
            }}
          />
          <br></br>
          <br></br>
          Kirjailija:
          <TextField fullWidth label="" id="kirjailija" value={`${kirjaData?.kirjailija ?? 0} `} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Piirtäjät:
          <TextField fullWidth label="" id="piirtajat" value={`${kirjaData?.piirtajat ?? 0} `} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Ensipainosvuosi:
          <TextField fullWidth label="" id="ensipainosvuosi" value={`${kirjaData?.ensipainosvuosi ?? 0} `} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Painos:
          <TextField fullWidth label="" id="painos" value={`${kirjaData?.painos ?? 0} `} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Kuntoluokka:
          <TextField fullWidth label="" id="Kuntoluokka" value={`${kirjaData?.kuntoluokka ?? 0}`} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Hankintahinta:
          <TextField fullWidth label="" id="hankintahinta" value={`${kirjaData?.hankintahinta ?? 0} €`} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Hankintapäivämäärä:
          <TextField fullWidth label="" id="hankintapvm" value={`${kirjaData?.hankintapvm ?? 0} `} inputProps={{ readOnly: true }} />
          <br></br>
          <br></br>
          Etukansikuva:
          <br></br>
          <img
            style={{ maxWidth: 200, margin: 15 }}
            src={`http://localhost:5000/api/kirjat/kuva/${kirjaData?.etukansikuva?.nimi}`}
            alt="image"
          />
          <br></br>
          Takakansikuva:
          <br></br>
          <img
            style={{ maxWidth: 200, margin: 15 }}
            src={`http://localhost:5000/api/kirjat/kuva/${kirjaData?.takakansikuva?.nimi}`}
            alt="image"
          />
          <br></br>
          Muut kuvat:
          <br></br>
          {
            (kirjaData?.muutkuvat ?? []).map(k => {
              return (
                <img
                  key={k.nimi}
                  style={{ maxWidth: 200, margin: 15 }}
                  src={`http://localhost:5000/api/kirjat/kuva/${k.nimi}`}
                  alt="image"
                />
              )
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sulje</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}