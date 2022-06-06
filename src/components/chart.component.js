import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const Chart = (props) => {

    // const [chartData, setChartData] = useState({});

    // setChartData({
    //     labels: ['Boston', 'Worcester', 'SpringField'],
    //     datasets: [
    //         {
    //             label: 'Population',
    //             data: [
    //                 500,
    //                 1000,
    //                 1500
    //             ],
    //             backgroundColor:[
    //                 'red',
    //                 'blue',
    //                 'green'
    //             ]
    //         }
    //     ]
    // })

    return (
        <div>
            <Bar
                data={props.chartData}
                options={{
                plugins: {
                    title: {
                    display: true,
                    text: "Cryptocurrency prices"
                    },
                    legend: {
                    display: true,
                    position: "bottom"
                }
                }
                }}
            />
        </div>
    )
    
}

export default Chart;