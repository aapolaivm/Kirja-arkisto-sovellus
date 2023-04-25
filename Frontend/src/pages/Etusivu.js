import React from 'react';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState, useEffect } from 'react';
import { typography } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Etusivu() {

  const [fetchKirjat, setFetchKirjat] = useState(0)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/kirjat").then(r => r.json()).then(data => {
      console.table(data);
      setData(data);
    })
  }, [fetchKirjat])

  if (!data) {
    return <p>Loading...</p>
  }

  const theme = createTheme();

  /**
   * '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
   */

  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom margin={4}>
        Tervetuloa kirja-arkistoon!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Uusimmat kirjat
          </Typography>
          <ImageList cols={4} gap={10}>
            {data.map((book) => (
              <ImageListItem key={book._id}>
                <Card>
                  <CardActionArea>
                    {book.niteet[0] === undefined ?
                      <CardMedia
                        component="img"
                        alt={'Ei kuvaa'}
                        height="250"
                        image={`https://p1.pxfuel.com/preview/866/743/752/book-literature-encyclopedia.jpg`}
                        title={'Kuvaa ei saatavilla'}
                      />

                      :
                      <CardMedia
                        component="img"
                        alt={book.nimi}
                        height="250"
                        image={`http://localhost:5000/api/kirjat/kuva/${book?.niteet?.[0]?.etukansikuva?.nimi}`}
                        title={book.nimi}
                      />
                    }
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {book.nimi}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {book.kirjailija}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {book.julkaisuvuosi}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </div>
  );
}
