import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import ItemsTable from "../Items/ItemsTable";
import WarehouseTable from "./WarehouseTable";

const Warehouse = () => {
  const [warehouseList, setwarehouseList] = useState([])

  const obtainWarehouseInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/warehouses/`, config)
            setwarehouseList(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtainWarehouseInfo()
    }, [])

    const data_if_empty = [{
      name: ""
    }]
  return (
    <div className="flex w-full">
        <WarehouseTable tableData={warehouseList}/>
    </div>
  );
}

export default Warehouse