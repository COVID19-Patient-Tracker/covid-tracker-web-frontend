import React, { useState, useEffect, useRef } from "react";
import '../../../../components/css/table.css';
import { useAuth } from "../../../../components/AuthConext";
import { getRequest, postRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes'
import {useParams} from 'react-router-dom'
import store from "../../../../store";
import {Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';

const WardTransfer = () => {
  const {id} = useParams()
  const auth = useAuth();
  const [isOnline,setIsOnline] = useState(true);
  const [reqSuccess,setReqSuccess] = useState(false);
  const [errors,setErrors] = useState({}); // errors in inputs
  const [wards, setWards] = useState([]);      
  const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
  const [currentWard,setcurrentWard] = useState([])
  const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
  const [syncMessage, setSynceMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const prevDetailsRef = useRef();

  //check whether details are changed or not
  useEffect(() => {
      prevDetailsRef.current = currentWard;
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
    const handleUpadte= (e) => {
        e.preventDefault();
        setcurrentWard(
          {
              ...currentWard, 
              [e.target.name]:e.target.value
          })
    }


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
          getRequest(routes.GET_WARDS_BY_HOSPITAL_ID + response.data.Info.hospital[0].hospital_id,headers)
            .then((response) => {
              if(response.data){
                setWards(response.data.wards);
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

  // get visit history
  useEffect(() => {

        getRequest(routes.GET_CURRENT_STATUS +id , headers)
        .then((response) => {
            if(response.data){
                setcurrentWard(response.data.histories)
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
   
    //to transfer to another ward
    const submit = (e) => {
        
        e.preventDefault();

        if(isOnline){
          if(currentWard != prevDetails){

            var putData = currentWard; // submit data

            // made request to the backend
            postRequest(routes.UPDATE_WARD_TRANSFER, putData, headers)
              .then((response) => {
                  if(response.data){
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
                alert("You have not made any change")
            }

        }else{
            // TODO : show warning method that it will synced with backend when online
            setSynceMessage("you're offline now. changes you make will automatically sync with database");
            setOpen(true)
            // push to store
            store.dispatch({
                type:"todos/todoAdded",
                payload:{
                        inputs:currentWard,
                        url:routes.UPDATE_WARD_TRANSFER,
                        method:"POST",
                        headers:headers
                    }
                }
            )
        }
    }

  return (
    <div className="app-container">
      <h2>Update patient ward transfer</h2>
      <form >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {syncMessage}
            </Alert>
        </Snackbar>
        <label>Current Ward</label>
        <select
          error={errors.ward_id ? true:false}
          helperText={errors.ward_id ? errors.ward_id : null}
          required="required"
          value={currentWard.ward_id}
          onChange={handleUpadte}
          name="ward_id">
          <option aria-label="None" value="">--Select the ward</option>
          {wards.map((ward) => <option value={ward.ward_id}>{ward.ward_name}</option>)}
        </select>
      <button 
        style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}
        type="submit"
        onClick={submit}
      >Transfer</button>
      {reqSuccessUpdate && <Alert onClose={handleAlertClose} severity="success">Current ward updated</Alert>}

      <hr className="hr" />

      </form>
    </div>
  );
};

export default WardTransfer;
