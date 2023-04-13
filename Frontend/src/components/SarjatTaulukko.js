import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ListaKirjoista from "components/SarjanKirjatTaulukko"
import { useEffect } from 'react';


export default function DataGridDemo() {

    const columns = [
        { field: 'nimi', headerName: 'Nimi', width: 150, editable: false },
        {
            field: 'ilmestymisvuodet', headerName: 'Vuosi', width: 100, editable: false,
            valueGetter: (params) =>
                `${params.row.ekavuosi || ''} - ${params.row.vikavuosi || ''}`,
        },
    ];

    const [rows, setRows] = useState([])

    /*
    const [selectedRow, setSelectedRow] = React.useState(null);
    const handleRowClick = (params) => {
        setSelectedRow(params.row);
    };

*/

    const [fetchSarjat] = useState(0)

    useEffect(() => {
        fetch("http://localhost:5000/api/Sarjat").then(r => r.json()).then(data => {
            console.table(data);
            setRows(data)
        })
    }, [fetchSarjat])

    return (
        <Box sx={{ display: 'flex', height: 600, width: 1 }}>

            <DataGrid
                getRowId={row=>row._id}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                hideFooterSelectedRowCount
                //onRowClick={handleRowClick}
            />


            <Box
                component="main"
                sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', bgcolor: 'background.default', ml: 3 }}
            >
                <Box
                    sx={{ display: 'flex', flexGrow: 0, border: 1, borderColor: 'grey.300', borderRadius: 1, bgcolor: 'background.default', p: 1 }}
                >

                    <Box
                        component="img"
                        sx={{
                            p: 1,
                            maxHeight: 300
                        }}
                        alt="Aku Ankka."
                        src="https://www.kulttuuriverkko.fi/uploads/lehtikuvat/aku-ankka-f037ad2986f1b8d6b804b3e6c3ecabd5.jpg"
                    >
                    </Box>

                </Box>
                <h4>Kirjat:</h4>
                <Box
                    sx={{ flexGrow: 2, bgcolor: 'background.default', }}
                >
                    <ListaKirjoista></ListaKirjoista>
                </Box>
            </Box>

        </Box>
    );
}

/*

                    {selectedRow && (
                        <div>
                            <h2>Selected Row:</h2>
                            <p>ID: {selectedRow.id}</p>
                            <p>Sarjan nimi: {selectedRow.sarjannimi}</p>
                        </div>
                    )}
*/
