import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



const columns = [
    {
        field: 'kirjannimi',
        headerName: 'Nimi',
        width: 300,
        editable: false
    },
    {
        field: 'kirjailija',
        headerName: 'Kirjailija',
        width: 200,
        editable: false,
    },
    {
      field: 'jarjnro',
      headerName: 'Järjestysnumero',
      width: 200,
      editable: false,
  },
    {
        field: 'painovuosi',
        headerName: 'Paivuosi',
        width: 200,
        editable: false
    }
];

const rows = [
    { id: 1, kirjannimi: 'Aku Ankan taskukirjat 001', kirjailija: 'Carl Barks', jarjnro: 1, painovuosi:1973 },
    { id: 2, kirjannimi: 'Aku Ankan taskukirjat 002', kirjailija: 'Carl Barks', jarjnro: 2, painovuosi:1973 },
    { id: 3, kirjannimi: 'Aku Ankan taskukirjat 004', kirjailija: 'Carl Barks', jarjnro: 4, painovuosi:1974 },
    { id: 4, kirjannimi: 'Aku Ankan taskukirjat 020', kirjailija: 'Carl Barks', jarjnro: 20, painovuosi:1978 },
    { id: 5, kirjannimi: 'Aku Ankan taskukirjat 141', kirjailija: 'Carl Barks', jarjnro: 141, painovuosi:2004 },
];

export default function DataGridDemo(){

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
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
            />
        </Box>
    );
}
