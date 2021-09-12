import React from 'react';

import { makeStyles, Typography, Grid, Container } from "@material-ui/core";

import SummaryCard from '../../components/hospital/dashboard/SummaryCard';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url(/assets/home-back.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '80vh'
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

}));

const sumCard1 = {
    title: 'CONFIREMED CASES',
    count: "1534",
    card_clr: '#A9CDEF',
};

const sumCard2 = {
    title: 'DEATHS',
    count: "340",
    card_clr: "#FFADAD",
};

const sumCard3 = {
    title: 'RECOVERED',
    count: "7622",
    card_clr: '#64E3A7',
};

const sumCard4 = {
    title: 'CONFIREMED CASE',
    count: "12,129,340",
    card_clr: "#A9CDEF",
};

const sumCard5 = {
    title: 'ACTIVE CASES',
    count: "9,652,762",
    card_clr: "#E0C2FF",
};

const sumCard6 = {
    title: 'DEATHS',
    count: "10,652",
    card_clr: "#FFADAD",
};

const sumCard7 = {
    title: 'RECOVERED',
    count: "6,677,100",
    card_clr: '#64E3A7',
};


export default function WebHome() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}></div>

            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h6" gutterBottom>COVID-19 DAILY FIGURES</Typography>
                <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

                <Grid container spacing={3} className={classes.container}>
                    {/* First two cards */}
                    <Grid item xs={12} md={4} lg={4}>
                        <SummaryCard carddata={sumCard1} />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <SummaryCard carddata={sumCard2} />
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                        <SummaryCard carddata={sumCard3} />
                    </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>COVID-19 TOTAL FIGURES</Typography>
                <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

                <Grid container spacing={2} className={classes.container}>
                    {/* Covid data cards */}
                    <Grid item xs={12} md={3}>
                        <SummaryCard carddata={sumCard4} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SummaryCard carddata={sumCard5} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SummaryCard carddata={sumCard6} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SummaryCard carddata={sumCard7} />
                    </Grid>

                </Grid>

            </Container>

        </React.Fragment>

    )
}

