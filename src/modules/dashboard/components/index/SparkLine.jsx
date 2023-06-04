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
import { faker } from '@faker-js/faker';

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
      data: labels.map(() => faker.datatype.number({ min: 50000, max: 100000 })),
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
    {
      label: 'Expenses',
      data: labels.map(() => faker.datatype.number({ min: 10000, max: 30000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const SparkLine = () => {
  return <Bar options={options} data={data} />;
}

export default SparkLine;
