import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface dataRow {
    rows: row[];
}

interface row {
    name: string;
  detail: string;
}

export default function AddressTable(props: dataRow) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{backgroundColor:'#DDDDDD'}}>Address</TableCell>
            <TableCell sx={{backgroundColor:'#DDDDDD'}} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((rowCell) => (
            <TableRow
              key={rowCell.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {rowCell.name}
              </TableCell>
              <TableCell align="right">{rowCell.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
