import React, { useState, useEffect } from "react";
import '../../../../components/css/table.css';
import data from "./mock-data.json";
import { useAuth } from "../../../../components/AuthConext";
import { getRequest, postRequest, putRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes'
import {useParams} from 'react-router-dom'
import store from "../../../../store";
import {Snackbar,TextField } from '@material-ui/core';
import { Alert } from '@mui/material';
import moment from 'moment';

const TestResult = () => {
  const {id} = useParams()
  const auth = useAuth();
  const [results, setresults] = useState(data);
  const [isOnline,setIsOnline] = useState(true);
  const [inputs,setInputs] = useState({});
  const [reqSuccessGet,setReqSuccessGet] = useState(false);
  const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
  const [reqSuccess,setReqSuccess] = useState(false);
  const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const [antigenInfo,setantigenInfo] = useState([])
  const [errors,setErrors] = useState({}); // errors in inputs
  const [open, setOpen] = React.useState(false);
  const [syncMessage, setSynceMessage] = React.useState(null);
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers

  // handling inputs
  const handleChange = (e) => {
      e.preventDefault();
      setInputs(
          {
              ...inputs, 
              [e.target.name]:e.target.value
          })
  }

  // after press submit if user not online push them into todo in store
    useEffect(() => {
        // subscribe for change of react redux store
        const unsubscribe = store.subscribe(() =>{
            // global states that saved in store
            let globalState = store.getState();
            const online = globalState.onlineStatus;
            // set online status
            setIsOnline(online);
        });
        return () => {
            // unsubscribe for the store change event - otherwies it will create a loop
            unsubscribe();
        }
    }, [])

  // handling updates
  const handleUpadte= (e) => {
      e.preventDefault();
      setantigenInfo(
          {
              ...antigenInfo, 
              [e.target.name]:e.target.value
          })
  }
  // for snack bar
  const handleClose = (event, reason) => {
      // when click away set exception  to null
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleAlertClose = () => {
      setReqSuccess(false);
      setErrors({});
  };
      
  useEffect(() => {
    const user_id = {
      "id":auth.currentUser.id,
    }
   
    // made request to the backend to get hospital details
    // getRequest(routes.GETHOSPITALUSERDETAILS +user_id.id , headers)
    //   .then((response) => {
    //     if(response.data){
    //       sethospitalInfo(response.data.Info.hospital[0])
    //       setErrors({});
    //       setReqSuccessGet(true)
    //     }
    //     else if(response.error){
    //       const {error,headers} = response
    //       setErrors({...error.response.data}) // set errors of inputs and show
    //       setReqSuccessGet(false)
    //     }
    //   })
    //   .catch((e) => {
    //       setReqSuccessGet(false)
    //   });

    // made request to the backend to get antigen test results
    getRequest(routes.GET_ANTIGEN_TEST +id , headers)
      .then((response) => {
        if(response.data){
          setantigenInfo(response.data.TestData[(response.data.TestData).length-1])
          setErrors({});
          setReqSuccessGet(true)
        }
        else if(response.error){
          const {error,headers} = response
          setErrors({...error.response.data}) // set errors of inputs and show
          setReqSuccessGet(false)
        }
      })
      .catch((e) => {
          setReqSuccessGet(false)
      });
    },[]);

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

//   //add antigen test result
//   const submitAntigen = (e) => {
        
//     e.preventDefault();

//     if(isOnline){

//       var putData = inputs; // submit data

//       // made request to the backend
//       postRequest(routes.ADD_ANTIGEN_TEST, putData, headers)
//         .then((response) => {
//           if(response.data){
//             console.log(response.data)
//             setErrors({});
//             setReqSuccess(true)
//           }
//           else if(response.error){
//             const {error,headers} = response
//             setErrors({...error.response.data}) // set errors of inputs and show
//             setReqSuccess(false)
//           }
//         })
//         .catch((e) => {
//             setReqSuccess(false)
//         });

//     }else{
//       // TODO : show warning method that it will synced with backend when online
//       setSynceMessage("you're offline now. changes you make will automatically sync with database");
//       setOpen(true)
//       // push to store
//       store.dispatch({
//         type:"todos/todoAdded",
//         payload:{
//             inputs:inputs,
//             url:routes.ADD_PCR_TEST,
//             method:"POST",
//             headers:headers
//           }
//         }
//       )
//     }
//   }
    
//   //add pcr test result
//   const submitPCR = (e) => {
        
//     e.preventDefault();

//     if(isOnline){

//       var putData = inputs; // submit data

//       // made request to the backend
//       postRequest(routes.ADD_PCR_TEST, putData, headers)
//         .then((response) => {
//           if(response.data){
//             const {data,headers} = response
//             setErrors({});
//             setReqSuccess(true)
//           }
//           else if(response.error){
//             const {error,headers} = response
//             setErrors({...error.response.data}) // set errors of inputs and show
//             setReqSuccess(false)
//           }
//         })
//         .catch((e) => {
//             setReqSuccess(false)
//         });

//     }else{
//       // TODO : show warning method that it will synced with backend when online
//       setSynceMessage("you're offline now. changes you make will automatically sync with database");
//       setOpen(true)
//       // push to store
//       store.dispatch({
//         type:"todos/todoAdded",
//         payload:{
//             inputs:inputs,
//             url:routes.ADD_PCR_TEST,
//             method:"POST",
//             headers:headers
//           }
//         }
//       )
//     }
//   } 

  //update antigen report
    const update = (e) => {
        
        e.preventDefault();

        if(isOnline){

            var putData = antigenInfo; 

            // made request to the backend
            putRequest(routes.UPDATE_ANTIGEN_TEST + antigenInfo.patientId, putData, headers)
                .then((response) => {
                    if(response.data){
                        console.log(response)
                        setErrors({});
                        setReqSuccessUpdate(true)
                    }
                    else if(response.error){
                        const {error,headers} = response
                        setErrors({...error.response.data}) // set errors of inputs and show
                        setReqSuccessUpdate(false)
                    }
                })
                .catch((e) => {
                    setReqSuccessUpdate(false)
                });

        }else{
            // TODO : show warning method that it will synced with backend when online
            setSynceMessage("you're offline now. changes you make will automatically sync with database");
            setOpen(true)
            // push to store
            store.dispatch({
                type:"todos/todoAdded",
                payload:{
                        inputs:antigenInfo,
                        url:routes.UPDATE_ANTIGEN_TEST +antigenInfo.patientId,
                        method:"PUT",
                        headers:headers
                    }
                }
            )
        }
    }
  
  return (
    <div className="app-container">
      <h2>Record PCR & antigen test results</h2>
      <h3>Antigen test results</h3>
      <form onClick={update}>
        {/* <input
          error={errors.patientId ? true:false}
          id="patient-id"
          label="Patient ID"   
          name="patientId"                        
          fullWidth
          value={id}
          variant="outlined"
          placeholder="Patient ID"
          onChange={handleUpadte}
          margin="normal"
          helperText={errors.patientId ? errors.patientId : null}
        /> */}
        {/* <input
          error={errors.hospital_id ? true:false}
          id="hospital-id"
          label="Hospital ID"   
          name="hospital_id"                        
          fullWidth
          value={antigenInfo.hospital_id}
          placeholder="Hospital ID"
          variant="outlined"
          margin="normal"
          onChange={handleUpadte}
          helperText={errors.hospital_id ? errors.hospital_id : null}
        /> */}
        <input
          error={errors.test_data ? true:false}
          id="test-data"
          label="Test date"   
          name="test_data"                        
          fullWidth
          type="date"
          variant="outlined"
          value={formatDate(antigenInfo.test_data)}
          format="MM/dd/yyyy"
          margin="normal"
          
          helperText={errors.test_data ? errors.test_data : null}
        />
        <select
          onChange={handleUpadte}
          label="Test result"
          value={antigenInfo.test_result}
          name="test_result">
          <option value="select">--Enter result--</option>
          <option value="Pending">Pending</option>
          <option value="Positive">Positive</option> 
          <option value="Negative">Negative</option>
        </select>
        <button 
          style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center", marginLeft:"20px"}}
          onClick={update}
        >
          Update antigen test record
        </button>
      </form>

      {/* <h3>Add a test record</h3>
      <p>Patient ID:{id} , Hospital ID:{hospitalInfo.hospital_id}</p>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {syncMessage}
          </Alert>
      </Snackbar>
      <form >
        <input
          error={errors.patientId ? true:false}
          id="patient-id"
          label="Patient ID"   
          name="patientId"                        
          fullWidth
          variant="outlined"
          required
          placeholder="Patient ID"
          onChange={handleChange}
          margin="normal"
          helperText={errors.patientId ? errors.patientId : null}
        />
        <input
          error={errors.hospital_id ? true:false}
          id="hospital-id"
          label="Hospital ID"   
          name="hospital_id"                        
          fullWidth
          placeholder="Hospital ID"
          variant="outlined"
          required
          margin="normal"
          onChange={handleChange}
          helperText={errors.hospital_id ? errors.hospital_id : null}
        />
        <input
          error={errors.test_data ? true:false}
          id="test-data"
          label="Test date"   
          name="test_data"                        
          fullWidth
          type="date"
          variant="outlined"
          required
          format="MM/dd/yyyy"
          margin="normal"
          onChange={handleChange}
          helperText={errors.test_data ? errors.test_data : null}
        />
        <select
          required="required"
          onChange={handleChange}
          label="Test result"
          name="test_result">
          <option value="select">--Enter result--</option>
          <option value="Pending">Pending</option>
          <option value="Positive">Positive</option> 
          <option value="Negative">Negative</option>
        </select>
        <button 
          style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}
          onClick={submitPCR}
        >
          Add PCR test record
        </button>
        <button 
          style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center", marginLeft:"20px"}}
          onClick={submitAntigen}
        >
          Add antigen test record
        </button>

        {reqSuccess && <Alert onClose={handleAlertClose} severity="success">Hospital Details upadated</Alert>}

        <hr className="hr" />
      </form> */}
    </div>
  );
};

export default TestResult;
