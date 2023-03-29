import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SimpleContainer(props) {
  return (
    <React.Fragment>
      
      <Container maxWidth="none">
        <Box sx={{ height: '50vh' }} >{props.children}</Box>
      </Container>
    </React.Fragment>
  );
}
