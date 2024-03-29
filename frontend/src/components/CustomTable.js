import React from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CustomTable = ({ columns, values, emptyMessage }) => {
  if (values.length === 0) {
    return (
      <Typography variant="h6" align="center" color="textSecondary" sx={{ fontSize: 16 }}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((c, i) => (
              <TableCell align="center" style={{ width: c.width }} key={i}>{c.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row) => (
            <TableRow key={row.id}>
              {columns.map((c, i) => {
                return <TableCell align="center" key={i}>{row[c.key]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
