import React, { useState, useEffect, useRef } from "react";
import '../../../../components/css/table.css';
import '../../../../components/css/forms.css';
import { getRequest, putRequest } from "../../../../api/utils";
import * as routes from '../../../../shared/BackendRoutes'
import {useParams} from 'react-router-dom'
import store from "../../../../store";
import {Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import {Card } from '@material-ui/core';

const TestResult = () => {
  const {id} = useParams()
  const [isOnline,setIsOnline] = useState(true);
  const [reqSuccessGet,setReqSuccessGet] = useState(false);
  const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
  const [pcrInfo,setpcrInfo] = useState([])
  const [errors,setErrors] = useState({}); // errors in inputs
  const [open, setOpen] = React.useState(false);
  const [syncMessage, setSynceMessage] = React.useState(null);
  const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
  const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
  const prevDetailsRef = useRef();

    //check whether details are changed or not
    useEffect(() => {
        prevDetailsRef.current = pcrInfo;
    });
    const prevDetails = prevDetailsRef.current;


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
      setpcrInfo(
          {
              ...pcrInfo, 
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
      setReqSuccessUpdate(false);
      setErrors({});
  };
      
  useEffect(() => {

    getRequest(routes.GET_PCR_TEST +id , headers)
      .then((response) => {
        if(response.data){
          setpcrInfo(response.data.TestData[(response.data.TestData).length-1])
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

  //update antigen report
    const update = (e) => {
        
        e.preventDefault();

        if(isOnline){
            if(pcrInfo != prevDetails){

                var putData = pcrInfo; 

                // made request to the backend
                putRequest(routes.UPDATE_PCR_TEST + pcrInfo.id, putData, headers)
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
                        inputs:pcrInfo,
                        url:routes.UPDATE_PCR_TEST +pcrInfo.patientId,
                        method:"PUT",
                        headers:headers
                    }
                }
            )
        }
    }
    if(pcrInfo!=undefined){
        return (
            <div className="create" style={{ margin:"150px auto"}} >
                <Card variant="outlined" >
                <h2>Update PCR test results</h2>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {syncMessage}
                        </Alert>
                    </Snackbar>
                    <form style={{marginLeft:"20px",marginRight:"20px"}}>
                        <label>Tested date</label>
                        <input
                        error={errors.test_data ? true:false}
                        id="test-data"
                        label="Test date"   
                        name="test_data"                        
                        fullWidth
                        type="date"
                        variant="outlined"
                        value={formatDate(pcrInfo.test_data)}
                        format="MM/dd/yyyy"
                        margin="normal"
                        helperText={errors.test_data ? errors.test_data : null}
                        />
                        <label>Test result</label>
                        <select
                        onChange={handleUpadte}
                        label="Test result"
                        value={pcrInfo.test_result}
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
                        {reqSuccessUpdate && <Alert onClose={handleAlertClose} severity="success">PCR test results updated</Alert>}

                        <br/><br/>
                    </form>
                    
                </Card>
            </div>
        );
    }else{
        return (
            <div className="create" style={{ margin:"150px auto"}} >
                <Card variant="outlined" >
                <h2>Update PCR test results</h2>
                <h3>There are no previous PCR test records</h3>
                    
                </Card>
            </div>
        );
        
    }
  
    
};

export default TestResult;
