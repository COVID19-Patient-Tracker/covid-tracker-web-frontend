/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core';
import Info from './Info';
import Collapse from '@material-ui/core/Collapse';
import * as routes from '../../../shared/BackendRoutes'
import { getRequest } from '../../../api/utils';

const useStyles = makeStyles((theme) => ({
  root:{ margin: "-15% auto", width: "90%", },
  info:{ padding:"50px" }
}));

export default function GroupedSearch(props) {
    const classes = useStyles();
    const {items} = props
    const [statistics, setstatistics] = useState([])
    const [hospitalId, sethospitalId] = useState(null)
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const options = items.hosInfos.map((option) => {
    
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const getOption = (event,value) => {
      sethospitalId(value)
      setstatistics([])
      if(value){
          getRequest(routes.GET_STATISTICS + value.hospital_id)
          .then((response) => {
              if(response.data){
                  const {data,headers} = response
                  setstatistics(data.statistics[0])
                  console.log(data.statistics[0])
                  setErrors({});
                  setReqSuccess(true)
              }
              else if(response.error){
                  const {error,headers} = response
                  setErrors({...error.response.data}) // set errors of inputs and show
                  setReqSuccess(false)
              }
          })
          .catch((e) => {
              setReqSuccess(false)
          });
      }}
  return (

    <div className={classes.root}>
      <Autocomplete
        id="grouped-search"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        style={{ width: "auto",padding:"20px" }}
        renderInput={(params) => <TextField {...params} label="Select hospital name to see more data" variant="outlined" />}
        onChange={getOption}
      />
      {/* show info */}
      <Collapse in={hospitalId}><React.Fragment>{reqSuccess ? <Info className={classes.info} props={statistics} /> : "loading"}</React.Fragment></Collapse>
    </div>
  );
}