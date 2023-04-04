import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"



const OmaKokoelma = () => {
    return (
        <div>
            <h3>Täältä löydät omat sarjat ja kirjat kun olet kirjautunut</h3>

            <Button variant="contained">Luo uusi Sarja</Button>

            <Box sx={{ display: 'flex' }}>
                <Box
                component="aside"
                sx={{flexgrow: 1 ,bgcolor: 'background.default', p:3}}
                >
                    <SarjatTaulukko></SarjatTaulukko>
                </Box>

                <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    Tähän tulee sarjan kijat listana
                </Box>
            </Box>



        </div>
    );
};

export default OmaKokoelma;