import React, { useState } from 'react';

import { Grid, Container, Typography, makeStyles } from '@material-ui/core';

import { HeaderContentHospitalUser } from '../../../components/HeaderContent';
import CustomCalendar from "../../../components/hospital/dashboard/CustomCalendar"
import SummaryCard from '../../../components/hospital/dashboard/SummaryCard';
import { useAuth } from "../../../components/AuthConext"
import styles from '../../../App.module.css';
import { getRequest } from '../../../api/utils';
import * as routes from "../../../shared/BackendRoutes";


const sumCard1 = {
    title: 'Registered covid Patient Count',
    count: "98",
    card_clr: { background: 'linear-gradient(45deg, #4fd2f5 30%, #ccebeb 90%)' },
};
const sumCard2 = {
    title: 'Admitted covid Patient Count',
    count: "12",
    card_clr: { background: 'linear-gradient(45deg, #4fd2f5 30%, #ccebeb 90%)' },
};
const sumCard3 = {
    title: 'Discharged covid Patient Count',
    count: "8",
    card_clr: { background: 'linear-gradient(45deg, #3fe9e2 30%, #b4f1ee 90%)' },
};

const sumCard4 = {
    title: 'Transfered covid Patient Count',
    count: "1",
    card_clr: { background: 'linear-gradient(45deg, #3fe9e2 30%, #b4f1ee 90%)' },
};
//set2
const sumCard5 = {
    title: 'Total covid Patient Count',
    count: "570",
    card_clr: { background: 'linear-gradient(45deg, #3fe9e2 30%, #b4f1ee 90%)' },
};
const sumCard6 = {
    title: 'Availability',
    count: "45",
    card_clr: { background: 'linear-gradient(45deg, #3fe9e2 30%, #b4f1ee 90%)' },
};

//set3
const sumCard7 = {
    title: 'Discovered Count',
    count: "8",
    card_clr: { background: 'linear-gradient(45deg, #4fd2f5 30%, #c1e9dd 90%)' },
};

const sumCard8 = {
    title: 'Death Count',
    count: "57",
    card_clr: { background: 'linear-gradient(45deg, #f6609e 30%, #f1c3d6 90%)' },
};
const sumCard9 = {
    title: 'Recovered Count',
    count: "12",
    card_clr: { background: 'linear-gradient(45deg, #3fe9e2 30%, #b4f1ee 90%)' },
};
//set4
const sumCard10 = {
    title: 'Positive Cases',
    count: "57",
    card_clr: { background: 'linear-gradient(45deg, #4fd2f5 30%, #ccebeb 90%)' },
};
const sumCard11 = {
    title: 'Death Count',
    count: "12",
    card_clr: { background: 'linear-gradient(45deg, #f6609e 30%, #f1c3d6 90%)' },
};
const sumCard12 = {
    title: 'Recovered Count',
    count: "8",
    card_clr: { background: 'linear-gradient(45deg, #3fe9e2 30%, #b4f1ee 90%)' },
};

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: theme.spacing(3),
    },
    subcontainer: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(3),
        },
    },
    cardcont: {
        alignSelf: "center",

    },
    totalcont: {
        margin: theme.spacing(3),
        padding: theme.spacing(4),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(2),
            padding: theme.spacing(2),
        },
    },
    covidcont: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));

export default function HospitalAdminDash() {

    const JWTtoken = localStorage.getItem('CPT-jwt-token') // get stored jwt token stored when previous login
    const headers = {headers:{"Authorization": `${JWTtoken}`}}
    const classes = useStyles();
    const auth = useAuth();
    const [hospitalInfo,sethospitalInfo] = useState(null) // includes all hosital details
    // hospital statistics are here
    const [hospitalStatistics,sethospitalStatistics] = useState(null) // includes all hosital details
    const [infoLoaded, setinfoLoaded] = useState(false)

    React.useEffect(() => {
        const user_id = {
            "id":auth.currentUser.id,
        }

        // made request to the backend
        getRequest(routes.GETHOSPITALUSERDETAILS + user_id.id,headers)
            .then((response) => {
                console.log(response)
                if(response.data){
                    sethospitalInfo(response.data.Info.hospital[0]);
                    getRequest(routes.GET_STATISTICS + response.data.Info.hospital[0].hospital_id,headers)
                        .then((response) => {
                            if(response.data){
                                sethospitalStatistics(response.data.statistics);
                                setinfoLoaded(true)
                            }
                            else if(response.error){
                                alert(response.error)
                }
            })
            .catch((e) => {

            });
                }
                else if(response.error){
                    alert(response.error)
                }
            })
            .catch((e) => {

            });
        return () => {
        }
    }, [])


    return (
        <React.Fragment>
            {hospitalInfo ? <HeaderContentHospitalUser props={hospitalInfo}/> : "loading"}
            <div>
                <img src="/assets/userback2.svg" alt='' style={{ backgroundSize: 'cover', width: "100%", backgroundRepeat: 'no-repeat' }} />
            </div>
            <div className={styles.user_container}>
                <Container maxWidth="lg" className={classes.container}>

                    <Typography variant="h4" align="center" style={{ fontWeight: 700 }} gutterBottom>HOSPITAL DASHBOARD</Typography>
                    <Typography variant="subtitle2" align="center" style={{ fontWeight: 700 }} gutterBottom>Last Updated On: 12.09.2021 13: 23: 56</Typography>

                    <br></br><br></br>
                    <Typography variant="h5" style={{ fontWeight: 700 }}>Daily Patient Statics</Typography>

                    <Grid container spacing={1} className={classes.subcontainer}>

                        <Grid item xs={12} md={6} lg={6}>
                            <div className="App" style={{
                                display: "grid",
                                placeItems: "center",
                                //height: "60vh",
                            }}>
                                <CustomCalendar />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} className={classes.cardcont}>

                            <Grid container spacing={5}>

                                <Grid item xs={12} md={6} lg={6}>
                                    <SummaryCard carddata={sumCard1} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <SummaryCard carddata={sumCard2} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <SummaryCard carddata={sumCard3} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <SummaryCard carddata={sumCard4} />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                    <br></br><br></br>
                    <Typography variant="h5" style={{ fontWeight: 700 }}>Hospital Availability</Typography>

                    <Grid container spacing={2} className={classes.totalcont}>
                        <Grid item xs={12} md={6}>
                            <SummaryCard carddata={sumCard5} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SummaryCard carddata={sumCard6} />

                        </Grid>
                    </Grid>

                    <br></br><br></br>
                    <Typography variant="h5" style={{ fontWeight: 700 }}>Daily Covid Patient Statics</Typography>

                    <Grid container spacing={2} className={classes.covidcont}>
                        <Grid item xs={12} md={4}>
                            <SummaryCard carddata={sumCard7} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummaryCard carddata={sumCard8} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummaryCard carddata={sumCard9} />
                        </Grid>
                    </Grid>

                    <Typography variant="h5" style={{ fontWeight: 700 }}>Total Covid Patient Statics</Typography>

                    <Grid container spacing={2} className={classes.covidcont}>
                        <Grid item xs={12} md={4}>
                            <SummaryCard carddata={sumCard10} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummaryCard carddata={sumCard11} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SummaryCard carddata={sumCard12} />
                        </Grid>
                    </Grid>

                </Container>
            </div>
        </React.Fragment>
    );
}

