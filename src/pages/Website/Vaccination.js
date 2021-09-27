import React from 'react';

import { Grid, Container, Typography, Box, Button } from "@material-ui/core";

import VaccineCard from '../../components/Website/VaccineCard';
import background from '../../components/img/background.svg';
import { HeaderContentVaccine } from '../../components/HeaderContent';
import '../../components/css/guideline.css';


export default function Vaccination() {

    return (
        <React.Fragment>
            <HeaderContentVaccine />
            <div>
                <img src={background} alt='' style={{ backgroundPositionY: "100%", backgroundSize: 'cover', width: "100%", backgroundRepeat: 'no-repeat' }} />
            </div>
            <br /><br /><br />
            <Container maxWidth="lg" className='container'>
                <Typography variant="h4" style={{ fontWeight: 700 }} align="center" gutterBottom>Vaccines Approved to use in Sri Lanka </Typography>
                <br></br><br></br>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <VaccineCard
                            carddata={
                                { card_clr: "#96d8e6", name: "Moderna mRNA-1273", approved: "Approved in 72 countries", trial: "28 trials in 2 countries" }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VaccineCard
                            carddata={
                                { card_clr: "#3fbccd", name: "Pfizer/BioNTechBNT162b2", approved: "Approved in 100 countries", trial: "33 trials in 16 countries" }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VaccineCard
                            carddata={
                                { card_clr: "#26b7cb", name: "GamaleyaSputnik V", approved: "Approved in 71 countries", trial: "21 trials in 2 countries" }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VaccineCard
                            carddata={
                                { card_clr: "#11cda9", name: "Oxford/AstraZenecaAZD1222", approved: "Approved in 122 countries", trial: "40 trials in 2 countries" }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VaccineCard
                            carddata={
                                { card_clr: "#3fcbb0", name: "Sinopharm (Beijing)BBIBP-CorV", approved: "Approved in 64 countries", trial: "11 trials in 4 countries" }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VaccineCard
                            carddata={
                                { card_clr: "#73dcc8", name: "SinovacCoronaVac", approved: "Approved in 40 countries", trial: "19 trials in 2 countries" }} />
                    </Grid>
                </Grid>
            </Container>
            <Box p={{ xs: 1, sm: 5 }} m={{ xs: 1, sm: 8 }} border={1} borderColor="#26b7cb" borderRadius={14} textAlign="center">
                <Typography variant="h5" style={{ fontWeight: 600 }} align="center" gutterBottom>The benefits of vaccination</Typography>
                <br></br>
                <Typography variant="body1">

                    According to the WHO, vaccination is a simple, safe and effective way to protect
                    against harmful diseases before coming into contact with them, as it activates the
                    body's natural defenses to learn to resist specific infections and strengthen the
                    immune system. <br></br>In this sense, vaccination against COVID-19 will reduce the risk of
                    becoming seriously ill and dying, since the person will be better protected.
                    Immunity will not be 100%, since a vaccinated person can still catch the disease;
                    however, the consequences for the body are expected to be much less
                </Typography>

                <Box p={2} m={2} bgcolor="#8bc9bd" textAlign="center" border={1} borderRadius={10}>
                    <Typography variant="h6"> Don't wait.. Get Vaccinated Today</Typography>
                    <br></br>
                    <Button href="https://drive.google.com/file/d/14Me7VTm28UVrwlhcaX-7qE-WZQpixmH0/view" target="_blank" variant="contained">
                        Check the centers open today
                    </Button>
                </Box>
            </Box>
            <br /><br /><br /><br /><br />
        </React.Fragment>
    );
}
