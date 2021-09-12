/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
export default function GroupedSearch(props) {
    
    const {items} = props
    const options = items.map((option) => {

        const firstLetter = option.title[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const getOption = (event,value) => {
        console.log(value)
    }
  return (
    <Autocomplete
      id="grouped-search"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      style={{ width: "auto",padding:"20px" }}
      renderInput={(params) => <TextField {...params} label="select hospital name to see more data" variant="outlined" />}
      onChange={getOption}
    />
  );
}