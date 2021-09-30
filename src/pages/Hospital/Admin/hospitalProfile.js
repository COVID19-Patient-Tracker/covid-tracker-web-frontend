import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Grid, Box, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "-webkit-center",
    },
    rootBox: {
        background: 'linear-gradient(45deg, #ccebeb 30%, #4fd2f5 90%)',
    },
    btn: {
        background: 'linear-gradient(45deg, #1c7e98 30%, #1c7e98 90%)',
    },
}));

export default function HospitalProfile() {

    const classes = useStyles();


    return (
        <Box className={classes.root} marginTop={18} >
            <Box p={{ xs: 2 }} m={{ xs: 2, sm: 8 }} minHeight={350} maxWidth={1000} border={2} borderRadius={10}>
                <Grid container >
                    <Grid item xs={12} md={5}>
                        <Box className={classes.rootBox} minHeight={400} p={{ xs: 1, sm: 5 }}>
                            <img alt="hospi" src="/assets/image.png" class="responsive" height={300}></img>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box p={{ xs: 2, sm: 6 }}>
                            <form autoComplete="off">
                                <TextField
                                    id="name"
                                    label="Hospital Name"
                                    fullWidth
                                    margin="normal"
                                    value=" District General Hospital - Colombo"
                                    type="text"
                                    InputProps={{ readOnly: true }}
                                    inputProps={{ minLength: 3, maxLength: 15 }}
                                />
                                <TextField
                                    id="address"
                                    label="Address"
                                    fullWidth
                                    margin="normal"
                                    value=" N0: 101, Colombo South, Colombo"
                                    required
                                    type="text"
                                    InputProps={{ readOnly: true }}
                                    inputProps={{ minLength: 5, maxLength: 15 }}
                                />
                                <TextField
                                    id="nic"
                                    label="Telephone"
                                    fullWidth
                                    margin="normal"
                                    value="011-4576972"
                                    InputProps={{ readOnly: true }}
                                    required
                                />
                                <TextField
                                    id="capacity"
                                    label="Patient Capacity"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    value="2600"
                                    require
                                    InputProps={{ readOnly: true }}
                                />
                                <br></br><br></br>
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    className={classes.btn}
                                    size="small"
                                    color="primary"
                                >
                                    Edit Profile
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
