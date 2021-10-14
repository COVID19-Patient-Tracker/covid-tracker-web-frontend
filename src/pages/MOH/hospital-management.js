import React from 'react';
import { useState } from "react";
import { useTheme } from '@material-ui/core/styles';

import { Box, TextField, Button, AppBar, Tabs, Tab, makeStyles} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import PropTypes from 'prop-types'; 

function TabPanel1(props) {
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
                        />
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                        />
                        <TextField
                            id="telephone"
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            type="text"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
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
                    </form>
                </Box>
            )}
        </div>
    );
}

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
                            helperText="*Enter hospital name here"
                            autoFocus
                        />
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            style={{
                                borderRadius: "50px",
                                margin: "10px",
                                fontSize: "15px",
                                color: "rgb(255, 255, 255)",
                                backgroundColor:'#0b99d1'
                            }}
                        >
                            REMOVE HOSPITAL
                        </Button>
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