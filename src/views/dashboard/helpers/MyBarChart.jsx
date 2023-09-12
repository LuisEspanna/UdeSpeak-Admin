import React from 'react';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

/**
 * 
 * @param {object} param0
 * @param {[]} param0.values
 * @returns 
 */
export default function MyBarChart({values}) {
    const labels = [
        "January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "Octuber", "November", "December"].slice(0, new Date().getMonth()+1);
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: `Grupos creados ${new Date().getFullYear()}`,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: values || [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

    return (
        <div id={Chart.length} className='my-chart'>
            <Line data={data}/>
        </div>
    )
}
