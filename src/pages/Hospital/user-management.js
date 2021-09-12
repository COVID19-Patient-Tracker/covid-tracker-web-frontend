import React from 'react';

import { makeStyles } from "@material-ui/core";
import { Box, Grid, Container, Typography, Card, CardHeader, TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    cardStyle1: {
        backgroundColor: "#efedf5",
    },
    cardStyle2: {
        backgroundColor: "#fbcccc",
    },
    formStyle: {
        backgroundColor: "#0000",
    }
}));

export default function UserManagement() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={5}>
                    <Card className={classes.cardStyle1} variant="outlined">
                        <CardHeader title="Add User" subheader="Add new users to the system" />
                        <Box p={2} textAlign="center" >
                            <form className={classes.formStyle} autoComplete="off">
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
                    <Card className={classes.cardStyle1} variant="outlined">
                        <CardHeader title="User Details" subheader="Check the user details from here" />
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
                                        SEARCH
                                    </Button>
                                </form>
                            </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <Card className={classes.cardStyle2} variant="outlined">
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

