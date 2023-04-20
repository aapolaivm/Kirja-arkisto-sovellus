import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DataTable({ openDialog, rowId, fetchKirjat2 }) {
    const columns = [
        { field: 'id', headerName: 'ID', width: 0 },
        { field: 'nimi', headerName: 'Nimi', width: 130, flex: 1 },
        { field: 'jarjestysnumero', headerName: 'Järjestysnumero', width: 50, flex: 1 },
        { field: 'kirjailija', headerName: 'Kirjailija', width: 100, flex: 1 },
        
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
                            console.log('What is this',cellValues.id, rowId)
                            openDialog(cellValues.id)
                        }}
                    >
                        Näytä
                    </Button>
                );
            }
        },
        {
            field: "Delete",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={(event) => {
                            fetch(`http://localhost:5000/api/sarjat/${rowId}/kirjat/${cellValues.id}`, { method: 'Delete' })
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

    //hakee sarjojen idn perusteella backendistä kaikki sarjaan kuuluvat kirjat
    useEffect(() => {
        fetch(`http://localhost:5000/api/sarjat/${rowId}/kirjat`)
            .then(r => r.json())
            .then(data => {
                setRows(data.kirjat);
                });
    }, [rowId, fetchKirjat, fetchKirjat2]);

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
            />
        </div>
    );
}
