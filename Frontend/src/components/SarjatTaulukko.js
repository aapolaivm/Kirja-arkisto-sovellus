import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



const columns = [
    {
        field: 'sarjannimi',
        headerName: 'Nimi',
        width: 150,
        editable: false
    },
    {
        field: 'ilmestymisvuodet',
        headerName: 'Vuosi',
        width: 100,
        editable: false,

        valueGetter: (params) =>
            `${params.row.ekavuosi || ''} - ${params.row.vikavuosi || ''}`,
    },
    {
        field: 'kpl',
        headerName: 'Kappaleita',
        width: 100,
        editable: false
    }
];

const rows = [
    { id: 2, sarjannimi: 'Aku Ankka', ekavuosi: 1971, vikavuosi: 1987, kpl: 189 },
    { id: 3, sarjannimi: 'Aku Ankka', ekavuosi: 1971, vikavuosi: '', kpl: 0 },
    { id: 5, sarjannimi: 'Aku Ankan taskukirjakokoelma', ekavuosi: 1971, vikavuosi: 1987 , kpl: 123}
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
