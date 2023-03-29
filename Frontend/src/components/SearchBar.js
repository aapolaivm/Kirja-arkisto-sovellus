import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';

export default function FreeSolo() {
  return (
    
    <Grid container spacing={2}>
        <Grid item spacing={3} sx={{ flexGrow: 1 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={kirjat.map((option) => option.nimi)}
        renderInput={(params) => <TextField {...params} label="Nimi" />}
      />
      </Grid>
      <Grid item spacing={3} sx={{ flexGrow: 1 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={kirjat.map((option) => option.kirjailija)}
        renderInput={(params) => <TextField {...params} label="Kirjailija" />}
      />
      </Grid>
      <Grid item spacing={3} sx={{ flexGrow: 1 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={kirjat.map((option) => option.kategoria)}
        renderInput={(params) => <TextField {...params} label="Kategoria" />}
      />
      </Grid>
      <Grid item spacing={3} sx={{ flexGrow: 1 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={kirjat.map((option) => option.julkaisuvuosi)}
        renderInput={(params) => <TextField {...params} label="Julkaisuvuosi" />}
      />
      </Grid>
      <Grid item spacing={3} sx={{ flexGrow: 1 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={kirjat.map((option) => option.nimi)}
        renderInput={(params) => <TextField {...params} label="Kunto" />}
      />
      </Grid>
      </Grid>
      
  );
}


// kesken
const kirjat = [
  {id: 1, nimi:'Aku Ankka', kategoria: 'Sarjakuva', kustantaja: 'Sanoma Media Finland', kirjailija: 'Carl Barks', julkaisuvuosi: 2023},
   {id: 2, nimi:'Taru Sormusten Herrasta', kategoria: 'Fantasia', kustantaja: 'Allen & Unwin', kirjailija: 'J.R.R. Tolkien', julkaisuvuosi: 1955},
   {id: 3, nimi:'Witcher', kategoria: 'Fantasia', kustantaja: 'Wsoy', kirjailija: 'Andrzej Sapkowski', julkaisuvuosi: 1986},
   {id: 4, nimi:'Kotkanpesä', kategoria: 'Jännitys', kustantaja: 'Wsoy', kirjailija: 'Ilkka Remes', julkaisuvuosi: 2020},
   {id: 5, nimi:'Tintti Amerikassa', kategoria: 'Sarjakuva', kustantaja: 'Otava', kirjailija: 'Hergé', julkaisuvuosi: 2017},
];