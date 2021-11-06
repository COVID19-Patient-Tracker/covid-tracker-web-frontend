import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "../../../../components/css/table.css"
import data from "./mock-data-hos.json";
import ReadOnlyRow from "../../../../components/tablerows/ReadOnlyRowHos";
import EditableRow from "../../../../components/tablerows/EditableRowHos";
import { getRequest, postRequest } from "../../../../api/utils";
import * as routes from "../../../../shared/BackendRoutes"
import {useParams} from 'react-router-dom'
import store from "../../../../store";
import { useAuth } from "../../../../components/AuthConext";
const HospitalTransfer = () => {
  const [results, setresults] = useState(data);
  const {id} = useParams()
  const auth = useAuth();
  const [isOnline,setIsOnline] = useState(true);
  const [reqSuccess,setReqSuccess] = useState(false);
  const [currentHospital,setcurrentHospital] = useState([])
  const [errors,setErrors] = useState({}); // errors in inputs
  const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
  const [currentWard,setcurrentWard] = useState([])
  const [wards, setWards] = useState([]);      
    const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details

  const [Hospitals,setHospitals] = useState([]);
 // const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
  const [syncMessage, setSynceMessage] = useState(null);
  const [open, setOpen] = useState(false);

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
      setresults(
          {
              ...results, 
              [e.target.name]:e.target.value
          })
        e.preventDefault();
        setcurrentHospital(
          {
              ...currentHospital, 
              [e.target.name]:e.target.value
          })
        
    }
    // handling updates
    const handleResult= (e) => {
        e.preventDefault();
        setresults(
          {
              ...results, 
              [e.target.name]:e.target.value
          })
        
    }
    // get all hospitals
    useEffect(() => {
      getRequest(routes.GET_ALL_HOSPITALS_URL,headers)
        .then((response => {
          if(response.data) {
              setErrors({})
              setHospitals(response.data.hospitals);
          }
          if(response.error) setErrors({...response.error.response.data});
        }))
    }, []);

    // get visit history
  useEffect(() => {
    getRequest(routes.GET_CURRENT_STATUS +id , headers)
    .then((response) => {
      if(response.data){
        setcurrentHospital(response.data.histories.hospital)
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
                setresults(response.data.histories)
                console.log(response.data.histories)
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
      //const {item} = currentHospital;
      if(isOnline){
        
        var putData = currentHospital; // submit data
        var putDateOther= results;
        putData.hospital = {"hospital_id":putData.hospital_id}
        console.log(putData)

        // made request to the backend
        postRequest(routes.UPDATE_HOSPITAL_TRANSFER, {putData,putDateOther}, headers)
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
        // TODO : show warning method that it will synced with backend when online
        setSynceMessage("you're offline now. changes you make will automatically sync with database");
        setOpen(true)
        // push to store
        store.dispatch({
          type:"todos/todoAdded",
          payload:{
              inputs:{currentHospital,results},
              url:routes.UPDATE_HOSPITAL_TRANSFER,
              method:"POST",
              headers:headers
            }
          }
        )
      }
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
    console.log(currentHospital)

  return (
    <div className="app-container">
      <h2>Update patient hospital transfer</h2>
      <h3>Transfer history</h3>
      {/* <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Hospital</th>
              <th>Reason</th>
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
      </form> */}

      <h3>Transfer</h3>
      <form>
        <input
          type="text"
          name="patient_id"
          value={results.patient_id}
          required="required"
          placeholder="Enter NIC"
          onChange={handleUpadte}
        />
        <select
          required="required"
          name="hospital_id"
          value={currentHospital.hospital_id}
          onChange={handleUpadte}>
          <option aria-label="None" value="" />
          {Hospitals.map((hospital) => <option value={hospital.hospital_id}>{hospital.name}</option>)}
        </select>
        <input
          type="date"
          name="visit_date"
          value={formatDate(results.visit_date)}
          required="required"
          placeholder="Enter NIC"
          onChange={handleUpadte}
        />
        
        
        <button 
          style={{width:"200px",height:"35px", marginTop:"10px", alignSelf:"center", justifyContent:"center"}}
          onClick={submit}
        >
          Transfer
        </button>


        <hr className="hr" />
      </form>
    </div>
  );
};

export default HospitalTransfer;
