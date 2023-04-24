import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
      <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography variant="body1" >
            © {new Date().getFullYear()} Kirja-arkisto -sovellus
          </Typography>
          <Link href="https://moodle.savonia.fi" color="inherit" style={{ marginLeft: 'auto' }}>
            Savonia Moodle
          </Link>
        </Toolbar>
      </AppBar>
    );
  };
  

export default Footer;
