import React from 'react';

import { makeStyles, Typography, Grid, Box } from "@material-ui/core";

import MediaCard from '../../components/hospital/dashboard/NewsCard';
import { HeaderContentNews } from '../../components/HeaderContent';
import background from '../../components/img/background.svg';
import '../../components/css/guideline.css';
import { dummynews } from './news-data';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        textAlign:"-webkit-center",
    },
}));

export default function WebNews() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <HeaderContentNews />
            <div>
                <img src={background} alt='' style={{ backgroundPositionY: "100%", backgroundSize: 'cover', width: "100%", backgroundRepeat: 'no-repeat' }} />
            </div>
            <Box p={{ xs: 0, sm: 7 }} m={{ xs: 2, sm: 3 }}>
                <Typography variant="h4" align="center" style={{ fontWeight: 700 }} gutterBottom>COVID-19 FEATURED NEWS</Typography>
                <Typography variant="body1" align="center" gutterBottom>Stay up to date and be informed with all things
                    COVID related right here. From the latest stats of confirmed positive cases to government updates
                    on newly imposed rules and regulations in Sri Lanka, find out more with the featured news updates
                    below.
                </Typography>

                <Grid container spacing={3} className={classes.container}>
                    {dummynews.map((newes) => {
                        return (
                            <Grid item xs={12} md={4}>
                                <MediaCard
                                    newsdata={newes}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
            <br /><br /><br /><br /><br />
        </React.Fragment>
    );

}
