import React from "react";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"
import UusiSarjaDialog from "components/UusiSarjaDialog"
import { useState } from "react";



const OmaKokoelma = () => {
    const [fetchSarjat, setFetchSarjat] = useState(0)
    return (
        <div>
            <p>Täältä löydät omat sarjat ja kirjat kun olet kirjautunut</p>

            <UusiSarjaDialog reFetchSarjat={()=>setFetchSarjat((n) => n + 1)}></UusiSarjaDialog>

            <Box sx={{ display: 'flex' }}>
                <Box
                    component="aside"
                    sx={{ flexgrow: 1, bgcolor: 'background.default', mt: 2 }}
                >
                    <SarjatTaulukko fetchSarjat={fetchSarjat}></SarjatTaulukko>
                </Box> 
            </Box>
        </div>
    );
};

export default OmaKokoelma;