import React, {useEffect} from 'react';
import { useState } from "react";
import { useTheme } from '@material-ui/core/styles';
import { Box, TextField, Button, AppBar, Tabs, Tab, makeStyles, FormControl,Select, InputLabel,Snackbar,
    TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { Table } from 'react-bootstrap';
import SwipeableViews from 'react-swipeable-views';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import store from '../../../store';
import * as routes from '../../../shared/BackendRoutes'
import AccountProfile from '../../../components/hospital/dashboard/Profile';
import { Alert } from '@mui/material';
import PropTypes from 'prop-types'; 
import {postRequest, getRequest, deleteRequest} from '../../../api/utils'

function TabPanel1(props) {
    const { children, value, index, ...other } = props;
    const [isOnline,setIsOnline] = useState(true);
    const [inputs,setInputs] = useState({
        first_name:"",
        last_name:"",
        nic:"",
        email:""
    }); 
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [syncMessage, setSynceMessage] = React.useState(null);
    const [Hospitals,setHospitals] = useState([]);
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
            console.log("in useEffect of hos-admin-UMngmnt",online)
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
            console.log('click')
            var putData = inputs; // submit data
            // made request to the backend
            postRequest(routes.HOSPITAL_ADMIN_ADD_USER_URL, putData, headers)
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
                        url:routes.HOSPITAL_ADMIN_ADD_USER_URL,
                        method:"POST",
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {syncMessage}
                </Alert>
            </Snackbar>
            {value === index && (
                <Box p={3} bgcolor="#fff">
                    <form autoComplete="off">
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel 
                                error={errors.role ? true:false} 
                                htmlFor="outlined-type"
                                helperText={errors.role ? errors.role : null}
                                >
                                    User Type
                                </InputLabel>
                            <Select autoFocus
                                native
                                label="User Type"
                                onChange={handleChange}
                                name="role"
                            >
                                <option aria-label="None" value="" />
                                <option value="HOSPITAL_ADMIN">HOSPITAL ADMIN</option>
                                <option value="HOSPITAL_USER">HOSPITAL USER</option>
                            </Select>
                        </FormControl>
                        <TextField
                            error={errors.first_name ? true:false}
                            id="first-name"
                            label="First Name"
                            name="first_name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                            inputProps={{ minLength: 3, maxLength: 15 }}
                            onChange={handleChange}
                            helperText={errors.first_name ? errors.first_name : null}
                        />
                        <TextField
                            error={errors.last_name ? true:false}
                            helperText={errors.last_name ? errors.last_name : null}
                            id="last-name"
                            label="Last Name"
                            name="last_name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                            inputProps={{ minLength: 5, maxLength: 15 }}
                            onChange={handleChange}
                        />
                        <FormControl variant="outlined" fullWidth required>
                        <InputLabel 
                            error={errors.role ? true:false} 
                            htmlFor="outlined-type"
                            helperText={errors.role ? errors.role : null}
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
                                {Hospitals.map((hospital) => <option value={hospital.hospital_id}>{hospital.name}</option>)}
                            </Select>
                        </FormControl>
                        <TextField
                            error={errors.nic ? true:false}
                            helperText={errors.nic ? errors.nic : null}
                            id="nic"
                            label="NIC"
                            name="nic"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            error={errors.email ? true:false}
                            helperText={errors.email ? errors.email : null}
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
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
                            SAVE USER
                        </Button>
                        {
                            reqSuccess == true
                                ? <Alert severity="success">user added</Alert> 
                                : null
                        }
                        {
                            (errors.exception && errors.exception == "user already exists in db") && reqSuccess == false
                                ? <Alert severity="error">user already exists</Alert> 
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
    const [inputs,setInputs] = useState({ role:""}); 
    const [reqSuccess,setReqSuccess] = useState(false);
    const [errors,setErrors] = useState({}); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState([]);
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

            // made request to the backend
            getRequest(routes.GET_ALL_USERS_BY_ROLE + inputs.role, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
                        setUsers(data.users)
                        console.log(data.users)
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
    }

    const deleteUserById = (userId) => {
        
        if(isOnline){

            // made request to the backend
            deleteRequest(routes.DELETE_HOSPITAL_USERS_BY_ID + userId, headers)
                .then((response) => {
                    if(response.data){
                        const {data,headers} = response
                        setErrors({});
                        setReqSuccess(true)
                        getRequest(routes.GET_ALL_USERS_BY_ROLE + inputs.role, headers)
                            .then((response) => {
                                if(response.data){
                                    const {data,headers} = response
                                    setUsers(data.users)
                                    console.log(data.users)
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
                <Box p={3} bgcolor="#fff">
                    <form autoComplete="off">
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel 
                                error={errors.role ? true:false} 
                                htmlFor="outlined-type"
                                helperText={errors.role ? errors.role : null}
                            >
                                    User Type
                            </InputLabel>
                            <Select autoFocus
                                native
                                label="User Type"
                                onChange={handleChange}
                                name="role"
                            >
                                <option aria-label="None" value="" />
                                <option value="HOSPITAL_ADMIN">HOSPITAL ADMIN</option>
                                <option value="HOSPITAL_USER">HOSPITAL USER</option>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            onClick={submit}
                            style={{
                                borderRadius: "50px",
                                margin: "10px",
                                fontSize: "15px",
                                color: "rgb(255, 255, 255)",
                                backgroundColor:'#0b99d1'
                            }}
                    >
                        GET ALL USERS
                        </Button>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>USER ID</TableCell>
                                  <TableCell align="right">EMAIL</TableCell>
                                  <TableCell align="right">FIRST NAME</TableCell>
                                  <TableCell align="right">LAST NAME</TableCell>
                                  <TableCell align="right">NIC</TableCell>
                                  <TableCell align="right">DELETE USER</TableCell>
                                  <TableCell align="right"></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {users.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {row.userDetails.user_id}
                                    </TableCell>
                                    <TableCell align="right">{row.userDetails.email}</TableCell>
                                    <TableCell align="right">{row.userDetails.first_name}</TableCell>
                                    <TableCell align="right">{row.userDetails.last_name}</TableCell>
                                    <TableCell align="right">{row.userDetails.nic}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            startIcon={<DeleteIcon />}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if(window.confirm('Are you sure you want to delete user of id ?' + row.userDetails.user_id)){

                                                    deleteUserById(row.userDetails.user_id)
                                                }
                                            }}
                                            style={{
                                                borderRadius: "50px",
                                                margin: "10px",
                                                fontSize: "15px",
                                                color: "rgb(255, 255, 255)",
                                                backgroundColor:'#ff0101'
                                            }}
                                            value={row.userDetails.user_id}
                                        >
                                            Delete
                                        </Button>
                                        </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        {users.map(user => {
                           
                        })}
                    </form>
                </Box>
            )}
        </div>
    );
}

function TabPanel3(props) {
    const { children, value, index, userCard, onShow, onClose, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} bgcolor="#fff">
                    <form autoComplete="off">
                        <TextField
                            id="nic"
                            label="NIC"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            helperText="*Enter user NIC here"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onShow}
                            startIcon={<DeleteIcon />}
                        >
                            SEARCH
                        </Button>
                    </form>
                    {userCard && (
                        <Box m={2}>
                            <AccountProfile />
                        </Box>
                    )}

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
TabPanel3.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    userCard: Boolean,
    onShow: Function,
    onClose: Function,
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
                    backgroundColor="#1299bc"
                >
                    <Tab label="Add" icon={<PersonAddIcon />} {...a11yProps(0)} />
                    <Tab label="Remove" icon={<PersonAddDisabledIcon />} {...a11yProps(1)} />
                    <Tab label="Search" icon={<SearchIcon />} {...a11yProps(2)} />
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
                <TabPanel3 value={value} index={2} dir={theme.direction} userCard={showUser} onShow={handleShowUser}>

                </TabPanel3>
            </SwipeableViews>
        </Box>
    );
}