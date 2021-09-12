import React from 'react';
import { useState } from "react";

import { makeStyles } from "@material-ui/core";
import { Box, Typography, Fab, TextField, Button, Grid } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    resultCont: {
        padding : theme.spacing(2),
    },
}));

export default function UserManagement() {

    const classes = useStyles();

    const [viewResult, setViewResult] = useState(false);

    const handleViewResult = () => {
        setViewResult(true);
    }

    return (
        <Box p={2}>
            <Typography variant="h5" align="center">Upload X-RAY</Typography>
            <Typography variant="body1" align="center">*Upload a clear image of the patients X-Ray with a good resolution.</Typography>

            <Box textAlign="center" pt={5}>
                <label htmlFor="upload-photo">
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                    />

                    <Fab
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <AddIcon /> Add xray Image
                    </Fab>
                </label>
                <form autoComplete="off">
                    <TextField
                        id="nic"
                        label="NIC"
                        variant="outlined"
                        margin="normal"
                        helperText="*Enter user NIC here"
                    />
                </form>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleViewResult}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
            </Box>
            {viewResult && (
                <Box
                    border={1}
                    borderRadius={6}
                    p={{ xs: 1, sm: 2 }}
                    m={5}
                >
                    <Typography color="error" variant="body2" gutterBottom>The Predicted result will be displayed here..</Typography>
                    <Grid className={classes.resultCont} container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="date"
                                label="Date"
                                value="2021-09-12 13:24:13"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="site-host"
                                label="Patient NIC"
                                value="987654654V"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="site-name"
                                label="Predicted-Result"
                                value="POSITIVE"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}

        </Box>
    )
}

