import React from 'react';

import { FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { Box, Grid, Card, CardHeader, TextField, Button } from '@material-ui/core';
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
                            required
                            margin="normal"
                        />
                        <TextField
                            id="nic"
                            label="NIC"
                            variant="outlined"
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            id="email"
                            label="Email"
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

