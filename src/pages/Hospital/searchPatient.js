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
import { useAuth } from "../../components/AuthConext";

const PatientSearch = () => {
  const [search, setSearch] = useState('');
  const [reqSuccess,setReqSuccess] = useState(false);
  const [errors,setErrors] = useState({}); // errors in inputs
  const [patients, setPatients] = useState([]);
  const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
  const history = useHistory();
  const auth = useAuth();

  const handleClick = (id) => history.push(`/hospital/user/completeReport/${id}`);

  //Get patient using the hospital id
  useEffect(() => {
    const user_id = {
        "id":auth.currentUser.id,
    }

    // made request to the backend
    getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id,headers)
      .then((response) => {
        
        if(response.data){
          sethospitalInfo(response.data.Info.hospital[0]);
          console.log(response.data.Info.hospital[0].hospital_id)
          getRequest(routes.GET_PATIENT_BY_HOSPITAL_ID + response.data.Info.hospital[0].hospital_id,headers)
            .then((response) => {
              
              if(response.data){
                
                setPatients(response.data.patient);
                setErrors({});
                setReqSuccess(true)
              }
              else if(response.error){
                const {error,headers} = response
                setErrors({...error.response.data}) // set errors of inputs and show
                setReqSuccess(false)
              }
            })
            .catch((e) => {});
            }
            else if(response.error){
              const {error,headers} = response
              setErrors({...error.response.data}) // set errors of inputs and show
              setReqSuccess(false)
            }
          })
          .catch((e) => {
        });
      return () => {
    }
  }, [])
  
  const filterID = patients.filter(id => {
    return id.nic.toLowerCase().includes( search.toLowerCase())
  });
  console.log(filterID)
  
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
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {filterID.map((row) => (
                //hospitalInfo.hospital_id==row.hospital_id? 
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}                 
                >
                  <TableCell component="th" scope="row" id="nic">{row.nic}</TableCell>
                  <TableCell component="th" scope="row" >{row.first_name}</TableCell>
                  <TableCell component="th" scope="row" >{row.last_name}</TableCell>
                  <TableCell style={{width:"10px"}}>
                      <Button 
                        onClick={()=>handleClick(row.patient_id)}
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
