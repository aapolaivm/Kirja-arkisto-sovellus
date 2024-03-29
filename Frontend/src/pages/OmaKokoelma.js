import React from "react";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"
import UusiSarjaDialog from "components/UusiSarjaDialog"
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import SarjanKirjatTaulukko from 'components/SarjanKirjatTaulukko'
import SarjaKirjaDialog from 'components/SarjaKirjaDialog'
import LisaaKirjaSarjaanDialog from 'components/LisaaKirjaSarjaanDialog'
import SarjanMuokkaus from 'components/SarjanMuokkaus'
import SarjanKirjaMuokkausDialog from 'components/SarjanKirjaMuokkausDialog'
import Alert from '@mui/material/Alert';




const OmaKokoelma = () => {
    const [data, setData] = useState(null)
    const [fetchSarjat, setFetchSarjat] = useState(0)
    const [fetchKirjat2, setFetchKirjat2] = useState(0)
    const [rowId, setRowId] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false)
    const [kirjaID, setKirjaID] = useState(null)
    const [sarjanKirjat, setSarjankirjat] = useState(null)
    const [muokkausDialogOpen, setMuokkausDialogOpen] = useState(false)

    const openDialogWithID = (id) => {
        setDialogOpen(true)
        setKirjaID(id)
    }

    const openMuokkausDialogWithID = (id) => {
        setMuokkausDialogOpen(true)
        setKirjaID(id)
    }

    const getRiviId = (riviId) => {
        setRowId(riviId);
    }

    const url = `http://localhost:5000/api/sarjat/${rowId}`

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.table(data)
                try {
                    setSarjankirjat(data?.sarja?.kirjat);
                } catch (error) {
                    setSarjankirjat([]);
                }
            });
    }, [rowId]);

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div >
            <Box sx={{ display: 'flex', gap:2,  mt: 3, mr: 3 }}>
                <UusiSarjaDialog reFetchSarjat={() => setFetchSarjat((n) => n + 1)}></UusiSarjaDialog>
                <SarjanMuokkaus rowId={rowId} data={data} reFetchSarjat={() => setFetchSarjat((n) => n + 1)}></SarjanMuokkaus>
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ height: 700, bgcolor: 'background.default', mt: 3, width: 300 }}>
                    <SarjatTaulukko fetchSarjat={fetchSarjat} getRiviId={getRiviId} ></SarjatTaulukko>
                </Box>

                {rowId === '' ?
                    <Box sx={{ p:3 }}>
                        <Alert severity="info">Valitse tai lisää uusi sarja</Alert>
                    </Box>
                    :

                    <Box sx={{ display: 'flex', flexFlow: "column", flexGrow: 1, bgcolor: 'background.default', p: 3 }}>

                        <Box
                            sx={{ display: 'flex', border: 1, borderColor: 'grey.300', borderRadius: 1, bgcolor: 'background.default', p: 2 }}
                        >
                            <div>
                                <Typography mt={1} variant="h3">{data.sarja?.nimi}</Typography>
                                <Typography mt={3} variant="body1"> ilmestymisvuodet: {data.sarja?.ekavuosi} - {data.sarja?.vikavuosi}</Typography>
                                <Typography mt={2} variant="subtitle1">Kuvaus: </Typography>
                                <Typography mt={0} variant="body1">{data.sarja?.kuvaus}</Typography>
                            </div>
                        </Box>

                        <Box sx={{ width: 1, mt: 2 }}>
                            <LisaaKirjaSarjaanDialog rowId={rowId} reFetchKirjat2={() => setFetchKirjat2((n) => n + 1)}></LisaaKirjaSarjaanDialog>
                        </Box>

                        <Box sx={{ width: 'auto', mt: 1 }}>
                            <SarjanKirjatTaulukko openDialog={openDialogWithID} openMuokkausDialog={openMuokkausDialogWithID} fetchKirjat2={fetchKirjat2} sarjanKirjat={sarjanKirjat} rowId={rowId} ></SarjanKirjatTaulukko>
                            <SarjaKirjaDialog rowId={rowId} kirjaID={kirjaID} open={dialogOpen} handleClose={() => setDialogOpen(false)} fetchKirjat2={fetchKirjat2}></SarjaKirjaDialog>
                            <SarjanKirjaMuokkausDialog
                                rowId={rowId}
                                kirjaID={kirjaID}
                                open={muokkausDialogOpen}
                                handleClose={() => setMuokkausDialogOpen(false)}
                                reFetchKirjat2={() => setFetchKirjat2((n) => n + 1)}>
                            </SarjanKirjaMuokkausDialog>
                        </Box>


                    </Box>
                }

            </Box>

        </div>
    );
};

export default OmaKokoelma;

