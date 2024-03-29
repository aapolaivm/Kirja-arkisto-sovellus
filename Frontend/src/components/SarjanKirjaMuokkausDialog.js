
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose, kirjaID, rowId, reFetchKirjat2 }) {
    const [nimi, setNimi] = useState('');
    const [jarjestysnumero, setJarjestysnumero] = useState(null);
    const [kuvaus, setKuvaus] = useState('');
    const [kirjailija, setKirjailija] = useState('');
    const [piirtajat, setPiirtajat] = useState('');
    const [ensipainosvuosi, setEnsipainosvuosi] = useState(null);
    const [painos, setPainos] = useState('');
    const [kuntoluokka, setKuntoluokka] = useState('');
    const [hankintahinta, setHankintahinta] = useState(null);
    const [hankintapvm, setHankintapvm] = useState(null);
    const [kirjaData, setKirjaData] = useState({})
    const [etukansikuva, setEtukansikuva] = useState(null);
    const [takakansikuva, setTakakansikuva] = useState(null);
    const [muutkuvat, setMuutkuvat] = useState([]);

    const apiUrl = `http://localhost:5000/api/sarjat/${rowId}/kirjat/${kirjaID}`;
    useEffect(() => { // hae data
        if (!kirjaID) {
            return
        }
        fetch(apiUrl)
            .then(r => r.json())
            .then(d => {
                console.log("Kirjanmuokkusdata", d)
                setKirjaData(d.sarjanKirja)
            })
    }, [kirjaID])

    console.log("Kirjadata on: ", kirjaData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            "nimi": nimi,
            "jarjestysnumero": jarjestysnumero,
            "ensipainosvuosi": ensipainosvuosi,
            "kuvausteksti": kuvaus,
            "kirjailija": kirjailija,
            "piirtajat": piirtajat,
            "painos": painos,
            "kuntoluokka": kuntoluokka,
            "hankintahinta": hankintahinta,
            "hankintapvm": moment(hankintapvm, "D.M.YYYY").toDate()
        }
        
       /*
        const data = new FormData();
        data.append('nimi', nimi);
        data.append('jarjestysnumero', jarjestysnumero);
        data.append('ensipainosvuosi', ensipainosvuosi);
        data.append('kuvausteksti', kuvaus);
        data.append('kirjailija', kirjailija);
        data.append('piirtajat', piirtajat);
        data.append('painos', painos);
        data.append('kuntoluokka', kuntoluokka);
        data.append('hankintahinta', hankintahinta);
        data.append('hankintapvm', moment(hankintapvm, "D.M.YYYY").toDate());
*/
/*
        if (etukansikuva) {
            data.append("etukansikuva", etukansikuva);
        }

        if (takakansikuva) {
            data.append("takakansikuva", takakansikuva);
        }
        if (muutkuvat) {
            for (let i = 0; i < muutkuvat.length; i++) {
                data.append("muutkuvat", muutkuvat[i]);
            }
        }
        */
        console.log('etukuva', etukansikuva)
        console.log('Lähetetty data', data)
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                //'enctype': 'multipart/form-data'
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        reFetchKirjat2();
        handleClose();
    }

    useEffect(() => {
        setNimi(kirjaData.nimi);
        setJarjestysnumero(kirjaData.jarjestysnumero);
        setKuvaus(kirjaData.kuvaus);
        setKirjailija(kirjaData.kirjailija);
        setPiirtajat(kirjaData.piirtajat);
        setEnsipainosvuosi(kirjaData.ensipainosvuosi);
        setPainos(kirjaData.painos);
        setKuntoluokka(kirjaData.kuntoluokka);
        setHankintahinta(kirjaData.hankintahinta);
        setHankintapvm(kirjaData.hankintapvm);
        setEtukansikuva(kirjaData.etukansikuva);
        setTakakansikuva(kirjaData.takakansikuva);
        setMuutkuvat(kirjaData.muutkuvat);
    }, [kirjaData]);

    return (
        <React.Fragment>
            <Dialog
                onSubmit={handleSubmit}
                sx={{ m: 3 }}
                open={open}
                onClose={handleClose}
                component='form'>
                <DialogTitle>Muokkaa skirjaa: {kirjaData?.nimi}</DialogTitle>
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
                    <TextField
                        margin="normal"
                        name="jarjestysnumero"
                        value={jarjestysnumero}
                        onChange={e => setJarjestysnumero(e.target.value)}
                        label="Järjestysnumero"
                        type="number"
                    />
                    <TextField
                        type="text"
                        id="outlined-basic"
                        label="Kuvaus"
                        variant="outlined"
                        value={kuvaus}
                        onChange={(e) => setKuvaus(e.target.value)}
                        inputProps={{
                            readOnly: true,
                            style: {
                                height: "100px",
                                width: "500px"
                            }
                        }}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Kirjailija"
                        id="kirjailija"
                        value={kirjailija}
                        onChange={(e) => setKirjailija(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Piirtäjät"
                        id="piirtajat"
                        value={piirtajat}
                        onChange={(e) => setPiirtajat(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Ensipainosvuosi"
                        id="ensipainosvuosi"
                        value={ensipainosvuosi}
                        onChange={(e) => setEnsipainosvuosi(e.target.value)}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        fullWidth
                        label="Painos"
                        id="painos"
                        value={painos}
                        onChange={(e) => setPainos(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Kuntoluokka"
                        id="kuntoluokka"
                        value={kuntoluokka}
                        onChange={(e) => setKuntoluokka(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Hankintahinta"
                        id="hankintahinta"
                        value={hankintahinta}
                        onChange={(e) => setHankintahinta(e.target.value)}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        fullWidth
                        label="Hankintapäivämäärä"
                        id="hankintapvm"
                        value={hankintapvm}
                        onChange={(e) => setHankintapvm(e.target.value)}
                        margin="normal"
                    />
                    <br></br>
                    Etukansikuva:
                    <br></br>
                    {kirjaData?.etukansikuva?.nimi ? (
                        <img
                            style={{ maxWidth: 200, margin: 15 }}
                            src={`http://localhost:5000/api/sarjat/kuva/${kirjaData?.etukansikuva?.nimi}`}
                            alt="image"
                        />
                    ) : (
                        <div>Ei kuvaa</div>
                    )}

                    <TextField
                        type="file"
                        label=""
                        onChange={(e) => setEtukansikuva(e.target.files[0])}
                        margin="normal"
                    />

                    <br></br>
                    Takakansikuva:
                    <br></br>
                    {kirjaData?.takakansikuva?.nimi ? (
                        <img
                            style={{ maxWidth: 200, margin: 15 }}
                            src={`http://localhost:5000/api/sarjat/kuva/${kirjaData?.takakansikuva?.nimi}`}
                            alt="image"
                        />
                    ) : (
                        <div>Ei kuvaa</div>
                    )}
                    <TextField
                        type="file"
                        label=""
                        onChange={(e) => console.log('textfield kuva', e.target.files[0])}
                        margin="normal"
                    />
                    <br></br>
                    Muut kuvat:
                    <br></br>
                    {
                        (kirjaData?.muutkuvat ?? []).map(k => {
                            return (
                                <img
                                    key={k.nimi}
                                    style={{ maxWidth: 200, margin: 15 }}
                                    src={`http://localhost:5000/api/sarjat/kuva/${k.nimi}`}
                                    alt="image"
                                />
                            )
                        })
                    }
                    <TextField
                        type="file"
                        label=""
                        onChange={(e) => setMuutkuvat(e.target.files)}
                        margin="normal"
                        InputProps={{
                            multiple: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>Peruuta</Button>
                    <Button variant='outlined' type='submit' >Tallenna</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

/** 
 *  
 */

/*
<LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField']}>
                            <TextField
                                label="Hankintapäivämäärä"
                                value={hankintapvm}
                                onChange={(date) => setHankintapvm(date)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
*/