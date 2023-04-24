import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import { Form, Navigate } from 'react-router-dom';
import KategoriaSelect from './Kategoriaselect';


export default function LisaaForm() {
  const [julkaisuvuosi, setJulkaisuvuosi] = useState(new Date())
  const [navigate, setNavigate] = useState(false)




  const handleSubmit = async (event) => {
    event.preventDefault();
  //   const data = {
  //     "nimi":event.target.nimi.value,
  //     "kirjailija":event.target.kirjailija.value,
  //     "julkaisuvuosi":julkaisuvuosi,
  //     "kuvausteksti":event.target.kuvausteksti.value,
  //     "kansikuva":event.target.kansikuva.value,
  //     "takakansikuva":event.target.takakansikuva.value,
  //     "kunto":event.target.kunto.value,
  //     "hankintahinta":event.target.hankintahinta.value,
  //     "kategoria":event.target.kategoria.value,
  //     "kustantaja":event.target.kustantaja.value
  // }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const data = new FormData(event.target)
  data.delete('kategoria')
  data.append('kategoria', event.target.kategoria.value)
  data.append('julkaisuvuosi', julkaisuvuosi)

    console.log(data)
    // alert
    const result = await fetch ("http://localhost:5000/api/kirjat", {
      method: 'POST',
      // body: JSON.stringify(data),
      body: data,
      // headers: {
      //   'Content-Type': 'application/json'
      // },
    })
    setNavigate(true);
  }
  const updateJulkaisuvuosi = (date) => {
    setJulkaisuvuosi(date.year())
  }

    return (
        <React.Fragment>
          {navigate && <Navigate to="/Arkisto" replace={true}></Navigate>}
            <CssBaseline />
            
      
      <Box onSubmit={handleSubmit}
        component="form"
        sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: {xs: 5, md: 30}
        }}
        noValidate
        autoComplete="off"
      >
        <Grid sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        
        <Grid xs={10}><TextField id="outlined-basic" name='nimi' label="Nimi" variant="outlined" /></Grid>
        
        {/* <TextField id="outlined-basic" name='kategoria' label="Kategoria" variant="outlined" /> */}
        <Grid xs={8} sx={{mt: 2}}><KategoriaSelect ></KategoriaSelect></Grid>
        
        <Grid xs={8} sx={{mt: 2}}><TextField id="outlined-basic" fullWidth name='kustantaja' label="Kustantaja" variant="outlined" /></Grid>
        
        <Grid xs={9} sx={{mt: 2}}><TextField id="outlined-basic" fullWidth name='kirjailija' label="Kirjailija" variant="outlined" /></Grid>
        
        <Grid xs={8} sx={{mt: 2}}><TextField id="outlined-basic" fullWidth name='hankintahinta' label="Hankintahinta" variant="outlined" /></Grid>
        
        <Grid xs={6} sx={{mt: 2}}><TextField id="outlined-basic" fullWidth name='kunto' label="Kunto" variant="outlined" /></Grid>
        
        </Grid>

        <Paper
          elevation={12}
          style={{
               
            border: "1px solid black",
            
  }}
        ><LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Julkaisuvuosi">
            <YearCalendar name='julkaisuvuosi' onChange={updateJulkaisuvuosi} />       
          </DemoItem>          
        </LocalizationProvider></Paper>

        
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Grid xs={6}><TextField
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
      /></Grid>
      
      <Button sx={{mt: 3}} startIcon={<UploadFileIcon/>}
  variant="contained"
  component="label"
>
  
  Lisää etukansikuva
  <input
    type="file"
    hidden
    name='etukansikuva'
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
    multiple
    hidden
    name='muutkuvat'
  />
</Button>
      <br></br>
        <Button variant="contained" type='submit' color="success" startIcon={<ArrowForwardIcon/>}>
        Lisää arkistoon
      </Button>
      </Box>
      </Box>
      
      </React.Fragment>
    );
  }