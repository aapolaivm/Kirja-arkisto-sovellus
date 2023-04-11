import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { width } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';


export default function LisaaForm() {
  const [julkaisuvuosi, setJulkaisuvuosi] = useState(new Date())
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "nimi":event.target.nimi.value,
      "kirjailija":event.target.kirjailija.value,
      "julkaisuvuosi":julkaisuvuosi,
      "kuvausteksti":event.target.kuvausteksti.value,
      "kansikuva":event.target.kansikuva.value,
      "takakansikuva":event.target.takakansikuva.value,
      "kunto":event.target.kunto.value,
      "hankintahinta":event.target.hankintahinta.value,
      "kategoria":event.target.kategoria.value
  }
    console.log(data)
    // alert
    const result = await fetch ("http://localhost:5000/api/kirjat", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
  const updateJulkaisuvuosi = (date) => {
    setJulkaisuvuosi(date.year())
  }
    return (
        <React.Fragment>
            <CssBaseline />
            
      <Card>
      <Box onSubmit={handleSubmit}
        component="form"
        sx={{ display: '-ms-grid', transform: 'scale(1)',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <br></br>
        <TextField id="outlined-basic" name='nimi' label="Nimi" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" name='kategoria' label="Kategoria" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" name='kustantaja' label="Kustantaja" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" name='kirjailija' label="Kirjailija" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" name='hankintahinta' label="Hankintahinta" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" name='kunto' label="Kunto" variant="outlined" />
        <br></br>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="YearCalendar">
            <YearCalendar name='julkaisuvuosi' onChange={updateJulkaisuvuosi} />       
          </DemoItem>          
        </LocalizationProvider>
        <br></br>
        <TextField
        type="text"
        id="outlined-basic"
        label="Kuvaus"
        variant="outlined"
        name='kuvausteksti'
        inputProps={{
          style: {
            height: "100px"
          }
        }}
      />
      <br></br>
      <Button startIcon={<UploadFileIcon/>}
  variant="contained"
  component="label"
>
  Lisää etukansikuva
  <input
    type="file"
    hidden
    name='kansikuva'
  />
</Button>
<br></br>
<Button startIcon={<UploadFileIcon/>}
  variant="contained"
  component="label"
>
  Lisää takakansikuva
  <input
    type="file"
    hidden
    name='takakansikuva'
  />
</Button>
<br></br>
<Button startIcon={<UploadFileIcon/>}
  variant="contained"
  component="label"
>
  Lisää muita kuvia
  <input
    type="file"
    hidden
    name='muutkuvat'
  />
</Button>
      <br></br>
        <Button variant="contained" type='submit' color="success" startIcon={<ArrowForwardIcon/>}>
        Lisää arkistoon
      </Button>
      </Box>
      </Card>
      </React.Fragment>
    );
  }