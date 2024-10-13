// src/components/ColumnChart.tsx
import React from 'react';
import Chart from 'react-apexcharts'; // Make sure you import Chart correctly
import { ApexOptions } from 'apexcharts';

interface ColumnChartProps {
  chartData: number[];
  categories: string[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ chartData, categories }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: categories,
    },
  };

  return (
    <Chart
      options={options}
      series={[{ name: 'Visitors', data: chartData }]}
      type="bar"
      height={350}
    />
  );
};

export default ColumnChart; // Ensure this line is present
