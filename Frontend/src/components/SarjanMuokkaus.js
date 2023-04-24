import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";




export default function FormDialog({ reFetchSarjat, rowId, data }) {
    const [open, setOpen] = React.useState(false);
    const [nimi, setNimi] = useState('');
    const [kuvaus, setKuvaus] = useState('');
    const [ekavuosi, setEkavuosi] = useState('');
    const [vikavuosi, setVikavuosi] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "nimi": nimi,
            "ekavuosi": ekavuosi,
            "vikavuosi": vikavuosi,
            "kuvaus": kuvaus
        }
        const response = await fetch(`http://localhost:5000/api/sarjat/${rowId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        reFetchSarjat();
        handleClose();
    }

    const handleDelete = async (event) => {
        const confirm = window.confirm('Haluatko varmasti poistaa tämän sarjan?');
        if (!confirm) {
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/sarjat/${rowId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log('poistettu', data); // handle response data here
            reFetchSarjat();
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        setNimi(data?.sarja?.nimi);
        setKuvaus(data?.sarja?.kuvaus);
        setEkavuosi(data?.sarja?.ekavuosi);
        setVikavuosi(data?.sarja?.vikavuosi);
    }, [data]);

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Muokkaa tai poista Sarja
            </Button>
            <Dialog onSubmit={handleSubmit}
                sx={{ m: 3 }}
                open={open}
                onClose={handleClose}
                component='form'>
                <DialogTitle>Uusi Sarja</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        name="nimi"
                        value={nimi}
                        onChange={e => setNimi(e.target.value)}
                        label="Sarjan nimi"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />

                    <DialogContentText>
                        Lisää alle ilmestymisvuodet:
                    </DialogContentText>
                    <TextField
                        margin="normal"
                        name="ekavuosi"
                        value={ekavuosi}
                        onChange={e => setEkavuosi(e.target.value)}
                        label="vuodesta"
                        type="number"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="vikavuosi"
                        value={vikavuosi}
                        onChange={e => setVikavuosi(e.target.value)}
                        label="vuoteen"
                        type="number"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="kuvaus"
                        value={kuvaus}
                        onChange={e => setKuvaus(e.target.value)}
                        label="kuvausteksti"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', p:2}}>
                    <Box>
                        <Button startIcon={<DeleteIcon />} variant="contained" color="error" onClick={handleDelete}>Poista Sarja</Button>
                    </Box>
                    <Box>
                        <Button onClick={handleClose}>Peruuta</Button>
                        <Button type='submit' >Tallenna</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}