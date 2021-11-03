


/* eslint-disable */
import React from 'react';
import { useState } from "react";
import { useTheme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { Box, TextField, Button, AppBar, Tabs, Tab, makeStyles, Snackbar} from '@material-ui/core';
import { TableContainer, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import SaveIcon from '@material-ui/icons/Save';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import store from '../../store'
import PropTypes from 'prop-types'; import * as routes from '../../shared/BackendRoutes';import { deleteRequest,getRequest,putRequest } from '../../api/utils';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/material';
import { Table } from 'react-bootstrap';
function TabPanel1(props) {
    const { children, value, index, ...other } = props;
    const [isOnline,setIsOnline] = useState(true);
    const [inputs,setInputs] = useState({}); 
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [syncMessage, setSynceMessage] = React.useState(null);
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

    // after press submit if user not online push them into todo in store
    useEffect(() => {
        // subscribe for change of react redux store
        const unsubscribe = store.subscribe(() =>{
            // global states that saved in store
            let globalState = store.getState();
            const online = globalState.onlineStatus;
            console.log("in useEffect of moh-UMngmnt",online)
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

    const submit = (e) => {
        
        e.preventDefault();

        if(isOnline){
            var putData = inputs; // submit data
            // made request to the backend
            putRequest(routes.ADD_HOSPITAL, putData, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
                        setErrors({});
                        setReqSuccess(true)
                    }
                    else if(response.error){
                        const {error,headers} = response
                        console.log(error)
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
                        url:routes.ADD_HOSPITAL,
                        method:"PUT",
                        headers:headers
                    }
                }
            )
        }
    }

    return ( 
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2} bgcolor="#fff">
                    <form autoComplete="off">
                        <TextField
                            id="name"
                            label="Hospital name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                            error={errors.name ? true:false}
                            name="name"
                            inputProps={{ minLength: 3, maxLength: 15 }}
                            onChange={handleChange}
                            helperText={errors.name ? errors.name : null}
                        />
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                            error={errors.address ? true:false}
                            name="address"
                            onChange={handleChange}
                            helperText={errors.address ? errors.address : null}
                        />
                        <TextField
                            error={errors.telephone ? true:false}
                            name="telephone"
                            inputProps={{ minLength: 3, maxLength: 15 }}
                            onChange={handleChange}
                            helperText={errors.telephone ? errors.telephone : null}
                            id="telephone"
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                        />
                        <TextField
                            id="capacity"
                            label="capacity"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                            error={errors.capacity ? true:false}
                            name="capacity"
                            onChange={handleChange}
                            helperText={errors.capacity ? errors.capacity : null}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={submit}
                            style={{
                                borderRadius: "50px",
                                margin: "10px",
                                fontSize: "15px",
                                color: "rgb(255, 255, 255)",
                                backgroundColor:'#0b99d1'
                            }}
                        >
                            SAVE HOSPITAL
                        </Button>
                        {
                            reqSuccess == true
                                ? <Alert severity="success">hospital added</Alert> 
                                : null
                        }
                        {
                            (errors.exception && errors.exception == "hospital already exists in db") && reqSuccess == false
                                ? <Alert severity="error">hospital already exists</Alert> 
                                : null
                        }
                    </form>
                </Box>
            )}
        </div>
    );
}
function TabPanel2(props) {
    
    const { children, value, index, ...other } = props;
    const [isOnline,setIsOnline] = useState(true);
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [hospitals, setHospitals] = React.useState([]);
    const [syncMessage, setSynceMessage] = React.useState(null);
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


    useEffect(() => {
       
        if(isOnline){
            // made request to the backend
            getRequest(routes.GET_ALL_HOSPITALS_URL, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
                        setHospitals(data.hospitals)
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

    const deleteHospitalById = (Id) => {
        
        if(isOnline){

            // made request to the backend
            deleteRequest(routes.DELETE_HOSPITAL + Id, headers)
                .then((response) => {
                    if(response.data){
                        setErrors({});
                        setReqSuccess(true)
                        getRequest(routes.GET_ALL_HOSPITALS_URL, headers)
                            .then((response) => {
                                if(response.data){
                                    const {data,headers} = response
                                    setHospitals(data.hospitals)
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
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {syncMessage}
                </Alert>
            </Snackbar>
                        
            {value === index && (
                <Box p={2} bgcolor="#fff">
                    <form autoComplete="off">
                        
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>ID</TableCell>
                                  <TableCell align="right">NAME</TableCell>
                                  <TableCell align="right">ADDRESS</TableCell>
                                  <TableCell align="right">TELEPHONE</TableCell>
                                  <TableCell align="right">CAPACITY</TableCell>
                                  <TableCell align="right"></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {hospitals.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.hospital_id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.telephone}</TableCell>
                                    <TableCell align="right">{row.capacity}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if(window.confirm('Are you sure you want to delete user of id ?' + row.hospital_id)){

                                                    deleteHospitalById(row.hospital_id)
                                                }
                                            }}
                                            style={{
                                                borderRadius: "50px",
                                                margin: "10px",
                                                fontSize: "15px",
                                                color: "rgb(255, 255, 255)",
                                                backgroundColor:'#ff0101'
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        
                    </form>
                </Box>
            )}
        </div>
    );
}



TabPanel1.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
TabPanel2.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    rootBox: {
        background: 'linear-gradient(45deg, #76c7a9 30%, #4fd2f5 90%)',
    },
}));


export default function UserManagement() {

    const classes = useStyles();

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [showUser, setShowUser] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleShowUser = () => {
        setShowUser(true);
    }
    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (

        <Box
            className={classes.rootBox}
            p={{ xs: 1, sm: 4 }}
            marginTop={18}
            marginBottom={4}
            marginLeft={{ sm: 30, xs: 0 }}
            marginRight={{ sm: 30, xs: 0 }}
            bgcolor="#bcbfc1"
            borderRadius={8}

        >
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="#000"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    style={{
                        backgroundColor:'#0b99d1'
                    }}
                >
                    <Tab label="Add" icon={<PersonAddIcon />} {...a11yProps(0)} />
                    <Tab label="Remove" icon={<PersonAddDisabledIcon />} {...a11yProps(1)} />
                    
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel1 value={value} index={0} dir={theme.direction}>

                </TabPanel1>
                <TabPanel2 value={value} index={1} dir={theme.direction}>

                </TabPanel2>
                
            </SwipeableViews>
        </Box>
    );
}