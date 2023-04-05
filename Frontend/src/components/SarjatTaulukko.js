import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ListaKirjoista from "components/SarjanKirjatTaulukko"


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
    { id: 5, sarjannimi: 'Aku Ankan taskukirjakokoelma', ekavuosi: 1971, vikavuosi: 1987, kpl: 123 }
];

export default function DataGridDemo() {
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
    };


    return (
        <Box sx={{ display: 'flex', height: 600, width:1}}>
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
                onRowClick={handleRowClick}
            />

            <Box
                component="main"
                sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', bgcolor: 'background.default', ml: 3 }}
            >
                <Box
                    component="ylaboksi"
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
                    
                    {selectedRow && (
                        <div>
                            <h2>Selected Row:</h2>
                            <p>ID: {selectedRow.id}</p>
                            <p>Sarjan nimi: {selectedRow.sarjannimi}</p>
                        </div>
                    )}
                </Box>
                <h4>Kirjat:</h4>
                <Box
                    component="alaboksi"
                    sx={{ flexGrow: 2, bgcolor: 'background.default', }}
                >
                    <ListaKirjoista></ListaKirjoista>
                </Box>
            </Box>

        </Box>
    );
}
