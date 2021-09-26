import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import CardComponent from './Cards/Cards';
import styles from './Cards.module.css';
import styled,{css} from 'styled-components';

const Info = ({ data:{local_new_cases, update_date_time, local_new_deaths } }) => {
  if (!local_new_cases) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
      
        <Typography gutterBottom variant="h5"  component="h2" style={{fontWeight:'bold'}}>COVID-19 DAILY FIGURES</Typography>
        <Typography gutterBottom variant="h6" component="h2">
          Last Updated On : {new Date(update_date_time).toDateString()}  {new Date(update_date_time).toLocaleTimeString()}
          </Typography>
        <CardBack>
        <Grid container spacing={4} justify="center">
        <CardComponent 
        
          cardTitle="Infected"
          value={local_new_cases}          
          cardSubtitle="Confirmed COVID-19 cases reported during the day"/>
        <CardComponent
          cardTitle="Deaths"
          value={local_new_deaths}
          cardSubtitle="Confirmed deaths caused by COVID-19 reported during the day"
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

