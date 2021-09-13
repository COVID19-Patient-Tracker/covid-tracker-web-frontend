/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import Info from './Info';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root:{

  },
  info:{
    padding:"80px"
  }
}));

export default function GroupedSearch(props) {

    const classes = useStyles();
    const {items} = props
    const [hospitalName, sethospitalName] = useState(null)
    const options = items.map((option) => {

        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const getOption = (event,value) => {
      sethospitalName(value)
      console.log(value)
    }
  return (

    <div className={classes.root}>
      <Autocomplete
        id="grouped-search"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        style={{ width: "auto",padding:"20px" }}
        renderInput={(params) => <TextField {...params} label="select hospital name to see more data" variant="outlined" />}
        onChange={getOption}
      />
      {/* show info */}
      <Collapse in={hospitalName}><React.Fragment><Info className={classes.info} /></React.Fragment></Collapse>
    </div>
  );
}