import React from "react";
import { Box } from "@mui/material";
import SarjatTaulukko from "components/SarjatTaulukko"
import UusiSarjaDialog from "components/UusiSarjaDialog"
import KirjojenValintaDialog from "components/KirjojenValintaDialog"
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import SarjanKirjatTaulukko from 'components/SarjanKirjatTaulukko'
import SarjaKirjaDialog from 'components/SarjaKirjaDialog'




const OmaKokoelma = () => {
    const [data, setData] = useState(null);
    const [fetchSarjat, setFetchSarjat] = useState(0)
    const [hidden, setHidden] = useState(false);
    const [rowId, setRowId] = useState('6436c57fa1daeac7eb0c07b8');
    const [dialogOpen, setDialogOpen] = useState(false)
    const [kirjaID, setKirjaID] = useState(null)
    const [sarjanKirjat, setSarjankirjat] = useState(null)

    const openDialogWithID = (id) => {
        setDialogOpen(true)
        setKirjaID(id)
    }

    const handleClick = () => {
        //setHidden(!hidden);
        addBooksToSeries(books, rowId);
    };
    //<Button onClick={handleClick}>Hide Box</Button>


    const getRiviId = (riviId) => {
        setRowId(riviId);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/sarjat/` + rowId)
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.table(data)
                try {
                    setSarjankirjat(data.sarja.kirjat.map(item => item._id));
                } catch (error) {
                    setSarjankirjat([]);
                }
            });
    }, [rowId]);

    if (!data) {
        return <div>Loading...</div>;
    }

    // TODO: voi lisää kirjan sarjaan
    const addBooksToSeries = async (books, rowId) => {
        try {
            const response = await fetch(`http://localhost:5000/sarjat/${rowId}/kirjat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ books })
            });
            const data = await response.json();
            console.log(data); // log the response from the API endpoint
        } catch (error) {
            console.error(error);
        }
    }

    const books = [
        { _id: '643d34979457281ecda822df' },
        { _id: '643d365d9457281ecda8233a' }
    ];

    return (
        <div >
            <br></br>

            <UusiSarjaDialog reFetchSarjat={() => setFetchSarjat((n) => n + 1)}></UusiSarjaDialog>

            <Button variant="outlined">Posta sarja</Button>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ height: 750, bgcolor: 'background.default', mt: 3 , width: 300}}>
                    <SarjatTaulukko fetchSarjat={fetchSarjat} getRiviId={getRiviId} ></SarjatTaulukko>
                </Box>


                {hidden ? null :
                    <Box sx={{ display: 'flex', flexFlow: "column", flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                        <Box
                            sx={{ display: 'flex', border: 1, borderColor: 'grey.300', borderRadius: 1, bgcolor: 'background.default', p: 2 }}
                        >
                            <div>
                                <Typography mt={1} variant="h3">{data.sarja.nimi}</Typography>
                                <Typography mt={3} variant="body1"> ilmestymisvuodet: {data.sarja.ekavuosi} - {data.sarja.vikavuosi}</Typography>
                                <Typography mt={2} variant="subtitle1">Kuvaus: </Typography>
                                <Typography mt={0} variant="body1">{data.sarja.kuvaus}</Typography>
                            </div>
                        </Box>
                        <br></br>

                        <KirjojenValintaDialog ></KirjojenValintaDialog>

                        <Box sx={{ width: 'auto' }}>
                            <SarjanKirjatTaulukko openDialog={openDialogWithID} sarjanKirjat={sarjanKirjat} ></SarjanKirjatTaulukko>
                            <SarjaKirjaDialog kirjaID={kirjaID} open={dialogOpen} handleClose={() => setDialogOpen(false)}></SarjaKirjaDialog>
                        </Box>

                    </Box>
                }
            </Box>
        </div>
    );
};

export default OmaKokoelma;

