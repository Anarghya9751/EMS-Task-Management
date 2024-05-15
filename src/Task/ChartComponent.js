import React, { useEffect, useState } from 'react';
import Chart from "react-google-charts";
import './Chart.css';

const ChartComponent = ({ task }) => {
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    // Calculate remaining days
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const today = new Date();
    const totalDays = Math.ceil((endDate - startDate) / (1000*60*60 * 24));
    const daysPassed = Math.ceil((today - startDate) / (1000*60*60 * 24));
    const daysRemaining = totalDays - daysPassed;
    setRemainingDays(daysRemaining);
  }, [task]);

  return (
    <div className='chart-container' style={{ float: 'right' }}>
      <div className='chart-wrapper'>
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="Gauge"
          loader={<div>Loading Chart</div>}
          data={[
            ['Label', 'Value'],
            ['Remaining', remainingDays >= 0 ? remainingDays :remainingDays],
          ]}
          options={{
            width: 600,
            height: 200,
            redFrom: 0,
            redTo: 1,
            yellowFrom: 3,
            yellowTo: 20,
            greenFrom: 20,
            greenTo: Infinity,
            minorTicks: 5,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
       
        <div className='center-text'>
          {/* {/ <h2>{remainingDays >= 0 ? remainingDays : 'Time is Over'}</h2> /} */}
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
