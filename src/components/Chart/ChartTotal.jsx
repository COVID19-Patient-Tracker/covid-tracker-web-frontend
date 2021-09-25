import React from 'react';
import {Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { local_total_cases,local_deaths,local_recovered,local_active_cases} }) => {
  const barChart = (
    local_total_cases ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Active' ,'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#7acaf9','#7ae0f9', '#7af9f9', '#7af9f3'],
              data: [local_total_cases, local_recovered,local_active_cases, local_deaths],
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
