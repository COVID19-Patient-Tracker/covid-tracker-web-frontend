import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Cards/Cards';
import styles from './Cards.module.css';
import styled from 'styled-components';

const Info = () => {
  return (
    <div className={styles.container}>
      
        <Typography gutterBottom variant="h5"  component="h2" style={{fontWeight:'bold'}}>COVID-19 PATIENT DETAILS</Typography>
        <Typography gutterBottom variant="h6" component="h2">
          Last Updated On : {new Date().toDateString()}  {new Date().toLocaleTimeString()}
          </Typography>
        <CardBack>
        <Grid container spacing={4} justify="center">
        <CardComponent 
          cardTitle="Total Patients"
          value="1102"          
          cardSubtitle="Total COVID-19 infected patients in the hospital"/>
        <CardComponent
          cardTitle="Admitted"
          value="21" 
          cardSubtitle="Total number of COVID-19 infected patients admitted today"
        />
        <CardComponent
          cardTitle="Recovered"
          value="15" 
          cardSubtitle="Total COVID-19 infected patients recovered and discharged today"
        />
      </Grid>
        </CardBack>
    </div>
  );
};
export const CardBack = styled.div`
    position: relative;
    overflow: hidden;
    padding: 3rem 0 3rem ;
    border-radius: 20px;
    background-color: white;
`;

export default Info;

