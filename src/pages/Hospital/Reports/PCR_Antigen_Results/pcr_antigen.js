import React, { useState, useEffect } from "react";
import '../../../../components/css/table.css';
import { useAuth } from "../../../../components/AuthConext";
import { getRequest, postRequest} from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes'
import {useParams} from 'react-router-dom'
import store from "../../../../store";
import {Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';

const TestResult = () => {
  const {id} = useParams()
  const auth = useAuth();
  const [isOnline,setIsOnline] = useState(true);
  const [inputs,setInputs] = useState({});
  const [reqSuccessGet,setReqSuccessGet] = useState(false);
  const [reqSuccess,setReqSuccess] = useState(false);
  const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const [errors,setErrors] = useState({}); // errors in inputs
  const [open, setOpen] = React.useState(false);
  const [syncMessage, setSynceMessage] = React.useState(null);
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
  const history = useHistory();
  const handleClickAntigen = (id) => history.push(`/hospital/user/testResult/updateAntigen/${id}`);
  const handleClickPCR = (id) => history.push(`/hospital/user/testResult/updatePCR/${id}`);

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
    getRequest(routes.GETHOSPITALUSERDETAILS +user_id.id , headers)
      .then((response) => {
        if(response.data){
          sethospitalInfo(response.data.Info.hospital[0])
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

  //add antigen test result
  const submitAntigen = (e) => {
        
    e.preventDefault();

    if(isOnline){

      var putData = inputs; // submit data

      // made request to the backend
      postRequest(routes.ADD_ANTIGEN_TEST, putData, headers)
        .then((response) => {
          if(response.data){
            console.log(response.data)
            setErrors({});
            setReqSuccess(true)
          }
          else if(response.error){
            const {error,headers} = response
            setErrors({...error.response.data}) // set errors of inputs and show
            setReqSuccess(false)
            alert("Pleae enter details correctly")
          }
        })
        .catch((e) => {
            setReqSuccess(false)
        });

    }else{
      // TODO : show warning method that it will synced with backend when online
      setSynceMessage("you're offline now. changes you make will automatically sync with database");
      setOpen(true)
      // push to store
      store.dispatch({
        type:"todos/todoAdded",
        payload:{
            inputs:inputs,
            url:routes.ADD_PCR_TEST,
            method:"POST",
            headers:headers
          }
        }
      )
    }
  }
    
  //add pcr test result
  const submitPCR = (e) => {
        
    e.preventDefault();

    if(isOnline){

      var putData = inputs; // submit data

      // made request to the backend
      postRequest(routes.ADD_PCR_TEST, putData, headers)
        .then((response) => {
          if(response.data){
            const {data,headers} = response
            setErrors({});
            setReqSuccess(true)
          }
          else if(response.error){
            const {error,headers} = response
            setErrors({...error.response.data}) // set errors of inputs and show
            setReqSuccess(false)
            alert("Pleae enter details correctly")
          }
        })
        .catch((e) => {
            setReqSuccess(false)
        });

    }else{
      // TODO : show warning method that it will synced with backend when online
      setSynceMessage("you're offline now. changes you make will automatically sync with database");
      setOpen(true)
      // push to store
      store.dispatch({
        type:"todos/todoAdded",
        payload:{
            inputs:inputs,
            url:routes.ADD_PCR_TEST,
            method:"POST",
            headers:headers
          }
        }
      )
    }
  } 
  
  return (
    <div className="app-container">
      <h2>Record PCR & antigen test results</h2>
      <h3>Add a test record</h3>
      <p>Patient ID:{id} , Hospital ID:{hospitalInfo.hospital_id}</p>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {syncMessage}
          </Alert>
      </Snackbar>
      <form >
        <label>Patient ID</label>
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
        <label>Hospital ID</label>
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
        <label>Testing date</label>
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
        <label>Tested result</label>
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
        <br/><br/>
        <button 
          style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center",  backgroundColor:"#05afa7"}}
          onClick={()=>handleClickPCR(id)}
        >
          Update PCR test record
        </button>
        <button 
          style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center", marginLeft:"20px",backgroundColor:"#05afa7"}}
          onClick={()=>handleClickAntigen(id)}
        >
          Update antigen test record
        </button>
        

        {reqSuccess && <Alert onClose={handleAlertClose} severity="success">Test record created</Alert>}

        <hr className="hr" />
         {/* <button style={{width:"200px",height:"35px", marginTop:"10px"}}>Update</button> */}
      </form>
    </div>
  );
};

export default TestResult;
