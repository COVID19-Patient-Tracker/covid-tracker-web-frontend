import React, { useState, useEffect, useRef } from 'react';
import '../../../../components/css/forms.css';
import {useParams} from 'react-router-dom'
import { getRequest, postRequest } from '../../../../api/utils';
import * as routes from '../../../../shared/BackendRoutes'
import store from '../../../../store';
import { Alert } from '@mui/material';
import {Snackbar } from '@material-ui/core';

const CurrentStatus =() =>{
    const {id} = useParams()
    const [isOnline,setIsOnline] = useState(true);
    const [reqSuccessGet,setReqSuccessGet] = useState(false);
    const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
    const [currentStatus,setcurrentStatus] = useState([])
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = useState(false);
    const [syncMessage, setSynceMessage] = useState(null);
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
    const prevDetailsRef = useRef();

    //check whether details are changed or not
    useEffect(() => {
        prevDetailsRef.current = currentStatus;
    });
    const prevDetails = prevDetailsRef.current;

    //get visit histories
    useEffect(() => {

        getRequest(routes.GET_CURRENT_STATUS +id , headers)
        .then((response) => {
            if(response.data){
                setcurrentStatus(response.data.histories)
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

    // handling updates
    const handleUpadte= (e) => {
        e.preventDefault();
        setcurrentStatus(
            {
                ...currentStatus, 
                [e.target.name]:e.target.value
            })
    }

    const handleAlertClose = () => {
      setReqSuccessUpdate(false);
      setErrors({});
    };

    // for snack bar
    const handleClose = (event, reason) => {
        // when click away set exception  to null
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    //update current status
    const update = (e) => {
        
        e.preventDefault();

        if(isOnline){
            if(currentStatus != prevDetails){

                var putData = currentStatus; 

                // made request to the backend
                postRequest(routes.UPDATE_CURRENT_STATUS, putData, headers)
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
                        inputs:currentStatus,
                        url:routes.UPDATE_CURRENT_STATUS,
                        method:"PUT",
                        headers:headers
                    }
                }
            )
        }
    }

    return (
        <div style={{ margin:'0px 20px'}}>
            <h2>Record patient's current status</h2>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {syncMessage}
                </Alert>
            </Snackbar>
            <form>
                <label>Current status:</label>
                <select
                    onChange={handleUpadte}
                    label="visit status"
                    value={currentStatus.visit_status}
                    name="visit_status">
                    <option value="PENDING">Pending</option>
                    <option value="ADMITTED">Admitted</option>
                    <option value="QUARANTINED">Quarantined</option> 
                    <option value="DISCHARGED">Dischared</option>
                </select>
                
                <button 
                    style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}
                    onClick={update}
                >
                    Save
                </button>
                {reqSuccessUpdate && <Alert onClose={handleAlertClose} severity="success">Visit status updated updated</Alert>}

                <hr className="hr" />
            </form>
        </div>
    );
}



export default CurrentStatus;