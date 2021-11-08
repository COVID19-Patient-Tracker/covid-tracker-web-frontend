import React, { useState, useEffect, useRef } from 'react';
import 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "../../../../components/css/forms.css"
import { getRequest, postRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes';
import {useParams} from 'react-router-dom'
import store from '../../../../store';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';

const AdmitRepo =() =>{
    
    const {id} = useParams()
    const [isOnline,setIsOnline] = useState(true);
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = useState(false);
    const [patients, setPatients] = useState([]);
    const [syncMessage, setSynceMessage] = useState(null);
    const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
    const prevDetailsRef = useRef();
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

    //check whether details are changed or not
    useEffect(() => {
        prevDetailsRef.current = patients;
    });
    const prevDetails = prevDetailsRef.current;
    
    
// get patient by id
  useEffect(() => {
      
   if(isOnline){

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

        }else{
            // TODO : show warning method that it will synced with backend when online
            setSynceMessage("you're offline now. changes you make will automatically sync with database");
            setOpen(true)
            
        }
    },[]);

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

    // handling inputs
    const handleChange = (e) => {
        e.preventDefault();
        setPatients(
            {
                ...patients, 
                [e.target.name]:e.target.value
            })
    }

    //update
    const update = (e) => {
        
        e.preventDefault();

        if(isOnline){
            if(patients != prevDetails){
                var putData = patients; 

                // made request to the backend
                postRequest(routes.UPDATE_PATIENT_DETAILS, putData, headers)
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
                            alert("Please enter details correctly")
                        }
                    })
                    .catch((e) => {
                        setReqSuccessUpdate(false)
                    });
                }
            else{
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
                        inputs:patients,
                        url:routes.UPDATE_PATIENT_DETAILS,
                        method:"POST",
                        headers:headers
                    }
                }
            )
        }
    }

    return (
        
        <div style={{ margin:'0px 20px'}}>
            <h2>Update admitted patient details</h2>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {syncMessage}
                </Alert>
            </Snackbar>
            <form >
                
                <label>First name:</label>
                <input 
                    type="text"  
                    value={patients.first_name}
                    required
                    onChange = {handleChange}
                    id="first_name"
                    fullWidth
                    name="first_name"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.first_name ? errors.first_name : null}
                    error={errors.name ? true:false}/>

                <label>Last name:</label>
                <input 
                    type="text"
                    value={patients.last_name}
                    required
                    onChange = {handleChange}
                    id="last_name"
                    fullWidth
                    name="last_name"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.last_name ? errors.last_name : null}
                    error={errors.last_name ? true:false}></input>
                <label>Birthday:</label>
                <input 
                    type="date"
                    value={patients.dob}
                    required
                    onChange = {handleChange}
                    id="dob"
                    fullWidth
                    name="dob"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.dob ? errors.dob : null}
                    error={errors.dob ? true:false}></input>
             
               <label>Age:</label>
                <input type="number" 
                    min="0" 
                    value={patients.age}
                    required
                    onChange = {handleChange}
                    id="age"
                    fullWidth
                    name="age"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.age ? errors.age : null}
                    error={errors.age ? true:false}/>

                <label>NIC:</label>
                <input 
                    type="text"  
                    value={patients.nic}
                    required
                    onChange = {handleChange}
                    id="nic"
                    fullWidth
                    name="nic"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.nic ? errors.nic : null}
                    error={errors.nic ? true:false}/>

                <label>Phone number:</label>
                <input 
                    type="text"
                    value={patients.contact_no}
                    required
                    onChange = {handleChange}
                    id="contact_no"
                    fullWidth
                    name="contact_no"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.contact_no ? errors.contact_no : null}
                    error={errors.contact_no ? true:false}></input>

                <label>Address:</label>
                <input 
                    type="text"
                    value={patients.address}
                    required
                    onChange = {handleChange}
                    id="address"
                    fullWidth
                    name="address"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.address ? errors.address : null}
                    error={errors.address ? true:false}></input>

                <label>Gender:</label>
                <select
                    value={patients.gender}
                    required
                    onChange = {handleChange}
                    id="gender"
                    fullWidth
                    name="gender"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.gender ? errors.gender : null}
                    error={errors.gender ? true:false}>
                    <option value="Select"></option> 
                    <option value="male">Male</option> 
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Adult or child:</label>
                <select
                    value={patients.is_child}
                    required
                    onChange = {handleChange}
                    id="is_child"
                    fullWidth
                    name="is_child"
                    variant="standard"
                    margin="normal"
                    InputLabelProps={{shrink: true,}}
                    helperText={errors.is_child ? errors.is_child : null}
                    error={errors.is_child ? true:false}>
                    <option value="Select"></option> 
                    <option value="adult">Adult</option> 
                    <option value="child">Child</option>
                </select>
                <button 
                    style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}
                    type="submit"
                    onClick={update}
                >
                    Update
                </button>
                {reqSuccessUpdate && <Alert onClose={handleAlertClose} severity="success">Patient details updated</Alert>}

                <hr className="hr" />
            </form>
        </div>
    );
}



export default AdmitRepo;