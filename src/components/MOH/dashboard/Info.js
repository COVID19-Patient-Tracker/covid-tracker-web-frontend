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
export default function Info({props}) {
  const classes = useStyles();
  const rows = [
    createData('Total PCRs', props.total_pcrs),
    createData('Total RapidAntigens', props.total_antigens),
    createData('Total Covid Patients', props.total_covid_patients),
    createData('Total Active', props.total_actives),
    createData('Total Deaths', props.total_deaths),
    createData('Total Recovered', props.total_recovered),
  ];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Statistics of {new Date(props.date).toDateString()}</TableCell>
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
