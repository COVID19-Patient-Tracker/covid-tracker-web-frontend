import React from 'react';
import { CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styled,{css} from 'styled-components';
import styles from './Cards.module.css';

const CardComponent = ({ className, cardTitle, value, cardSubtitle }) => (
  
  <Grid item xs={12} md={3} component={Card1} className={cx(styles.card, className)}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom style={{fontWeight:'bold', fontSize:'1.25rem'}}>
        {cardTitle}
      </Typography>
      <Typography variant="h5" component="h2">
        <CountUp start={0} end={value} duration={2.75} separator="," />
      </Typography>
      <Typography variant="body2" component="p">
        {cardSubtitle}
      </Typography>
    </CardContent>
  </Grid>
  
);

const gradient = degs => css`
    background: 
        linear-gradient(
            ${degs || 180}deg,
            #7af9f2 0%,
            #ffffff 100%
        )
`;

export const Card1 = styled.div`
    position: relative;
    overflow: hidden;
    padding: 3rem 0 2rem;
    border-radius: 20px;
    color: #04646b;
    ${gradient()};

`;




export default CardComponent;
