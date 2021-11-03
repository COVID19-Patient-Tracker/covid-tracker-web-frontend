import React from 'react';
import { useState, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';

import { Box, TextField, Button, AppBar, Tabs, Tab, makeStyles, FormControl, Select, InputLabel, Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import AccountProfile from '../../../components/hospital/dashboard/Profile';

import store from '../../../store'
import * as routes from '../../../shared/BackendRoutes'
import { postRequest, getRequest } from '../../../api/utils';
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
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                            helperText="*Enter user Email here"
                            type="email"
                            autoFocus
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DeleteIcon />}
                        >
                            REMOVE USER
                        </Button>
                    </form>
                </Box>
            )}
        </div>
    );
}

function TabPanel3(props) {
    const { children, value, index, ...other } = props;
    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = { headers: { "Authorization": `${JWTtoken}` } } // headers
    const auth = useAuth();
    const [hospitalID, setHospitalID] = useState('');
    const [nic, setNic] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isValid, setisValid] = useState(true);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

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
                    console.log(err_code);
                    if (err_code === 404) {
                        setMessage("User Not Found");
                    } else if (err_code === 401) {
                        setMessage("User detail exception");
                    } else {
                        setMessage("Error occured. Try again later!");
                    }
                };
                if (response.data.status === 200) {
                    console.log(response.data.userInfo)
                    setUserInfo(response.data.userInfo);
                    setIsError(false);
                    setIsCompleted(true);
                }
            })
            .catch((err) => {
                setIsError(true);
            });
    };

    const handleClose = () => {
        setIsCompleted(false);
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
                            SEARCH
                        </Button>
                    </form>
                    {isError && <Alert onClose={() => { setIsError(false); }} severity="error">{message}</Alert>}
                    {isCompleted && <AccountProfile userData = {userInfo} closeFunction ={handleClose} /> }
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
                <TabPanel1 value={value} index={0} dir={theme.direction}></TabPanel1>

                <TabPanel2 value={value} index={1} dir={theme.direction}></TabPanel2>

                <TabPanel3 value={value} index={2} dir={theme.direction}></TabPanel3>
            </SwipeableViews>
        </Box>
    );
}