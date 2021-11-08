import React from 'react';
import { useState, useEffect } from 'react';
import 'date-fns';
import {FormControl,makeStyles,  Box, Card, CardHeader, TextField, Button ,InputLabel, MenuItem, Select,Snackbar } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import '../../components/css/home.css'
import * as routes from '../../shared/BackendRoutes'
import { postRequest, getRequest } from '../../api/utils';
import { Alert } from '@mui/material';
import store from '../../store'
import { useAuth } from '../../components/AuthConext';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    cardStyle: {
        //backgroundColor: "#e9e2f1",
    },
    formStyle: {
        //backgroundColor: "#e9e2f1",
    },
    textAlign: {
        textAlign: "left"
    }
}));

export default function UserManagement() {

    const classes = useStyles();
    const [isOnline,setIsOnline] = useState(true);
    const [inputs,setInputs] = useState({ 
        address:"", 
        first_name:"",
        last_name:"",
        nic:"",
        //dob:"",
        age:"",
        contact_no:"",
        visit_status:'',
        data:""
    }); 
    const [reqSuccess,setReqSuccess] = useState(false);
    const [reqAddSuccess,setReqAddSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [syncMessage, setSynceMessage] = React.useState(null);
    const [Hospitals,setHospitals] = useState([]);
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers
    const auth = useAuth();
    const [wards, setWards] = useState([]);
    const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
  
  
    // for snack bar
    const handleClose = (event, reason) => {
        // when click away set exception  to null
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    //close alert
    const handleAlertClose = () => {
      setReqAddSuccess(false);
      setErrors({});
    };

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
    }, [])

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
        setInputs(
            {
                ...inputs, 
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

    const submit = (e) => {
        
        e.preventDefault();

        if(isOnline){

            var putData = inputs; // submit data

            // made request to the backend
            postRequest(routes.HOSPITAL_USER_ADD_PATIENT, putData, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
                        setErrors({});
                        setReqAddSuccess(true)
                    }
                    else if(response.error){
                        const {error,headers} = response
                        setErrors({...error.response.data}) // set errors of inputs and show
                        setReqAddSuccess(false)
                    }
                })
                .catch((e) => {
                    setReqAddSuccess(false)
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

    // const handleDateChange = (date) => {
    //     console.log(date);
    //     setSelectedDate(date);
    // };

    // const handleChange = (event) => {
    //     setUserType(event.target.value);
    // };
    // const handleGenderChange = (event) => {
    //     setUserGenderType(event.target.value);
    // };
    return (
        

        <div className='addpatient'>
            
                        
           
            <Card className={classes.cardStyle} variant="outlined" >
                <CardHeader title="Add Patient" subheader="Add new patient to the system" />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {syncMessage}
                            </Alert>
                        </Snackbar>
                <Box p={2} textAlign="center" >
                    <form autoComplete="off">
                        <TextField
                            error={errors.first_name ? true:false}
                            id="first-name"
                            label="First Name"   
                            name="first_name"                        
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={handleChange}
                            helperText={errors.first_name ? errors.first_name : null}
                        />
                        <TextField
                            error={errors.last_name ? true:false}
                            helperText={errors.last_name ? errors.last_name : null}
                            id="last-name"
                            label="Last Name"
                            name="last_name"
                            fullWidth
                            required
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                        />
                        <br/><br/>
                        <TextField
                        
                            id="date"
                            label="Birthday"
                            type="date"
                            name="dob"
                            format="MM/dd/yyyy"
                            error={errors.dob ? true:false}
                            helperText={errors.dob ? errors.dob : null}
                            fullWidth
                            //inputProps={{max:new Date()}}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                error={errors.dob ? true:false}
                                helperText={errors.dob ? errors.dob : null}
                                label="Date of birth"
                                id="dob"
                                name="dob"
                                format="MM/dd/yyyy"
                                fullWidth
                                inputVariant="outlined"
                                required
                                value={selectedDate}
                                maxDate={new Date()}
                                onChange={handleDateChange}
                                onChange={handleChange}
                            /> 
                        </MuiPickersUtilsProvider> */}
                        <TextField
                            error={errors.age ? true:false}
                            helperText={errors.age ? errors.age : null}
                            id="age"
                            label="Age" 
                            name="age"                          
                            fullWidth
                            variant="outlined"
                            InputProps={{ inputProps: { min: 0 } }}
                            type="number"
                            required
                            margin="normal"
                            onChange={handleChange}
                        />
                        <TextField
                            error={errors.nic ? true:false}
                            helperText={errors.nic ? errors.nic : null}
                            id="nic"
                            label="NIC"
                            name="nic"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={handleChange}
                        />
                        <TextField
                            error={errors.contact_no ? true:false}
                            helperText={errors.contact_no ? errors.contact_no : null}
                            id="phonenum"
                            label="Phone number"
                            name="contact_no"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={handleChange}
                        />
                        <TextField
                            error={errors.address ? true:false}
                            helperText={errors.address ? errors.address : null}
                            id="address"
                            label="Address"
                            name="address"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={handleChange}
                        />
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel 
                                error={errors.hospital_id ? true:false} 
                                htmlFor="outlined-type"
                                helperText={errors.hospital_id ? errors.hospital_id : null}
                            >
                                    Hospital
                            </InputLabel>
                            <Select autoFocus
                                native
                                label="User Type"
                                onChange={handleChange}
                                name="hospital_id"
                            >
                                <option aria-label="None" value="" />
                                <option value={hospitalInfo.hospital_id}>{hospitalInfo.name}</option>
                            </Select>
                        </FormControl>
                        <br/><br/>

                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel 
                                error={errors.ward_id ? true:false} 
                                htmlFor="outlined-type"
                                helperText={errors.ward_id ? errors.ward_id : null}
                            >
                                    Ward
                            </InputLabel>
                            <Select autoFocus
                                native
                                label="User Type"
                                onChange={handleChange}
                                name="ward_id"
                            >
                                <option aria-label="None" value="" />
                                {wards.map((ward) => <option value={ward.ward_id}>{ward.ward_name}</option>)}
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl fullWidth required variant="outlined" className={classes.textAlign}>
                            <InputLabel 
                                error={errors.gender ? true:false} 
                                helperText={errors.gender ? errors.gender : null}
                            >
                                Gender
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                label="usertype"
                                name="gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>

                        <FormControl fullWidth required variant="outlined" className={classes.textAlign}>
                            <InputLabel 
                                error={errors.is_child ? true:false} 
                                helperText={errors.is_child ? errors.is_child : null}
                            >
                                Adult or child
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                label="usertype"
                                name="is_child"
                                
                            >
                                <MenuItem value="adult">Adult</MenuItem>
                                <MenuItem value="child">Child</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <FormControl fullWidth required variant="outlined" className={classes.textAlign}>
                            <InputLabel 
                                error={errors.visit_status ? true:false} 
                                helperText={errors.visit_status ? errors.visit_status : null}
                            >
                                Visit status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={handleChange}
                                label="usertype"
                                name="visit_status"                           
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="ADMITTED">Admitted</MenuItem>
                                <MenuItem value="QUARANTINED">Quarantined</MenuItem>
                                <MenuItem value="DISCHARGED">Dischared</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <TextField
                        
                            id="visit_date"
                            label="Visit date"
                            type="date"
                            name="visit_date"
                            format="MM/dd/yyyy"
                            error={errors.visit_date ? true:false}
                            helperText={errors.visit_date ? errors.visit_date : null}
                            fullWidth
                            //inputProps={{max:new Date()}}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                        />

                        <TextField
                            error={errors.data ? true:false}
                            helperText={errors.data ? errors.data : null}
                            id="last-name"
                            label="Other details"
                            name="data"
                            fullWidth
                            required
                            variant="outlined"
                            margin="normal"
                            onChange={handleChange}
                        />
                        <br/><br/>
                        <Button
                            style={{
                                borderRadius: "90px",
                                backgroundColor: "#0b99d1",
                                padding: "10px 20px",
                                color:"rgb(255, 255, 255)",
                                margin: "0 auto",
                                fontSize: "15px"
                            }}
                            type="submit"
                            onClick={submit}
                            variant="contained"
                            startIcon={<SaveIcon />}
                        >SAVE USER
                        </Button>
                        
                        {
                            reqAddSuccess == true
                                ? <Alert severity="success" onClose={handleAlertClose}>Patient added</Alert> 
                                : null
                        }
                        {
                            (errors.exception && errors.exception == "user already exists in db") && reqAddSuccess == false
                                ? <Alert severity="error" onClose={handleAlertClose}>Patient already exists</Alert> 
                                : null
                        }
                    </form>
                </Box>
            </Card>
        </div>
    )
}

