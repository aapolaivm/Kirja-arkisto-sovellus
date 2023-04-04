import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"
import ListaKirjoista from "components/SarjanKirjatTaulukko"



const OmaKokoelma = () => {
    return (
        <div>
            <p>Täältä löydät omat sarjat ja kirjat kun olet kirjautunut</p>
            

            <Button variant="contained">Luo uusi Sarja</Button>

            
            <Box sx={{ display: 'flex' }}>
                <Box
                component="aside"
                sx={{flexgrow: 1 ,bgcolor: 'background.default', mt:2}}
                >
                    <SarjatTaulukko></SarjatTaulukko>
                </Box>

               

                <Box
                component="main"
                sx={{display: 'flex', flexGrow: 1, flexDirection: 'column', bgcolor: 'background.default', p: 2 }}
                >
                    <Box
                    component="ylaboksi"
                    sx={{ display: 'flex', flexGrow: 0, border: 1, borderColor: 'grey.300', borderRadius: 1, bgcolor: 'background.default', p: 1}}
                    >
                        <Box
                        component="img"
                        sx={{
                        p:1,
                        maxHeight: 300
                        }}
                        alt="Aku Ankka."
                        src="https://www.kulttuuriverkko.fi/uploads/lehtikuvat/aku-ankka-f037ad2986f1b8d6b804b3e6c3ecabd5.jpg"
                        >
                            
                        </Box>
                    
                        <p>Sarjan tiedot</p>
                    </Box>

                    <h4>Kirjat:</h4>
                    <Box
                    component="alaboksi"
                    sx={{ flexGrow: 2, bgcolor: 'background.default', }}
                    >
                    
                    <ListaKirjoista></ListaKirjoista>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default OmaKokoelma;