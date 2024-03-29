import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from "components/Container"
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Login from "pages/Login";
import NavBar from "components/NavBar";
import Arkisto from "pages/Arkisto";
import Etusivu from "pages/Etusivu";
import Lisaa from "pages/Lisaa";
import SignUp from "pages/Register";
import OmaKokoelma from "pages/OmaKokoelma";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import Footteri from 'components/Footteri'
import { Box } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        primary: blue,
        secondary: red,
        mode: 'dark'
      },      
  });
  
const App = () => {
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <NavBar></NavBar>
                <CssBaseline />
                <Container>
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        {<Route path="/Register" element={<SignUp />} />}
                        <Route exact path="/" element={<Etusivu />} />
                        <Route path="/Arkisto" element={<Arkisto />} />
                        <Route path="/Lisaa" element={<Lisaa />} ></Route>
                        <Route path="/OmaKokoelma" element={<OmaKokoelma />} ></Route>
                    </Routes>
                </Container>
                <Footteri></Footteri>
            </ThemeProvider>
        </div>
    );
};

export default App;