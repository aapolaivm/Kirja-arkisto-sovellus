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



export default function LisaaForm() {
    return (
        <React.Fragment>
            <CssBaseline />
      <Card>
      <Box
        component="form"
        sx={{ display: '-ms-grid', transform: 'scale(1)',
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <br></br>
        <TextField id="outlined-basic" label="Nimi" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" label="Kategoria" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" label="Kustantaja" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" label="Kirjailija" variant="outlined" />
        <br></br>
        <TextField id="outlined-basic" label="Julkaisuvuosi" variant="outlined" type={'number'}/>
        <br></br>
        <TextField
        type="text"
        id="outlined-basic"
        label="Kuvaus"
        variant="outlined"
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
  />
</Button>
      <br></br>
        <Button variant="contained" color="success" startIcon={<ArrowForwardIcon/>}>
        Lisää arkistoon
      </Button>
      </Box>
      </Card>
      </React.Fragment>
    );
  }