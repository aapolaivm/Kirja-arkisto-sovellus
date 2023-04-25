import React from "react";
import NavBar from "components/NavBar";
import LisaaForm from "components/LisaaForm"
import { Box } from "@mui/system";



const Lisaa = () => {
    return (
        <div>
            <Box sx={{border:1}}>
            <p style={{fontSize:'100px', textAlign: 'center'}}>Lisää uusi kirja arkistoon</p>
            </Box>
            <LisaaForm></LisaaForm>
        </div>
    );
};



export default Lisaa;