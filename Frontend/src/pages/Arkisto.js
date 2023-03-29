import React from "react";
import ArkistoTaulukko from "components/ArkistoTaulukko"
import SearchBar from "components/SearchBar"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const Arkisto = () => {
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
            
            <ArkistoTaulukko></ArkistoTaulukko>       
        </>
        
    );
};

export default Arkisto;