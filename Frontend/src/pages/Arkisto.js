import React from "react";
import ArkistoTaulukko from "components/ArkistoTaulukko"
import SearchBar from "components/SearchBar"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Kirjadialog from 'components/Kirjadialog'
import { useState } from "react";


const Arkisto = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [kirjaID, setKirjaID] = useState(null)
    const openDialogWithID = (id)=>{
        setDialogOpen(true)
        setKirjaID(id)
    }
    return (
        <>            
            <h1>Arkisto</h1>
            <SearchBar></SearchBar>
            <br></br>
            <Stack spacing={2} direction="row">      
      <Button variant="contained">Etsi</Button>
      <Button variant="contained">Tyhjennä</Button>
      
    </Stack>
            <br></br>
            
            <ArkistoTaulukko openDialog={openDialogWithID}></ArkistoTaulukko>
            <Kirjadialog kirjaID={kirjaID} open={dialogOpen} handleClose={()=>setDialogOpen(false)}></Kirjadialog>     
        </>
        
    );
};

export default Arkisto;