import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import '../../../../components/css/table.css';
import data from "./mock-data-ward.json";
import ReadOnlyRow from "../../../../components/tablerows/ReadOnlyRowWard";
import EditableRow from "../../../../components/tablerows/EditableRowWard";
import { useAuth } from "../../../../components/AuthConext";
import { getRequest, postRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes'
import {useParams} from 'react-router-dom'
import store from "../../../../store";
import {Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';

const WardTransfer = () => {
  const {id} = useParams()
  const [results, setresults] = useState(data);
  const auth = useAuth();
  const [isOnline,setIsOnline] = useState(true);
  const [patients, setPatients] = useState([]);
  const [reqSuccess,setReqSuccess] = useState(false);
  const [errors,setErrors] = useState({}); // errors in inputs
  const [wards, setWards] = useState([]);
  const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
  const [syncMessage, setSynceMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs,setInputs] = useState({}); 

  const [addFormData, setAddFormData] = useState({
    NIC: "",
    ward: "",
  });

  const [editFormData, setEditFormData] = useState({
    NIC: "",
    ward: "",
  });
const [editnewresultId, setEditnewresultId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newnewresult = {
      id: nanoid(),
      NIC: addFormData.NIC,
      ward: addFormData.ward,
    };

    const newresults = [...results, newnewresult];
    setresults(newresults);
  };

const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editednewresult = {
      id: editnewresultId,
      NIC: editFormData.NIC,
      ward: editFormData.ward,
    };
    const newresults = [...results];

    const index = results.findIndex((newresult) => newresult.id === editnewresultId);

    newresults[index] = editednewresult;

    setresults(newresults);
    setEditnewresultId(null);
  };

  // for snack bar
    const handleClose = (event, reason) => {
        // when click away set exception  to null
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

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

    //to transfer to another ward
    const submit = (e) => {
        
        e.preventDefault();

        if(isOnline){

            var putData = inputs; // submit data

            // made request to the backend
            postRequest(routes.ADD_WARD_TRANSFER, putData, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
                        console.log(response)
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
            // push to store
            store.dispatch({
                type:"todos/todoAdded",
                payload:{
                        inputs:inputs,
                        url:routes.HOSPITAL_USER_ADD_PATIENT,
                        method:"POST",
                        headers:headers
                    }
                }
            )
        }
    }
    // handling inputs
    const handleChange = (e) => {
      e.preventDefault();
      setInputs(
        {
            ...inputs, 
            [e.target.name]:e.target.value
        })
    }


  return (
    <div className="app-container">
      <h2>Update patient ward transfer</h2>
      <h3>Transfer history</h3>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Ward</th>
            </tr>
          </thead>
          <tbody>
            {results.map((newresult) => (
              <Fragment>
                {editnewresultId === newresult.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    
                  />
                ) : (
                  <ReadOnlyRow newresult={newresult}/>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h3>Transfer</h3>
      <form >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {syncMessage}
            </Alert>
        </Snackbar>
        <input
          error={errors.patient_id ? true:false}
          helperText={errors.patient_id ? errors.patient_id : null}
          type="text"
          name="patient_id"
          value={patients.patient_id}
          required="required"
          onChange={handleChange}
        />
        <select
          error={errors.ward_id ? true:false}
          helperText={errors.ward_id ? errors.ward_id : null}
          required="required"
          onChange={handleChange}
          name="ward_id">
          <option aria-label="None" value="">--Select the ward</option>
          {wards.map((ward) => <option value={ward.ward_id}>{ward.ward_name}</option>)}
        </select>
      <button 
        style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}
        type="submit"
        onClick={submit}
      >Transfer</button>

      <hr className="hr" />

      </form>
    </div>
  );
};

export default WardTransfer;
