import React from 'react';

import { makeStyles, Typography, Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url(/assets/vaccine.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '50vh'
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

}));



export default function Vaccination() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}></div>

            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h6" gutterBottom>COVID-19 DAILY FIGURES</Typography>
                <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

                <Grid container spacing={3} className={classes.container}>
                    {/* First two cards */}
                 
                </Grid>

                <Typography variant="h6" gutterBottom>COVID-19 TOTAL FIGURES</Typography>
                <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

                <Grid container spacing={2} className={classes.container}>
                   

                </Grid>

            </Container>

        </React.Fragment>

    )
}

