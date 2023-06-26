import callAPI from "../../../../Axios/callAPI";
import React, {useEffect, useState} from "react";
import InventoryLedgerTable from "../../../../Components/InventoryLedgerTable/InventoryLedgerTable";

const ItemInventoryLedgers = ({itemID}) =>{
    const [inventoryLedgers, setInventoryLedgers] = useState()

    // Fetch inventory ledgers if Item
    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/inventory_ledgers/items/${itemID}/`, config)
            setInventoryLedgers(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        obtainItemInfo()
    },[])

    return(
        <div className="flex w-full">
            <InventoryLedgerTable tableData={inventoryLedgers}/>
        </div>
    )
}

export default ItemInventoryLedgers