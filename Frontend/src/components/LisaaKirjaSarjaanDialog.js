import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fi';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useState, useEffect } from 'react';


export default function FormDialog({ reFetchKirjat2, rowId }) {
    const [open, setOpen] = React.useState(false);
    const [paiva, setPaiva] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(paiva);

    const handleSubmit = async (event) => {
        setOpen(false);
        event.preventDefault();
        const data = {
            "nimi": event.target.nimi.value,
            "jarjestysnumero": event.target.jarjestysnumero.value,
            "kuvausteksti": event.target.kuvaus.value,
            "kirjailija": event.target.kirjailija.value,
            "ensipainosvuosi": event.target.ensipainosvuosi.value,
            "piirtajat": event.target.piirtajat.value,
            "painos": event.target.painos.value,
            "kuntoluokka": event.target.kuntoluokka.value,
            "hankintahinta": event.target.hankintahinta.value,
            "hankintapvm": paiva
        }

        //const data = new FormData(event.target)

        console.log('Data on: ', data)
        // alert 

        const result = await fetch(`http://localhost:5000/api/sarjat/${rowId}/kirjat`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        reFetchKirjat2()
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Lisää uusi Kirja sarjaan
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                component='form'
                onSubmit={handleSubmit}
                sx={{ m: 3 }}>
                <DialogTitle>Uusi Kirja Sarjaan</DialogTitle>
                <DialogContent>
                    <DialogContentText>  Kirjoita alle kirjan nimi ja halutessasi myös loput tiedot ja kuvat kirjasta</DialogContentText>
                    <TextField autoFocus required margin="normal" name="nimi" label="Kirjan nimi:" type="text" fullWidth variant="outlined" />
                    <TextField margin="normal" name="jarjestysnumero" label="Järjestysnumero sarjassa:" type="number" fullWidth variant="outlined" />
                    <TextField
                        margin="normal"
                        name="kuvaus"
                        label="Kuvausteksti:"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                    <TextField margin="normal" name="kirjailija" label="Kirjailija:" type="text" fullWidth variant="outlined" />
                    <TextField margin="normal" name="piirtajat" label="Piirtäjät:" type="text" fullWidth variant="outlined" />
                    <TextField margin="normal" name="ensipainosvuosi" label="Ensipainosvuosi:" type="number" fullWidth variant="outlined" />
                    <TextField margin="normal" name="painos" label="Painos:" type="text" fullWidth variant="outlined" />
                    <TextField margin="normal" name="kuntoluokka" label="Kuntoluokka: " type="text" fullWidth variant="outlined" />
                    <TextField margin="normal" name="hankintahinta" label="Hankintahinta:" type="number" fullWidth variant="outlined" />
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi" >
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Hankintapäivä"
                                value={paiva}
                                onChange={(newpaiva) => setPaiva(newpaiva)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button sx={{ mt: 2 }} startIcon={<UploadFileIcon />}
                        variant="contained"
                        component="label"
                    >
                        Lisää etukansikuva
                        <input
                            type="file"
                            hidden
                            name='etukansikuva'
                        />
                    </Button>
                    <br></br>
                    <Button sx={{ mt: 1 }} startIcon={<UploadFileIcon />}
                        variant="contained"
                        component="label"
                    >
                        Lisää takakansikuva
                        <input
                            type="file"
                            hidden
                            name='takakansikuva'
                        />
                    </Button>
                    <br></br>
                    <Button sx={{ mt: 1 }} startIcon={<UploadFileIcon />}
                        variant="contained"
                        component="label"
                    >
                        Lisää muita kuvia
                        <input
                            type="file"
                            multiple
                            hidden
                            name='muutkuvat'
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button type='submit' >Tallenna</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

/*
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem >
                            <YearCalendar
                                label="Ensipainosvuosi"
                                onChange={(date) => setYear(date.getFullYear())}
                                value={year}
                            />
                        </DemoItem>
                    </LocalizationProvider>
*/