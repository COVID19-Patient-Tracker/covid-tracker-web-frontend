import React from 'react';

import { FormControl, FormHelperText, InputLabel, makeStyles, Menu, MenuItem, Select } from "@material-ui/core";
import { Box, Grid, Container, Typography, Card, CardHeader, TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    cardStyle: {
        backgroundColor: "#e9e2f1",
    },
    formStyle: {
        //backgroundColor: "#e9e2f1",
    },
    textAlign:{
        textAlign:"left"
    }
}));

export default function UserManagement() {

    const classes = useStyles();
    const [usertype, setUserType] = React.useState('');

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={5}>
                    <Card className={classes.cardStyle} variant="outlined">
                        <CardHeader title="Add User" subheader="Add new users to the system" />
                        <Box p={2} textAlign="center" >
                            <form autoComplete="off">
                                <FormControl fullWidth variant="outlined" className={classes.textAlign}>
                                <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={usertype}
                                        onChange={handleChange}
                                        label="usertype"
                                    >
                                        <MenuItem value="ADMIN">Admin</MenuItem>
                                        <MenuItem value="USER">User</MenuItem>
                                    </Select>
                                    <FormHelperText>Required</FormHelperText>
                                </FormControl>
                                <TextField
                                    id="first-name"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="last-name"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="nic"
                                    label="NIC"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
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
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Card>
                        <CardHeader title="User Details" subheader="Check the user details from here" />
                        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                            <h1>HI</h1>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <Card>
                        <CardHeader title="Remove User" subheader="Remove users from the system" />
                        <Box p={2} textAlign="center" >
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
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DeleteIcon />}
                                >
                                    REMOVE USER
                                </Button>
                            </form>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
