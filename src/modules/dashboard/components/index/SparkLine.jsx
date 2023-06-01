import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Incomes vs Expenses',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Incomes',
      data: labels.map(() => {22000, 33000, 15000, 25000, 44000, 46000, 39000, 11000}),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Expenses',
      data: labels.map(() => {12000, 23000, 25000, 35000, 14000, 16000, 19000, 21000}),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const SparkLine = () => {
  return <Bar options={options} data={data} />;
}

export default SparkLine;
