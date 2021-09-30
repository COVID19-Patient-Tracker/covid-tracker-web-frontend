import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FormControl,makeStyles,  Box, Card, CardHeader, TextField, Button ,InputLabel, MenuItem, Select } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

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
    const [startDate, setStartDate] = useState(null);
    const handleChange = (event) => {
        setUserType(event.target.value);
    };
    return (
        <div className={classes.root} style={{width:"800px", margin:"20px auto"}}>
            <Card className={classes.cardStyle} variant="outlined" >
                <CardHeader title="Add Patient" subheader="Add new patient to the system" />
                <Box p={2} textAlign="center" >
                    <form autoComplete="off">
                        <TextField
                            id="first-name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            id="last-name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                       <DatePicker selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    dateFormat= 'dd/MM/yyyy'
                    maxDate= {new Date()}
                    showYearDropdown
                    scrollableYearDropdown />

                        <TextField
                            id="nic"
                            label="NIC"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            id="phonenum"
                            label="Phone number"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <br/><br/>
                        <FormControl fullWidth variant="outlined" className={classes.textAlign}>
                            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={usertype}
                                onChange={handleChange}
                                label="usertype"
                                required
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br/><br/>

                        <FormControl fullWidth variant="outlined" className={classes.textAlign}>
                            <InputLabel id="demo-simple-select-outlined-label">Adult or child</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={usertype}
                                onChange={handleChange}
                                label="usertype"
                                required
                            >
                                <MenuItem value="Adult">Adult</MenuItem>
                                <MenuItem value="Child">Child</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <br/><br/>
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
            </Card>
                
        </div>
    )
}

