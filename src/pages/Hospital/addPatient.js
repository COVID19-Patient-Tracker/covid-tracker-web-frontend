import React from 'react';
import { useState } from 'react';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {FormControl,makeStyles,  Box, Card, CardHeader, TextField, Button ,InputLabel, MenuItem, Select } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { position } from 'dom-helpers';

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
    const [usertype, setUserType] = React.useState('');
    const [usergendertype, setUserGenderType] = React.useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    const handleChange = (event) => {
        setUserType(event.target.value);
    };
    const handleGenderChange = (event) => {
        setUserGenderType(event.target.value);
    };
    return (
         
        <div className={classes.root} style={{width:"800px", margin:"120px auto"}}>
           
            <Card className={classes.cardStyle} variant="outlined" >
                <CardHeader title="Add Patient" subheader="Add new patient to the system" />
                <Box p={2} textAlign="center" >
                    <form autoComplete="off">
                        <TextField
                            id="first-name"
                            label="First Name"                           
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <br/><br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Date of birth"
                                format="dd/MM/yyyy"
                                value={selectedDate}
                                fullWidth
                                inputVariant="outlined"
                                required
                                maxDate={new Date()}
                                onChange={handleDateChange}
                            /> 
                        </MuiPickersUtilsProvider>
                        <TextField
                            id="age"
                            label="Age"                           
                            fullWidth
                            variant="outlined"
                            InputProps={{ inputProps: { min: 0 } }}
                            type="number"
                            required
                            margin="normal"
                        />
                        <TextField
                            id="nic"
                            label="NIC"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        />
                        <TextField
                            id="phonenum"
                            label="Phone number"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        />
                        <TextField
                            id="address"
                            label="Address"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        />
                        <br/><br/>
                        <FormControl fullWidth required variant="outlined" className={classes.textAlign}>
                            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={usergendertype}
                                onChange={handleGenderChange}
                                label="usertype"
                                
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>

                        <FormControl fullWidth required variant="outlined" className={classes.textAlign}>
                            <InputLabel id="demo-simple-select-outlined-label">Adult or child</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={usertype}
                                onChange={handleChange}
                                label="usertype"
                                
                            >
                                <MenuItem value="Adult">Adult</MenuItem>
                                <MenuItem value="Child">Child</MenuItem>
                            </Select>
                        </FormControl>
                        
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
                            variant="contained"
                            startIcon={<SaveIcon />}
                        >SAVE USER
                        </Button>
                    </form>
                </Box>
            </Card>
        </div>
    )
}

