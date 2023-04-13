import React from "react";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"
import UusiSarjaDialog from "components/UusiSarjaDialog"



const OmaKokoelma = () => {
    return (
        <div>
            <p>Täältä löydät omat sarjat ja kirjat kun olet kirjautunut</p>

            <UusiSarjaDialog></UusiSarjaDialog>

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