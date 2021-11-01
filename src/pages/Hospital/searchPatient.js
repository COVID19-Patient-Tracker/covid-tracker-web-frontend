import React, { useState, useEffect } from "react";
import "./../../components/css/table.css"
import "./../../components/css/forms.css"
import { Table,TableContainer, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import './history';
import * as routes from '../../shared/BackendRoutes'
import {Card, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getRequest } from "../../api/utils";

const PatientSearch = () => {
  const [search, setSearch] = useState('');
  const [isOnline,setIsOnline] = useState(true);
  const [reqSuccess,setReqSuccess] = useState(false);
  const [errors,setErrors] = useState({}); // errors in inputs
  const [open, setOpen] = React.useState(false);
  const [patients, setPatients] = React.useState([]);
  const [syncMessage, setSynceMessage] = React.useState(null);
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers

  const history = useHistory();
  const handleClick = () => history.push('/hospital/user/completeReport');
  
  // get all patients
  useEffect(() => {
       
    if(isOnline){
        // made request to the backend
        getRequest(routes.GET_ALL_PATIENTS_URL, headers)
            .then((response) => {
                if(response.data){
                    const {data,headers} = response
                    setPatients(data.patients)
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

    }else{
        // TODO : show warning method that it will synced with backend when online
        setSynceMessage("you're offline now. changes you make will automatically sync with database");
        setOpen(true)
        
    }
  },[]);
  
  const filterID = patients.filter(id => {
    return id.nic.toLowerCase().includes( search.toLowerCase())
  });

  return (
    <div className="create" style={{ margin:"150px auto"}}>
    <Card variant="outlined" >
    <div className="app-container" >
      <h2>Search patient </h2>
      <input type="text" placeholder="Search NIC..." onChange={ e => setSearch(e.target.value)}/>
      <form>
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead >
              <TableRow >
                <TableCell >NIC</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Hos id</TableCell>
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {filterID.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  
                >
                  <TableCell component="th" scope="row" >{row.nic}</TableCell>
                  <TableCell component="th" scope="row" >{row.first_name}</TableCell>
                  <TableCell component="th" scope="row" >{row.last_name}</TableCell>
                  <TableCell component="th" scope="row" >{row.hospital_id}</TableCell>
                  <TableCell style={{width:"10px"}}>
                      <Button
                        onClick={handleClick}
                        to={{pathname:'/admit_report.js', data:row.patient_id}}
                          style={{
                              borderRadius: "40px",
                              fontSize: "15px",
                              height: "30px",
                              color: "rgb(255, 255, 255)",
                              backgroundColor:'#0791c7'                              
                          }}
                      >
                          Edit
                      </Button>
                      </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </form>
    </div>
    </Card>
    </div>
  );
};

export default PatientSearch;
