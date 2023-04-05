import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const rowData = [
    {
        id:132, name: 'Sepppo',age: 123, 
    }
]

function MyTable() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      //const response = await axios.get("/api/mydata");
      //setData(response.data);
      setData(rowData);
    }
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row)}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedRow && selectedRow.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedRow && `Age: ${selectedRow.age}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyTable;
