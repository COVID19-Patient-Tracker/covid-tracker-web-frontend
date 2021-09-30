import React from 'react'
import { makeStyles } from '@material-ui/styles';

import { Grid, Box, TextField } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    rootBox: {
        background: 'linear-gradient(45deg, #097079 30%, #77aae9 90%)',
    },
}));

export default function HospitalProfile() {

    const classes = useStyles();


    return (
        <Box p={{xs:2, sm:5}} m={{xs:2, sm:8}} minHeight={400} border={2} borderRadius={10}>
            <Grid container maxWidth="lg" >
                <Grid item xs={12} md={6}>
                    <Box className={classes.rootBox} minHeight={400} p={{xs:1, sm:5}}>
                        <img alt="hospi" src="/assets/image.png"
                        height={400}></img>

                    </Box>

                </Grid>
                <Grid item xs={12} md={6}>
                    <Box p={{xs:2, sm:6}}>
                        <form autoComplete="off">
                            <TextField
                                id="first-name"
                                label="Name"
                                //variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                type="text"
                                inputProps={{ minLength: 3, maxLength: 15 }}
                            />
                            <TextField
                                id="last-name"
                                label="Address"
                                //variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                type="text"
                                inputProps={{ minLength: 5, maxLength: 15 }}
                            />
                            <TextField
                                id="nic"
                                label="Telephone"
                                //variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                id="email"
                                label="Patient Capacity"
                                type="email"
                                //variant="outlined"
                                fullWidth
                                margin="normal"
                                require
                            />
                        </form>
                    </Box>

                </Grid>

            </Grid>

        </Box>
    )
}
