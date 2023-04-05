import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"



const OmaKokoelma = () => {
    return (
        <div>
            <p>Täältä löydät omat sarjat ja kirjat kun olet kirjautunut</p>

            <Button variant="contained">Luo uusi Sarja</Button>

            <Box sx={{ display: 'flex' }}>
                <Box
                    component="aside"
                    sx={{ flexgrow: 1, bgcolor: 'background.default', mt: 2 }}
                >
                    <SarjatTaulukko></SarjatTaulukko>
                </Box> 
            </Box>
        </div>
    );
};

export default OmaKokoelma;