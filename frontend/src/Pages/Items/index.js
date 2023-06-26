import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import ItemsTable from "./ItemsTable";

const Items = () => {
    // Define Const
    const [itemList, setItemList] = useState([])

    // Fetch items list info
    const obtainItemsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/`, config)
            setItemList(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtainItemsInfo()
    }, [])

    return (
        <div className="flex w-full">
            <ItemsTable tableData={itemList}/>
        </div>
    );
}

export default Items