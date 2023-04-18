import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// TODO: Täältä pitää hakea kyseiset id:t ja postaa ne backendiin tai lähettää ne omaan kokoelmaan
export default function FullScreenDialog() {

    const columns = [
        { field: 'id', headerName: 'ID', width: 0 },
        { field: 'nimi', headerName: 'Nimi', width: 200, flex: 1 },
        { field: 'kategoria', headerName: 'Kategoria', width: 130, flex: 1 },
        { field: 'kustantaja', headerName: 'Kustantaja', width: 130, flex: 1 },
        { field: 'kirjailija', headerName: 'Kirjailija', width: 130, flex: 1 },
        { field: 'julkaisuvuosi', headerName: 'Julkaisuvuosi', width: 130, flex: 1 }
    ];

    const [rows, setRows] = useState([])
    const [fetchKirjat] = useState(0)
    const [open, setOpen] = useState(false);
    const [selectionModel, setSelectionModel] = React.useState([])


    useEffect(() => {
        fetch("http://localhost:5000/api/kirjat").then(r => r.json()).then(data => {
            // console.table(data);
            setRows(data);
        })
    }, [fetchKirjat])


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        console.log('rivit ovat',rows);
        console.log('selectionmodel on');
        setOpen(false);
    }
    return (
        <div>
            <Button onClick={handleOpen}>Lisää kirjoja</Button>
            <Dialog
                fullScreen
                fullWidth
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}

            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Lisää valitut kirjat
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            tallenna
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DataGrid
                        getRowId={row => row._id}
                        
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        columnVisibilityModel={{
                            id: false
                        }}
                        checkboxSelection
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel)
                          }}
                          selectionModel={selectionModel}
                          rows={rows}
                          columns={columns}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );

}