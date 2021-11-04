/* eslint-disable */
import React from 'react';
import { useState, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';

import { Box, TextField, Button, AppBar, Tabs, Tab, makeStyles, FormControl, Select, InputLabel, Snackbar } from '@material-ui/core';
import { Paper, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Alert } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { Table } from 'react-bootstrap';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import AccountProfile from '../../../components/hospital/dashboard/Profile';

import store from '../../../store'
import * as routes from '../../../shared/BackendRoutes'
import { postRequest, getRequest, deleteRequest } from '../../../api/utils';
import { useAuth } from "../../../components/AuthConext"

function TabPanel1(props) {
    const { children, value, index, ...other } = props;
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = { headers: { "Authorization": `${JWTtoken}` } } // headers
    const auth = useAuth();
    const [isOnline, setIsOnline] = useState(true);
    const [inputs, setInputs] = useState(
        {
            first_name: "",
            last_name: "",
            nic: "",
            email: "",
        });
    const [reqSuccess, setReqSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [syncMessage, setSynceMessage] = useState(null);

    useEffect(() => {
        const user_id = {
            "id": auth.currentUser.id,
        }

        // made request to the backend
        getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id, headers)
            .then((response) => {
                console.log(response);
                if (response.data) {
                    setInputs(
                        {
                            ...inputs,
                            hospital_id: response.data.Info.hospital[0].hospital_id
                        })
                }
                else if (response.error) {
                    alert("Hospital data unavailable. Try Again Later..");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])


    const handleChange = (selection) => {
        selection.preventDefault();
        setInputs(
            {
                ...inputs,
                [selection.target.name]: selection.target.value
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(inputs);
        if (isOnline) {
            var user_data = inputs;
            postRequest(routes.ADD_HOSPITAL_USERS, user_data, headers)
                .then((response) => {
                    if (response.data) {
                        setErrors({});
                        setReqSuccess(true)
                    }
                    else if (response.error) {
                        const { error } = response;
                        setErrors({ ...error.response.data });
                        setReqSuccess(false);
                    }
                })
                .catch((e) => {
                    setReqSuccess(false);
                });

        } else {
            setSynceMessage("You're offline now. Changes you make will automatically sync with database");
            setOpen(true)
            store.dispatch({
                type: "todos/todoAdded",
                payload: {
                    inputs: inputs,
                    url: routes.ADD_HOSPITAL_USERS,
                    method: "POST",
                    headers: headers
                }
            });
        }
    };

    // after press submit if user not online push them into todo in store
    useEffect(() => {
        // subscribe for change of react redux store
        const unsubscribe = store.subscribe(() => {
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

    const handleClose = (event, reason) => {
        // when click away set exception  to null
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleAlertClose = () => {
        setReqSuccess(false);
        setErrors({});
        //setInputs({first_name: "", last_name: "", nic: "", email: "",});
    };

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
                                htmlFor="outlined-type"
                                error={errors.role ? true : false}
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
                            id="first-name"
                            label="First Name"
                            name="first_name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                            inputProps={{ minLength: 5, maxLength: 15 }}
                            onChange={handleChange}
                            error={errors.first_name ? true : false}
                            helperText={errors.first_name ? errors.first_name : null}
                        />
                        <TextField
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
                            error={errors.last_name ? true : false}
                            helperText={errors.last_name ? errors.last_name : null}
                        />
                        <TextField
                            id="nic"
                            label="NIC"
                            name="nic"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                            error={errors.nic ? true : false}
                            helperText={errors.nic ? errors.nic : null}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                            error={errors.email ? true : false}
                            helperText={errors.email ? errors.email : null}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{
                                borderRadius: "50px",
                                margin: "10px",
                                fontSize: "15px",
                                color: "rgb(255, 255, 255)",
                            }}
                            startIcon={<SaveIcon />}
                            onClick={handleSubmit}
                        >
                            SAVE USER
                        </Button>
                        {reqSuccess && <Alert onClose={handleAlertClose} severity="success">User added Successfully.</Alert>}
                        {
                            (errors.exception && errors.exception === "user already exists in db") && reqSuccess === false
                                ? <Alert onClose={handleAlertClose} severity="error">User already exists</Alert>
                                : null
                        }
                    </form>
                </Box>
            )}
        </div>
    );
};

function TabPanel2(props) {
    const { children, value, index, ...other } = props;
    const JWTtoken = localStorage.getItem('CPT-jwt-token');
    const headers = { headers: { "Authorization": `${JWTtoken}` } }
    const auth = useAuth();
    const [hospitalID, setHospitalID] = useState('');
    const [role, setRole] = useState("HOSPITAL_ADMIN");
    const [reqSuccess, setReqSuccess] = useState(false);
    const [errors, setErrors] = useState(''); // errors in inputs
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user_id = {
            "id": auth.currentUser.id,
        }
        getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id, headers)
            .then((response) => {
                console.log(response);
                if (response.data) {
                    setHospitalID(response.data.Info.hospital[0].hospital_id);
                }
                else if (response.error) {
                    alert("Hospital data unavailable. Try Again Later..");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleGetAllUsers = (e) => {
        e.preventDefault();
        const get_url = `${routes.GET_ALL_HOSPITAL_USERS_BY_ROLE}/${hospitalID}/role/${role}/all`
        getRequest(get_url, headers)
            .then((response) => {
                if (response.data) {
                    const { data } = response
                    setUsers(data.UserData)
                    console.log(data.UserData)
                    setErrors({});
                    setReqSuccess(true)
                }
                else if (response.error) {
                    const { error } = response
                    setErrors({ ...error.response.data }) // set errors of inputs and show
                    setReqSuccess(false)
                }
            })
            .catch((e) => {
                setReqSuccess(false)
            });
    };



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
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel
                            >
                                User Type
                            </InputLabel>
                            <Select autoFocus
                                native
                                label="User Type"
                                name="role"
                                onChange={(event) => { setRole(event.target.value) }}
                            >
                                <option selected value="HOSPITAL_ADMIN">HOSPITAL ADMIN</option>
                                <option value="HOSPITAL_USER">HOSPITAL USER</option>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            startIcon={<SearchIcon />}
                            color="primary"
                            onClick={handleGetAllUsers}
                            style={{
                                borderRadius: "50px",
                                margin: "10px",
                                fontSize: "15px",
                                color: "rgb(255, 255, 255)",
                            }}
                        >
                            GET ALL USERS
                        </Button>
                        <br></br>
                        <TableContainer component={Paper} style={{ textAlign: '-webkit-center' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>USER ID</TableCell>
                                        <TableCell align="right">EMAIL</TableCell>
                                        <TableCell align="right">FIRST NAME</TableCell>
                                        <TableCell align="right">LAST NAME</TableCell>
                                        <TableCell align="right">NIC</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users && users.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.user_id}
                                            </TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.first_name}</TableCell>
                                            <TableCell align="right">{row.last_name}</TableCell>
                                            <TableCell align="right">{row.nic}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </form>
                    {
                        errors.exception && reqSuccess === false
                            ? <Alert onClose={setErrors({})} severity="error">Error Occured. Try Again Later</Alert>
                            : null
                    }
                </Box>
            )}
        </div>
    );
}

function TabPanel3(props) {
    const { children, value, index, ...other } = props;
    const JWTtoken = localStorage.getItem('CPT-jwt-token');
    const headers = { headers: { "Authorization": `${JWTtoken}` } }
    const auth = useAuth();
    const [hospitalID, setHospitalID] = useState('');
    const [nic, setNic] = useState("");
    const [userID, setUserID] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isValid, setisValid] = useState(true);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isOnline, setIsOnline] = useState(true);
    const [reqSuccess, setReqSuccess] = useState(false);
    const [errors, setErrors] = useState(''); // errors in inputs
    const [open, setOpen] = React.useState(false);
    const [syncMessage, setSynceMessage] = React.useState(null);

    useEffect(() => {
        const user_id = {
            "id": auth.currentUser.id,
        }
        // made request to the backend
        getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id, headers)
            .then((response) => {
                console.log(response);
                if (response.data) {
                    setHospitalID(response.data.Info.hospital[0].hospital_id);
                }
                else if (response.error) {
                    alert("Hospital data unavailable. Try Again Later..");
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, [])


    const searchByNic = (e) => {
        const get_url = `${routes.GET_USER_BY_NIC}/${hospitalID}/nic/${nic}`;
        getRequest(get_url, headers)
            .then((response) => {

                if (response.error) {
                    setIsError(true);
                    const err_code = response.error.response.data.status;
                    if (err_code === 404) {
                        setMessage("User Not Found");
                    } else if (err_code === 401) {
                        setMessage("User detail exception");
                    } else {
                        setMessage("Error occured. Try again later!");
                    }
                };
                if (response.data.status === 200) {
                    setUserInfo(response.data.userInfo);
                    setUserID(response.data.userInfo.user_id);
                    setIsError(false);
                    setIsCompleted(true);
                }
            })
            .catch((err) => {
                setIsError(true);
            });
    };

    const handleCloseView = () => {
        setIsCompleted(false);
        console.log(errors);
    };

    const deleteUserById = () => {

        if (isOnline) {
            // made request to the backend
            deleteRequest(routes.DELETE_USERS_BY_ID + userID, headers)
                .then((response) => {
                    if (response.data) {
                        setErrors('');
                        setReqSuccess(true);
                        setIsCompleted(false);
                    }
                    else if (response.error) {
                        console.log(response.error.response)
                        const { error } = response
                        setErrors(error.response.data.status) // set errors of inputs and show
                        setReqSuccess(false)
                    }
                })
                .catch((e) => {
                    setReqSuccess(false)
                });

        } else {
            // TODO : show warning method that it will synced with backend when online
            setSynceMessage("you're offline now. changes you make will automatically sync with database");
            setOpen(true)
        }
    };

    // for snack bar
    const handleClose = (event, reason) => {
        // when click away set exception  to null
        setIsOnline(true)
        if (reason === 'clickaway') {
            return;
        }
        setReqSuccess(reqSuccess)
        setOpen(false);
    };

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
                        <TextField
                            id="nic"
                            label="NIC"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            inputProps={{ minLength: 5, maxLength: 11 }}
                            onChange={(event) => {
                                setIsCompleted(false);
                                if (event.target.value !== "") {
                                    setisValid(true)
                                    setNic(event.target.value);
                                } else {
                                    setisValid(false);
                                }
                            }}
                            error={!isValid}
                            helperText={!isValid ? "*Invalid NIC." : "**Enter your NIC here"}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DeleteIcon />}
                            style={{
                                borderRadius: "50px",
                                margin: "10px",
                                fontSize: "15px",
                                color: "rgb(255, 255, 255)",
                            }}
                            onClick={searchByNic}
                        >
                            REMOVE USER
                        </Button>
                    </form>
                    {isError && <Alert onClose={() => { setIsError(false); }} severity="error">{message}</Alert>}
                    {isCompleted && <AccountProfile userData={userInfo} closeFunction={handleCloseView} deleteFunction={deleteUserById} />}
                    {reqSuccess && <Alert onClose={() => { setReqSuccess(false); setIsCompleted(false); }} severity="info">Deleted Successfully.</Alert>}
                    {
                        errors.status && reqSuccess === false
                            ? <Alert onClose={setErrors({})} severity="error">Error Occured. Try Again Later</Alert>
                            : null
                    }
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    <Tab label="Search" icon={<SearchIcon />} {...a11yProps(1)} />
                    <Tab label="Remove" icon={<PersonAddDisabledIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel1 value={value} index={0} dir={theme.direction}></TabPanel1>

                <TabPanel2 value={value} index={1} dir={theme.direction}></TabPanel2>

                <TabPanel3 value={value} index={2} dir={theme.direction}></TabPanel3>
            </SwipeableViews>
        </Box>
    );
}