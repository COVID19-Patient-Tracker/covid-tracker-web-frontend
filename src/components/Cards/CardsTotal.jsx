import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Cards/Cards';
import styles from './Cards.module.css';
import styled from 'styled-components';


const Info = ({ data:{local_total_cases,local_deaths,local_recovered,update_date_time,local_active_cases } }) => {
  if (!local_total_cases) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
        <Typography gutterBottom variant="h5"  component="h2" style={{fontWeight:'bold'}}>COVID-19 TOTAL FIGURES</Typography>
        <Typography gutterBottom variant="h6" component="h2">
          Last Updated On : {new Date(update_date_time).toDateString()}  {new Date(update_date_time).toLocaleTimeString()}
          </Typography>
        <CardBack>
        <Grid container spacing={3} justify="center"  >
        <CardComponent 
          cardTitle="Infected"
          value={local_total_cases}
          cardSubtitle="Cumulative count of confirmed COVID-19 cases"
        />
        <CardComponent
          cardTitle="Recovered"
          value={local_recovered}
          cardSubtitle="Total COVID-19 cases recovered and discharged"
        />
        <CardComponent
          cardTitle="Active"
          value={local_active_cases}
          cardSubtitle="Confirmed COVID-19 cases currently on treatment"
        />
        <CardComponent
          cardTitle="Deaths"
          value={local_deaths}
          cardSubtitle="Total deaths due to COVID-19 reported"
        />
      </Grid>
        </CardBack>
    </div>
  );
};
export const CardBack = styled.div`
    position: relative;
    overflow: hidden;
    padding: 3rem 0 2rem ;
    border-radius: 20px;
    background-color: white;
`;
export default Info;

