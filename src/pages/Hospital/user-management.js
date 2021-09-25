import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

function TabPanel1(props) {
    const { children, value, index, userType, onChangeSelect, ...other } = props;

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
                        <FormControl required fullWidth variant="outlined" >
                            <InputLabel id="user-type">User Type</InputLabel>
                            <Select
                                labelId="user-typr-select"
                                id="req-user-type"
                                value={userType}
                                onChange={onChangeSelect}
                            //className={classes.selectEmpty}
                            >
                                <MenuItem value={"admin"}>Hospital Admin</MenuItem>
                                <MenuItem value={"user"}>Hospital User</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            id="nic"
                            label="NIC"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                        >
                            SAVE USER
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
                            startIcon={<DeleteIcon />}
                        >
                            REMOVE USER
                        </Button>
                    </form>
                </Box>
            )
            }
        </div >
    );
}

function TabPanel3(props) {
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
                            //onClick={handleShowUser}
                            startIcon={<SearchIcon />}
                        >
                            SEARCH
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
    userType: String,
    onChangeIndex: Function,

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

export default function UserManagement() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [userT, setUserT] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleChangeSelect = (event) => {
        setUserT(event.target.value);
    };

    return (
        <Box
            p={{ xs: 1, sm: 5 }}
            marginTop={4}
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
                    backgroundColor="#8c9"
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
                <TabPanel1 value={value} index={0} dir={theme.direction} userType={userT} onChange={handleChangeSelect}>
                    Item One
                </TabPanel1>
                <TabPanel2 value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel2>
                <TabPanel3 value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel3>
            </SwipeableViews>
        </Box>
    );
}