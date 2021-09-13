import React from 'react';

import { makeStyles, Typography, Grid, Box } from "@material-ui/core";

import MediaCard from '../../components/hospital/dashboard/NewsCard';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url(/assets/news.png)',
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



export default function WebNews() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}></div>

            <Box p={2} m={2}>
                <Typography variant="h4" align="center" gutterBottom>COVID-19 DAILY NEWS</Typography>
                <Typography variant="body2" align="center" gutterBottom>Stay up to date and be informed with all things
                    COVID related right here. From the latest stats of confirmed positive cases to government updates
                    on newly imposed rules and regulations in Sri Lanka, find out more with the featured news updates
                    below.
                </Typography>

                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MediaCard />
                    </Grid>
                </Grid>
            </Box>

        </React.Fragment>

    )
}
