import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
interface TimeSeriesChartProps {
  data: { x: Date; y: number }[]; // Ensure the type definition is correct
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const chartData = data.map(item => item.y);
  const categories = data.map(item => item.x.toLocaleDateString());

  const options :ApexOptions= {
    chart: {
      type: 'line',
      height: 350,
      zoom: { enabled: false },
    },
    xaxis: {
      categories,
      type:'datetime',
      title: { text: 'Date' },
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: { text: 'Number of Visitors' },
    },
    title: {
      text: 'Visitors Per Day',
      align: 'left',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      borderColor: '#e0e0e0',
    },
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Chart
      options={options}
      series={[{ name: 'Visitors', data: chartData }]}
      type="line"
      height={350}
    />
  );
};

export default TimeSeriesChart;
