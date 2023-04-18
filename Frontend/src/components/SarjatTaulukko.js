import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';

export default function DataGridDemo({fetchSarjat, getRiviId}) {

    const columns = [
        { field: 'nimi', headerName: 'Nimi', width: 150, editable: false, flex: 3 },
        {
            field: 'ilmestymisvuodet', headerName: 'Vuosi', width: 150, flex: 2, editable: false,
            valueGetter: (params) =>
                `${params.row.ekavuosi || ''} - ${params.row.vikavuosi || ''}`,
        },
    ];

    const [rows, setRows] = useState([])

    const handleRowClick = (params) => {
        const selectedRowId = params.row._id;
        getRiviId(selectedRowId);
    };

    useEffect(() => {
        fetch("http://localhost:5000/api/Sarjat")
            .then(r => r.json())
            .then(data => {
                console.table(data);
                setRows(data)
            })
    }, [fetchSarjat])

    return (
        <DataGrid
            getRowId={row => row._id}
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
    );
}