import React , { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../../components/css/forms.css'
import AdmitRepo from './Reports/Admit_Details/admit_report';
import CurrentStatus from './Reports/Patient_Status/current_status';
import HospitalTransfer from './Reports/Hospital_Transfer/hospital _transfer';
import TestResult from './Reports/PCR_Antigen_Results/pcr_antigen';
import WardTransfer from './Reports/Ward_Transfer/ward _transfer';
import {Card } from '@material-ui/core';
import {useParams} from 'react-router-dom'
import { getRequest } from "../../api/utils";
import * as routes from '../../shared/BackendRoutes';


const Create =() =>{
    const {id} = useParams()
    //const [id] = useState('987710110V');
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [patients, setPatients] = React.useState([]);
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
    

    // get patient by id
  useEffect(() => {
    // made request to the backend
    getRequest(routes.GET_PATIENT_BY_ID +id , headers)
        .then((response) => {
            if(response.data){
                const {data,headers} = response
                setPatients(data.Info)
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
    },[]);

    return (
        <div className="create" style={{ margin:"150px auto"}}>
            <Card variant="outlined" >
                <input 
                className="input1"
                type="text" 
                required
                style={{ margin:'50px auto', width:'80%'}}
                value={patients.nic}/>
                <AdmitRepo/>
                <TestResult/>
                <CurrentStatus/> 
                <HospitalTransfer/>  
                <WardTransfer/> 
            </Card>
            
        </div>
    );
}



export default Create;