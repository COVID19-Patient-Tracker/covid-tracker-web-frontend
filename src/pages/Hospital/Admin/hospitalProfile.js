import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles';
import { useAuth } from '../../../components/AuthConext';
import { Grid, Box, TextField, Button, Snackbar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import * as routes from '../../../shared/BackendRoutes'
import { getRequest, postRequest } from '../../../api/utils';
import store from '../../../store';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "-webkit-center",
    },
    rootBox: {
        background: 'linear-gradient(45deg, #ccebeb 30%, #4fd2f5 90%)',
    },
    btn: {
        background: 'linear-gradient(45deg, #1c7e98 30%, #1c7e98 90%)',
    },
}));

export default function HospitalProfile() {

    const classes = useStyles();
    
    const auth = useAuth();
    const [isOnline,setIsOnline] = useState(true);
    const [reqSuccessUpdate,setReqSuccessUpdate] = useState(false);
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = useState(false);
    const [syncMessage, setSynceMessage] = useState(null);
    const [hospitalDetail, sethospital] = useState([]);
    const [hospitalInfo,sethospitalInfo] = useState([]) // includes all hosital details
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}} // headers

    // for snack bar
    const handleClose = (event, reason) => {
        // when click away set exception  to null
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
        
    // get patient by id
    useEffect(() => {
        const user_id = {
            "id":auth.currentUser.id,
        }
   
    // made request to the backend
    getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id,headers)
      .then((response) => {
        if(response.data){
          sethospitalInfo(response.data.Info.hospital[0]);
          getRequest(routes.GET_HOSPITAL_INFO_BY_HOSPITAL_ID + response.data.Info.hospital[0].hospital_id,headers)
            .then((response) => {
              if(response.data){
                sethospital(response.data.Hospital);
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
        sethospital(
            {
                ...hospitalDetail, 
                [e.target.name]:e.target.value
            })
    }

    //update
    const update = (e) => {
        
        e.preventDefault();

        if(isOnline){

            var putData = hospitalDetail; 

            // made request to the backend
            postRequest(routes.UPDATE_HOSPITAL_INFO, putData, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
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
                        inputs:hospitalDetail,
                        url:routes.UPDATE_HOSPITAL_INFO,
                        method:"POST",
                        headers:headers
                    }
                }
            )
        }
    }

    
    return (
        <Box className={classes.root} marginTop={18} >
            <Box p={{ xs: 2 }} m={{ xs: 2, sm: 8 }} minHeight={350} maxWidth={1000} border={2} borderRadius={10}>
                <Grid container >
                    <Grid item xs={12} md={5}>
                        <Box className={classes.rootBox} minHeight={400} p={{ xs: 1, sm: 5 }}>
                            <img alt="hospi" src="/assets/image.png" class="responsive" height={300}></img>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                {syncMessage}
                            </Alert>
                        </Snackbar>
                        <Box p={{ xs: 2, sm: 6 }}>
                            <form autoComplete="off">
                                <TextField
                                    error={errors.name ? true:false}
                                    id="name"
                                    label="Hospital Name"
                                    fullWidth
                                    name="name"
                                    variant="standard"
                                    margin="normal"
                                    value={hospitalDetail.name }
                                    type="text"
                                    required
                                    onChange={handleChange}
                                    InputProps={{ readOnly: false }}
                                    InputLabelProps={{shrink: true,}}
                                    helperText={errors.name ? errors.name : null}
                                />
                                <TextField
                                    error={errors.address ? true:false}
                                    helperText={errors.address ? errors.address : null}
                                    id="address"
                                    label="Address"
                                    fullWidth
                                    margin="normal"
                                    name="address"
                                    value={hospitalDetail.address}
                                    required
                                    type="text"
                                    onChange={handleChange}
                                    InputLabelProps={{shrink: true,}}
                                />
                                <TextField
                                    error={errors.telephone ? true:false}
                                    helperText={errors.telephone ? errors.telephone : null}
                                    id="nic"
                                    label="Telephone"
                                    fullWidth
                                    name="telephone"
                                    onChange={handleChange}
                                    margin="normal"
                                    value={hospitalDetail.telephone}
                                    InputLabelProps={{shrink: true,}}
                                    required
                                />
                                <TextField
                                    error={errors.capacity ? true:false}
                                    helperText={errors.capacity ? errors.capacity : null}
                                    id="capacity"
                                    label="Patient Capacity"
                                    type="number"
                                    name="capacity"
                                    fullWidth
                                    onChange={handleChange}
                                    margin="normal"
                                    value={hospitalDetail.capacity}
                                    required
                                    InputLabelProps={{shrink: true,}}
                                />
                                <br></br><br></br>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    className={classes.btn}
                                    size="small"
                                    color="primary"
                                    type="submit"
                                    onClick={update}
                                >
                                    Edit Profile
                                </Button>
                                {
                                    reqSuccessUpdate == true
                                        ? <Alert severity="success" onClose={handleClose} >Hospital Details upadated</Alert> 
                                        : null
                                }
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
