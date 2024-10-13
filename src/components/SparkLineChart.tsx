import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
interface SparklineChartProps {
  data: { x: Date; y: number }[];
  label:string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data,label }) => {
  const chartData = data.map(item => item.y);

  const options:ApexOptions = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.1,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
       enabled: true,
      shared: true,
      intersect: false,
      x: {
        formatter: (val: number) => new Date(val).toLocaleDateString(), // Format the date for tooltip
      },
      y: {
        formatter: (val: number) => `${val}`, // Show the number in the tooltip
      },
    },
    grid: {
      padding: {
        bottom: 5,
      },
    },
  };

  return (
    <div>
      <h3>{label} Visitors</h3>
      <Chart
        options={options}
        series={[{ name: label, data: chartData }]}
        type="line"
        height={80} // Adjust height as needed
      />
    </div>
  );
};
export default SparklineChart;
