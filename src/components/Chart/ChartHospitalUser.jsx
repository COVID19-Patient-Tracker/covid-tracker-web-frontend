import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
  const barChart = (
     (
      <Bar
        data={{
          labels: ['Total Patients',  'Admitted', 'Recovered'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#72d1e9', '#7af9f9','#7ae6f9'],
              data: [102, 21, 15],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in` },
        }}
      />
    ) 
  );

  
  return (
    <div className={styles.container}>
      {barChart }
    </div>
  );
};

export default Chart;
