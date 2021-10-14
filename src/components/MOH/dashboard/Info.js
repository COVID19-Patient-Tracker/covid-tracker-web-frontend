import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(hospitalname, count) {
  return { hospitalname, count};
}

const rows = [
  createData('Positive Cases', 159),
  createData('Recovered', 237),
  createData('Deaths', 262),
  createData('Remaining Capacity', 356),
];

export default function Info() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Statistics of "Hospital Name"</TableCell>
            <TableCell align="center">Counts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.hospitalname}>
              <TableCell component="th" scope="row" >
                {row.hospitalname}
              </TableCell>
              <TableCell align="center">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
