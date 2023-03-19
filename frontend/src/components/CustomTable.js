import React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function CustomTable({ columns, values, emptyMessage }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((c, i) => (
              <TableCell key={i}>{c.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((c, i) => {
                return <TableCell key={i}>{row[c.key]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {values.length === 0 && (
        <Typography variant="h8" align="center" style={{ fontStyle: 'italic', alignItems: 'center', margin: '10px' }}>
          {emptyMessage}
        </Typography>
      )}
    </TableContainer>
  );
}
