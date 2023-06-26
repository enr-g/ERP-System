// // ./components/LineChart.js
//
// import React, {useEffect, useState} from "react";
// import Chart from "chart.js/auto";
// import {Line} from "react-chartjs-2";
// import callAPI from "../../../Axios/callAPI";
// import {months} from "moment";
//
//
// const LineChart = () => {
//
//     const [warehouseStockLevel, setWarehouseStockLevel] = useState([])
//     const obtainWarehouseStockLevels = async () => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             };
//
//             const response = await callAPI.get(`/inventory_ledgers/stock_current_daily_warehouse/`, config)
//             setWarehouseStockLevel(response.data)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//
//
//     useEffect(() => {
//         obtainWarehouseStockLevels()
//     }, [])
//
//     console.log(warehouseStockLevel)
//
//     const labels = months({count: 7});
//     const data = {
//       labels: labels,
//       datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }]
//     };
//
//     const config = {
//       type: 'line',
//       data: data,
//     };
//
//     return (
//         <div>
//             <Line options={config} data={data}/>
//         </div>
//     );
// };
//
// export default LineChart;