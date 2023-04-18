import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DataTable({ openDialog, sarjanKirjat }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 0 },
        { field: 'nimi', headerName: 'Nimi', width: 130, flex: 1 },
        { field: 'kategoria', headerName: 'Kategoria', width: 100, flex: 1 },
        { field: 'kustantaja', headerName: 'Kustantaja', width: 100, flex: 1 },
        { field: 'kirjailija', headerName: 'Kirjailija', width: 100, flex: 1 },
        { field: 'julkaisuvuosi', headerName: 'Julkaisuvuosi', width: 50, flex: 1 },
        {
            field: "Edit",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            //handleClick(event, cellValues);
                            openDialog(cellValues.id)
                        }}
                    >
                        Näytä
                    </Button>
                );
            }
        },
        //TODO: Että poistaa vaan sarjojen kirjoista sen idn
        {
            field: "Delete",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(event) => {
                            fetch(`http://localhost:5000/api/kirjat/${cellValues.id}`, { method: 'Delete' })
                                .then(r => r.json())
                                .then(d => {
                                    setFetchKirjat(numero => numero + 1)
                                })
                        }}
                    >
                        Poista
                    </Button>
                );
            }
        }
    ];
    const [rows, setRows] = useState([])
    const [fetchKirjat, setFetchKirjat] = useState(0)

    console.log("tämä on tuotu oikeaan paikkaa", sarjanKirjat)

    useEffect(() => {
        fetch(`http://localhost:5000/api/kirjat`)
            .then(r => r.json())
            .then(data => {
                setRows(data.filter(item => sarjanKirjat.includes(item._id)));
                console.log('Filtteröity data alla')
                //console.log(filteredData);
                //setRows(filteredData);
            });
    }, [sarjanKirjat]);

    return (
        <div style={{ height: 475, width: '100%' }}>
            <DataGrid
                getRowId={row => row._id}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                columnVisibilityModel={{
                    id: false
                }}
            //checkboxSelection
            />
        </div>
    );
}
