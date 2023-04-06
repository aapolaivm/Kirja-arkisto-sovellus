import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
    {field: 'id', headerName: 'ID', width: 0},
  { field: 'nimi', headerName: 'Nimi', width: 200, flex: 1 },
  { field: 'kategoria', headerName: 'Kategoria', width: 130, flex: 1 },
  { field: 'kustantaja', headerName: 'Kustantaja', width: 130, flex: 1 },
  { field: 'kirjailija', headerName: 'Kirjailija', width: 130, flex: 1 },
  { field: 'julkaisuvuosi', headerName: 'Julkaisuvuosi', width: 130, flex: 1 },
  {    
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            //handleClick(event, cellValues);
          }}
        >
          Muokkaa
        </Button>
      );
    }
  }
];

const rows = [  
  {id: 1, nimi:'Aku Ankka', kategoria: 'Sarjakuva', kustantaja: 'Sanoma Media Finland', kirjailija: 'Carl Barks', julkaisuvuosi: 2023},
   {id: 2, nimi:'Taru Sormusten Herrasta', kategoria: 'Fantasia', kustantaja: 'Allen & Unwin', kirjailija: 'J.R.R. Tolkien', julkaisuvuosi: 1955},
   {id: 3, nimi:'Witcher', kategoria: 'Fantasia', kustantaja: 'Wsoy', kirjailija: 'Andrzej Sapkowski', julkaisuvuosi: 1986},
   {id: 4, nimi:'Kotkanpesä', kategoria: 'Jännitys', kustantaja: 'Wsoy', kirjailija: 'Ilkka Remes', julkaisuvuosi: 2020},
   {id: 5, nimi:'Tintti Amerikassa', kategoria: 'Sarjakuva', kustantaja: 'Otava', kirjailija: 'Hergé', julkaisuvuosi: 2017},
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}


// VANHA TAULUKKO TESTI
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(nimi, kategoria, kustantaja, kirjailija, julkaisuvuosi) {
//   return { nimi, kategoria, kustantaja, kirjailija, julkaisuvuosi };
// }

// const rows = [
//   createData('Aku Ankka', 'Sarjakuva', 'Sanoma Media Finland', 'Carl Barks', 2023),
//   createData('Taru Sormusten Herrasta', 'Fantasia', 'Allen & Unwin', 'J.R.R. Tolkien', 1955),
//   createData('Witcher', 'Fantasia', 'Wsoy', 'Andrzej Sapkowski', 1986),
//   createData('Kotkanpesä', 'Jännitys', 'Wsoy', 'Ilkka Remes', 2020),
//   createData('Tintti Amerikassa', 'Sarjakuva', 'Otava', 'Hergé', 2017),
// ];

// export default function CustomizedTables() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Nimi</StyledTableCell>
//             <StyledTableCell align="right">Kategoria</StyledTableCell>
//             <StyledTableCell align="right">Kustantaja</StyledTableCell>
//             <StyledTableCell align="right">Kirjailija</StyledTableCell>
//             <StyledTableCell align="right">Julkaisuvuosi</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.nimi}>
//               <StyledTableCell component="th" scope="row">
//                 {row.nimi}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.kategoria}</StyledTableCell>
//               <StyledTableCell align="right">{row.kustantaja}</StyledTableCell>
//               <StyledTableCell align="right">{row.kirjailija}</StyledTableCell>
//               <StyledTableCell align="right">{row.julkaisuvuosi}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }