import React from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const data = {
    labels: ['Gross Profit', 'Net Profit', 'Mortgage / Rent', 'CashFlow / Rent', 'ROCE', 'Return of Investment'],
    datasets: [
        {
            label: '# %',
            data: [12, 8, 24, 47, 10, 14],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
            ],
            borderWidth: 1,
        },
    ],
};

export function PolarAreaChart() {
    return <PolarArea data={data} />;
}

export default PolarAreaChart;