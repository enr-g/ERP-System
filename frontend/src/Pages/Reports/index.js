import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import WarehouseRepTable from "./WarehouseRepTable";
import MyResponsiveLine from "./Graphs/LineGraph";
import MyResponsiveBar from "./Graphs/BarGraph";
import { ClimbingBoxLoader } from 'react-spinners';

function Reports() {
  const [inventoryLedgers, setInventoryLedgers] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtainLedgersInfo = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await callAPI.get('/inventory_ledgers/', config);
      setInventoryLedgers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtainWarehouseList = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await callAPI.get('/warehouses/', config);
      setWarehouseList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([obtainLedgersInfo(), obtainWarehouseList()]).then(() => {
      setLoading(false);
    });
  }, []);

  let data1 = [];

  warehouseList.forEach((warehouse) => {
    let warehouseObject = {
      'Warehouse Name': warehouse.name,
      'Stock level': warehouse.stock_level_total_current,
    };
    data1.push(warehouseObject);
  });

    // let listData1 = []
    // let wareHouses = []
    // let listData2 = []

    // inventoryLedgers.forEach((inventoryLedger) => {
    //
    //     if (!wareHouses.includes(inventoryLedger.warehouse.name)) {
    //         wareHouses.push(inventoryLedger.warehouse.name)
    //         listData2.push({
    //             "id": inventoryLedger.warehouse.name,
    //             "data": [
    //
    //                 {
    //                     "x": 0,
    //                     "y": 0
    //                 },
    //                 {
    //                     "x": inventoryLedger.event_date.slice(0, 10),
    //                     "y": inventoryLedger.stock_level_final
    //                 }
    //             ]
    //         })
    //     } else {
    //         let index = wareHouses.indexOf(inventoryLedger.warehouse.name)
    //         listData2[index].data.splice(1, 0, {
    //             "x": inventoryLedger.event_date.slice(0, 10),
    //             "y": inventoryLedger.stock_level_final
    //         })
    //     }
    //
    // })


    // const data = [{
    //     "Warehouse Name": "warehouseName",
    //     "item1": 51,
    //     "item1Color": "hsl(126, 70%, 50%)",
    //     "item2": 120,
    //     "item2Color": "hsl(71, 70%, 50%)"
    // }, {
    //     "country": "AE",
    //     "hot dog": 179,
    //     "hot dogColor": "hsl(96, 70%, 50%)",
    //     "burger": 112,
    //     "burgerColor": "hsl(168, 70%, 50%)",
    //     "sandwich": 159,
    //     "sandwichColor": "hsl(281, 70%, 50%)",
    //     "kebab": 124,
    //     "kebabColor": "hsl(255, 70%, 50%)",
    //     "fries": 49,
    //     "friesColor": "hsl(172, 70%, 50%)",
    //     "donut": 163,
    //     "donutColor": "hsl(228, 70%, 50%)"
    // }, {
    //     "country": "AF",
    //     "hot dog": 128,
    //     "hot dogColor": "hsl(21, 70%, 50%)",
    //     "burger": 122,
    //     "burgerColor": "hsl(55, 70%, 50%)",
    //     "sandwich": 92,
    //     "sandwichColor": "hsl(190, 70%, 50%)",
    //     "kebab": 75,
    //     "kebabColor": "hsl(87, 70%, 50%)",
    //     "fries": 15,
    //     "friesColor": "hsl(271, 70%, 50%)",
    //     "donut": 66,
    //     "donutColor": "hsl(329, 70%, 50%)"
    // }, {
    //     "country": "AG",
    //     "hot dog": 97,
    //     "hot dogColor": "hsl(255, 70%, 50%)",
    //     "burger": 20,
    //     "burgerColor": "hsl(120, 70%, 50%)",
    //     "sandwich": 51,
    //     "sandwichColor": "hsl(319, 70%, 50%)",
    //     "kebab": 148,
    //     "kebabColor": "hsl(73, 70%, 50%)",
    //     "fries": 58,
    //     "friesColor": "hsl(116, 70%, 50%)",
    //     "donut": 174,
    //     "donutColor": "hsl(302, 70%, 50%)"
    // }, {
    //     "country": "AI",
    //     "hot dog": 171,
    //     "hot dogColor": "hsl(277, 70%, 50%)",
    //     "burger": 74,
    //     "burgerColor": "hsl(259, 70%, 50%)",
    //     "sandwich": 52,
    //     "sandwichColor": "hsl(25, 70%, 50%)",
    //     "kebab": 90,
    //     "kebabColor": "hsl(226, 70%, 50%)",
    //     "fries": 123,
    //     "friesColor": "hsl(4, 70%, 50%)",
    //     "donut": 118,
    //     "donutColor": "hsl(307, 70%, 50%)"
    // }, {
    //     "country": "AL",
    //     "hot dog": 17,
    //     "hot dogColor": "hsl(310, 70%, 50%)",
    //     "burger": 139,
    //     "burgerColor": "hsl(324, 70%, 50%)",
    //     "sandwich": 9,
    //     "sandwichColor": "hsl(127, 70%, 50%)",
    //     "kebab": 32,
    //     "kebabColor": "hsl(113, 70%, 50%)",
    //     "fries": 66,
    //     "friesColor": "hsl(226, 70%, 50%)",
    //     "donut": 158,
    //     "donutColor": "hsl(227, 70%, 50%)"
    // }, {
    //     "country": "AM",
    //     "hot dog": 120,
    //     "hot dogColor": "hsl(16, 70%, 50%)",
    //     "burger": 72,
    //     "burgerColor": "hsl(272, 70%, 50%)",
    //     "sandwich": 169,
    //     "sandwichColor": "hsl(55, 70%, 50%)",
    //     "kebab": 143,
    //     "kebabColor": "hsl(98, 70%, 50%)",
    //     "fries": 43,
    //     "friesColor": "hsl(228, 70%, 50%)",
    //     "donut": 90,
    //     "donutColor": "hsl(122, 70%, 50%)"
    // }]


    const dataLine = [
        {
            "id": "Warehouse 1",
            "color": "hsl(160, 70%, 50%)",
            "data": [
                {
                    "x": "day 1",
                    "y": 0
                },
                {
                    "x": "day ",
                    "y": 5
                },
                {
                    "x": "day 3",
                    "y": 6
                },
                {
                    "x": "day 4",
                    "y": 6
                },
                {
                    "x": "day 5",
                    "y": 6
                },
                {
                    "x": "day 6",
                    "y": 10
                },
                {
                    "x": "day 7",
                    "y": 5
                },
                {
                    "x": "day 8",
                    "y": 3
                },
                {
                    "x": "day 9",
                    "y": 10
                },
                {
                    "x": "day 10",
                    "y": 8
                }
            ]
        },
        {
            "id": "Warehouse 2",
            "color": "hsl(205, 70%, 50%)",
            "data": [
                {
                    "x": "day 1",
                    "y": 0
                },
                {
                    "x": "day ",
                    "y": 10
                },
                {
                    "x": "day 3",
                    "y": 20
                },
                {
                    "x": "day 4",
                    "y": 15
                },
                {
                    "x": "day 5",
                    "y": 3
                },
                {
                    "x": "day 6",
                    "y": 30
                },
                {
                    "x": "day 7",
                    "y": 14
                },
                {
                    "x": "day 8",
                    "y": 10
                },
                {
                    "x": "day 9",
                    "y": 8
                },
                {
                    "x": "day 10",
                    "y": 30
                }
            ]
        }
    ]

    return (
            <div>
            {loading? (
    <div className="loading fixed top-0 left-0 w-full h-full flex justify-center items-center">
  <div className="text-center">
    <ClimbingBoxLoader size={150} color="#36d7b7" />
  </div>
</div>
      ) : (
        <div className="flex h-screen w-screen justify-center bg-backgroundGrey items-center py-6 px-8">
            <div className="flex flex-col h-full w-full rounded-ifRadius py-6 px-8 bg-white  overflow-y-auto scrollbar-thin scrollbar-track-transparent
            scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey">
                <div className="flex flex-col rounded-ifRadius bg-white gap-4">
                <div>
                        <h1 className="text-title">Reports</h1>
                        </div>
                    <div className="flex w-full content-start items-center gap-4">                     
                        <div className="w-full overflow-x-visible ">
                            <WarehouseRepTable tableData={inventoryLedgers}/>
                            <div className="flex w-full h-100 mt-4">
                                <div className="flex flex-col justify-center items-center w-2/5 h-80">
                                    <h2 className="text-section">
                                        Inventory per Warehouse
                                    </h2>
                                    <MyResponsiveBar data={data1}/>
                                </div>
                                <div className="flex flex-col justify-center items-center w-3/5 h-80">
                                    <h2 className="text-section">
                                        Inventory per Warehouse
                                    </h2>
                                    <MyResponsiveLine data={dataLine}/>
                                </div>
                                {/*<div>*/}
                                {/*    <LineChart/>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      )}
    </div>
  );
}
export default Reports;
