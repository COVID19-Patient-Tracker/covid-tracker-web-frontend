import React from 'react';
import clsx from 'clsx';

import { makeStyles } from "@material-ui/core";
import { Box, Grid, Container, Typography, Card, CardHeader, TextField, Button, Paper } from '@material-ui/core';

import MainFeaturedPost from '../../components/hospital/dashboard/WelcomeImage';
import Chart from '../../components/hospital/dashboard/Chart';
import SummaryCard from '../../components/hospital/dashboard/SummaryCard';

const mainFeaturedPost = {
    title: 'Welcome to National Hospital - Colombo',
    description:
        "12th September, 2021 01.12 PM",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
};

const sumCard1 = {
    title: 'Total Patients in the Hospital',
    count: "12534",
    card_clr: '#64E3A7',
};

const sumCard2 = {
    title: 'Total Patients Admitted Today',
    count: "12534",
    card_clr: "#A9CDEF",
};

const sumCard3 = {
    title: 'CONFIRMED CASES',
    count: "7622",
    card_clr: '#64E3A7',
};

const sumCard4 = {
    title: 'DEATHS',
    count: "125",
    card_clr: "#FFADAD",
};

const sumCard5 = {
    title: 'RECOVERED',
    count: "6533",
    card_clr: "#A9CDEF",
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function UserManagement() {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h6" gutterBottom>General-Summary</Typography>
                <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>
                <Grid container spacing={3} className={classes.container}>
                    {/* First two cards */}
                    <Grid item xs={12} md={6} lg={6}>
                        <SummaryCard carddata={sumCard1} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <SummaryCard carddata={sumCard2} />
                    </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>Covid-Summary</Typography>
                <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

                <Grid container spacing={2} className={classes.container}>
                    {/* Covid data cards */}
                    <Grid item xs={12} md={4}>
                        <SummaryCard carddata={sumCard3} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SummaryCard carddata={sumCard4} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SummaryCard carddata={sumCard5} />
                    </Grid>

                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Chart />
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}

