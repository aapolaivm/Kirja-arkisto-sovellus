import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        setOpen(false);
        event.preventDefault();
        const data = {
            "nimi": event.target.nimi.value,
            "ekavuosi": event.target.ekavuosi.value,
            "vikavuosi": event.target.vikavuosi.value,
            "kuvaus": event.target.kuvaus.value
        }

        console.log(data)
        // alert
        // eslint-disable-next-line
        const result = await fetch("http://localhost:5000/api/sarjat", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Lisää uusi sarja
            </Button>
            <Dialog onSubmit={handleSubmit} 
                    sx={{ m: 3 }} 
                    open={open} 
                    onClose={handleClose} 
                    component='form'>
                <DialogTitle>Uusi Sarja</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Kirjoita alle sarjan nimi ja halutessasi myös ilmestymisvuodet, sekä lyhyt kuvaus sarjasta.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        name="nimi"
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
                        label="vuodesta"
                        type="number"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="vikavuosi"
                        label="vuoteen"
                        type="number"
                        variant="standard"
                    />
                    <TextField
                        margin="normal"
                        name="kuvaus"
                        label="kuvausteksti"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button type='submit' >Tallenna</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}