import React, { useState, useEffect, useRef } from "react";
import "../../../../components/css/table.css"
import { getRequest, postRequest } from "../../../../api/utils";
import * as routes from "../../../../shared/BackendRoutes"
import { useParams } from 'react-router-dom'
import store from "../../../../store";
import { Alert } from '@mui/material';
import {Snackbar } from '@material-ui/core';
import { useAuth } from "../../../../components/AuthConext";

const HospitalTransfer = () => { 
  const [results, setresults] = useState([]);
  const { id } = useParams()
  const auth = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [reqSuccess, setReqSuccess] = useState(false);
  const [currentHospital, setcurrentHospital] = useState([])
  const [errors, setErrors] = useState({}); // errors in inputs
  const [reqSuccessUpdate, setReqSuccessUpdate] = useState(false);
  const [currentWard, setcurrentWard] = useState([])
  const [covidPatient, setcovidPatient] = useState([])
  const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const [Hospitals, setHospitals] = useState([]);
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = { headers: { "Authorization": `${JWTtoken}` } } // headers
  const [syncMessage, setSynceMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [op,setop] = useState([]);
  const prevDetailsRef = useRef();

  //check whether details are changed or not
  useEffect(() => {
      prevDetailsRef.current = results;
  });
  const prevDetails = prevDetailsRef.current;

  // for snack bar
  const handleClose = (event, reason) => {
    // when click away set exception  to null
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleAlertClose = () => {
    setReqSuccessUpdate(false);
    setErrors({});
  };

  // handling updates
  const handleUpadte = (e) => {
    setresults(
      {
        ...results,
        [e.target.name]: e.target.value
      })
    e.preventDefault();
    setcurrentHospital(
      {
        ...currentHospital,
        [e.target.name]: e.target.value
      })
    

  }
 
  // get all hospitals
  useEffect(() => {
    getRequest(routes.GET_ALL_HOSPITALS_URL, headers)
      .then((response => {
        if (response.data) {
          setErrors({})
          setHospitals(response.data.hospitals);
        }
        if (response.error) setErrors({ ...response.error.response.data });
      }))
  }, []);

  // get visit history
  useEffect(() => {
    getRequest(routes.GET_CURRENT_STATUS + id, headers)
      .then((response) => {
        if (response.data) {
          setcurrentHospital(response.data.histories.hospital)
          setErrors({});
          setReqSuccess(true)
        }
        else if (response.error) { 
          const { error, headers } = response
          setErrors({ ...error.response.data }) // set errors of inputs and show
          setReqSuccess(false)
        }
      })
      .catch((e) => {
        setReqSuccess(false)
      });
  }, []);

  
  // get visit history
  useEffect(() => {

    getRequest(routes.GET_CURRENT_STATUS + id, headers)
      .then((response) => {
        if (response.data) {
          setcurrentWard(response.data.histories)
          setresults(response.data.histories)
          console.log(response.data.histories)
          setErrors({});
          setReqSuccess(true)
        }
        else if (response.error) {
          const { error, headers } = response
          setErrors({ ...error.response.data }) // set errors of inputs and show
          setReqSuccess(false)
        }
      })
      .catch((e) => {
        setReqSuccess(false)
      });
  }, []);

  // get covid patients
  //Get wards in hospital using the hospital id
  useEffect(() => {
    const user_id = {
        "id":auth.currentUser.id,
    }

    // made request to the backend
    getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id,headers)
      .then((response) => {
        console.log(response)
        if(response.data){
          sethospitalInfo(response.data.Info.hospital[0]);
          getRequest(routes.GET_COVID_PATIENTS + response.data.Info.hospital[0].hospital_id,headers)
            .then((response) => {
              
              if(response.data){
                setcovidPatient(response.data.CovidPatients);
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
  

  //to transfer to another ward
  const submit = (e) => {

    e.preventDefault();
    if (isOnline) {
      if(results != prevDetails){

        var putData = results;
        putData.hospital = { "hospital_id": putData.hospital_id }
        
        // made request to the backend
        postRequest(routes.UPDATE_HOSPITAL_TRANSFER, putData, headers)
          .then((response) => {
            if (response.data) {
              setErrors({});
              setReqSuccessUpdate(true)
            }
            else if (response.error) {
              const { error, headers } = response
              setErrors({ ...error.response.data }) // set errors of inputs and show
              setReqSuccessUpdate(false)
            }
          })
          .catch((e) => {
            setReqSuccessUpdate(false)
          });
      }else{
          alert("You have not changed the details")
      }

    } else {
      // TODO : show warning method that it will synced with backend when online
      setSynceMessage("you're offline now. changes you make will automatically sync with database");
      setOpen(true)
      // push to store
      store.dispatch({
        type: "todos/todoAdded",
        payload: {
          inputs: { currentHospital, results },
          url: routes.UPDATE_HOSPITAL_TRANSFER,
          method: "POST",
          headers: headers
        }
      }
      )
    }
  }

  //wards using hospital ID
  const wardsselect = () => {
  
    console.log(currentHospital.hospital_id)
    getRequest(routes.GET_WARDS_BY_HOSPITAL_ID + currentHospital.hospital_id, headers)
      .then((response) => {
        console.log(response)
        if (response.data) {
          setop(response.data.wards);
          setErrors({});
          setReqSuccess(true)
        }
        else if (response.error) {
          const { error, headers } = response
          setErrors({ ...error.response.data }) // set errors of inputs and show
          setReqSuccess(false)
        }
      })
      .catch((e) => {
        setReqSuccess(false)
      });
  
  }

  //change date format
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  const [newA,setnew]=useState([])

  if(covidPatient.length>0){
    {covidPatient.map((offers)=> {
    console.log(covidPatient)

        if(offers.patient_id==id){
          return (
    <div className="app-container">
      <h2>Covid patient hospital transfer</h2>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {syncMessage}
            </Alert>
        </Snackbar>
      <form>
        <label>Patient ID</label>
        
        <input
          type="text"
          name="patient_id"
          value={results.patient_id}
          required="required"
          placeholder="Enter Patient ID"
        />
        <label>Hospital</label>
        <select
          required="required"
          name="hospital_id"
          value={currentHospital.hospital_id}
          onChange ={handleUpadte}
        >
          <option aria-label="None" value="" />
          {Hospitals.map((hospital) => <option value={hospital.hospital_id}>{hospital.name}</option>)}
        </select>
        <label>Ward</label>
        <input 
          type="button" 
          onClick={wardsselect} 
          value="Select the ward"
          style={{ width: "200px", height: "35px", marginTop: "10px", alignSelf: "center", justifyContent: "center",backgroundColor:"#70d4fc" }}/>
        <select
          required="required"
          name="ward_id"
          value={results.ward_id}
          onChange ={handleUpadte}
        >
          <option aria-label="None" value="" />
          {op.map((ward) => <option value={ward.ward_id}>{ward.ward_name}</option>)}
        </select>
        <label>Visit date</label>
        <input
          type="date"
          name="visit_date"
          value={formatDate(results.visit_date)}
          required="required"
          placeholder="Enter NIC"
          onChange={handleUpadte}
        />      
        <button
          style={{ width: "200px", height: "35px", marginTop: "10px", alignSelf: "center", justifyContent: "center" }}
          onClick={submit}
        >
          Transfer
        </button>
        {reqSuccessUpdate && <Alert onClose={handleAlertClose} severity="success">Transfered the patient </Alert>}
        
        <hr className="hr" />
      </form>
    </div>
  );
        }else{
            return(
      <div className="app-container">
      <h2>Covid patient hospital transfer</h2>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {syncMessage}
            </Alert>
        </Snackbar>
      <form>
        <h3>This patient is not a covid patient</h3>
        <hr className="hr" />
      </form>
    </div>
    );
  }
        
        
    })}
  }
  
  // if(covidPatient.includes(id)){
  //   return (
  //   <div className="app-container">
  //     <h2>Covid patient hospital transfer</h2>
  //       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //           <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
  //               {syncMessage}
  //           </Alert>
  //       </Snackbar>
  //     <form>
  //       <label>Patient ID</label>
        
  //       <input
  //         type="text"
  //         name="patient_id"
  //         value={results.patient_id}
  //         required="required"
  //         placeholder="Enter Patient ID"
  //       />
  //       <label>Hospital</label>
  //       <select
  //         required="required"
  //         name="hospital_id"
  //         value={currentHospital.hospital_id}
  //         onChange ={handleUpadte}
  //       >
  //         <option aria-label="None" value="" />
  //         {Hospitals.map((hospital) => <option value={hospital.hospital_id}>{hospital.name}</option>)}
  //       </select>
  //       <label>Ward</label>
  //       <input 
  //         type="button" 
  //         onClick={wardsselect} 
  //         value="Select the ward"
  //         style={{ width: "200px", height: "35px", marginTop: "10px", alignSelf: "center", justifyContent: "center",backgroundColor:"#70d4fc" }}/>
  //       <select
  //         required="required"
  //         name="ward_id"
  //         value={results.ward_id}
  //         onChange ={handleUpadte}
  //       >
  //         <option aria-label="None" value="" />
  //         {op.map((ward) => <option value={ward.ward_id}>{ward.ward_name}</option>)}
  //       </select>
  //       <label>Visit date</label>
  //       <input
  //         type="date"
  //         name="visit_date"
  //         value={formatDate(results.visit_date)}
  //         required="required"
  //         placeholder="Enter NIC"
  //         onChange={handleUpadte}
  //       />      
  //       <button
  //         style={{ width: "200px", height: "35px", marginTop: "10px", alignSelf: "center", justifyContent: "center" }}
  //         onClick={submit}
  //       >
  //         Transfer
  //       </button>
  //       {reqSuccessUpdate && <Alert onClose={handleAlertClose} severity="success">Transfered the patient </Alert>}
        
  //       <hr className="hr" />
  //     </form>
  //   </div>
  // );
  // }

  // else{
  //   return(
  //     <div className="app-container">
  //     <h2>Covid patient hospital transfer</h2>
  //       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //           <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
  //               {syncMessage}
  //           </Alert>
  //       </Snackbar>
  //     <form>
  //       <h3>This patient is not a covid patient</h3>
  //       <hr className="hr" />
  //     </form>
  //   </div>
  //   );
  // }
};

export default HospitalTransfer;