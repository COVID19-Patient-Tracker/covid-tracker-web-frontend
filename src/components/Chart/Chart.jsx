import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { local_new_cases, local_new_deaths} }) => {
  const barChart = (
    local_new_cases ? (
      <Bar
        data={{
          labels: ['Infected',  'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#7ae0f9', '#7af9f9'],
              data: [local_new_cases,  local_new_deaths],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in` },
        }}
      />
    ) : null
  );

  
  return (
    <div className={styles.container}>
      {barChart }
    </div>
  );
};

export default Chart;
