import { Container, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import LineTypeChart from '../../components/MOH/dashboard/LineChart';
import SummaryCards from '../../components/MOH/dashboard/SummaryCard';
import clsx from 'clsx';
import MainFeaturedPost from '../../components/MOH/dashboard/WelcomeImage';
import GroupedSearch from '../../components/MOH/dashboard/ws';

const POSITIVE = {
    title:"TOTAL POSITIVE CASES",
    count:9845,
    card_clr: '#64E3A7',
}
const DEATHS = {
    title:"DEATHS",
    count:983454,
    card_clr: "#FFADAD",
}
const RECOVERIES = {
    title:"TOTAL RECOVERIES",
    count:998345,
    card_clr: "#A9CDEF",
}
const PCR = {
    title:"TOTAL PCR TESTS",
    count:9899899,
    card_clr: '#64E3A7',
};

const RAPID = {
    title:"TOTAL RAPID ANTIGEN TESTS",
    count:189748,
    card_clr: "#A9CDEF",
};
const D_POSITIVE = {
    title:"DAILY POSITIVE CASES",
    count:9845,
    card_clr: '#64E3A7',
}
const D_DEATHS = {
    title:"DAILY DEATHS",
    count:983454,
    card_clr: "#FFADAD",
}
const D_RECOVERIES = {
    title:"DAILY RECOVERIES",
    count:998345,
    card_clr: "#A9CDEF",
}

const mainFeaturedPost = {
    title: 'Hello, User',
    description:
        "12th September, 2021 01.12 PM",
    image: '/assets/moh0.jpg',
    imgText: 'main image description',
};


const useStyles = makeStyles((theme) => ({

    root: {
      flexGrow: 1,
    },

    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    greeting:{
    },
    title:{
        height:"140px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },

    grid_box:{
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },

    fixedHeight: {
        height: 240,
    },

  }));
  const items = [
    { title: 'Hospital A', year: 1994 },
  ];
export default function Dashboard() {

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
        <Container className={classes.grid_box} maxWidth="xl" >
            <Grid  container spacing={3}>
                <Grid item xs={12}>
                        <MainFeaturedPost post={mainFeaturedPost} />
                </Grid>
            </Grid>
        </Container>

        <Container maxWidth="lg" >
            <GroupedSearch items = {items}/>

            <Typography variant="h6" gutterBottom>Test Summary</Typography>
            <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

            <Grid justifyContent = 'space-around' className={classes.grid_box} container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <SummaryCards carddata={PCR}></SummaryCards>
                </Grid>
                <Grid item xs={12} sm={6}>                    
                    <SummaryCards carddata={RAPID}></SummaryCards>
                </Grid>
                {/* Chart */}
                <Grid  item xs={12} md={6} >
                    <Paper className={fixedHeightPaper}>
                        <LineTypeChart />
                    </Paper>
                </Grid>
            </Grid>

            
            <Typography variant="h6" gutterBottom>Covid Summary</Typography>
            <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

            <Grid justifyContent = 'space-around' className={classes.grid_box} container spacing={3}>
                <Grid item xs={9} sm={4}>
                    <SummaryCards carddata={POSITIVE}></SummaryCards>
                </Grid>
                <Grid item xs={9} sm={4}>
                    <SummaryCards carddata={DEATHS}></SummaryCards>
                </Grid>
                <Grid item xs={9} sm={4}>
                    <SummaryCards carddata={RECOVERIES}></SummaryCards>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom>Daily Cases Summary</Typography>
            <Typography variant="subtitle2" gutterBottom>Last Updated On: 12.09.2021 13:23:56</Typography>

            <Grid justifyContent = 'space-around' className={classes.grid_box} container spacing={3}>
                <Grid item xs={9} sm={4}>
                    <SummaryCards carddata={D_POSITIVE}></SummaryCards>
                </Grid>
                <Grid item xs={9} sm={4}>
                    <SummaryCards carddata={D_DEATHS}></SummaryCards>
                </Grid>
                <Grid item xs={9} sm={4}>
                    <SummaryCards carddata={D_RECOVERIES}></SummaryCards>
                </Grid>
                {/* Chart */}
                <Grid item xs={12} md={6} >
                    <Paper className={fixedHeightPaper}>
                        <LineTypeChart />
                    </Paper>
                </Grid>
                {/* Chart */}
                <Grid item xs={12} md={6} >
                    <Paper className={fixedHeightPaper}>
                        <LineTypeChart />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}
