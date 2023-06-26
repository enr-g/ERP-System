import React, {useEffect, useState} from "react";
import callAPI from "../../../../../Axios/callAPI";
import ItemsAssignedTable from "./ItemsAssignedTable";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const ItemsAssigned = ({itemModelID}) => {
    const [itemList, setItemList] = useState([])
    const [showItemsAssigned, setShowItemsAssigned] = useState()

    //obtain list of items of a model
    const obtainItemsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/item_models/${itemModelID}/`, config)
            setItemList(response.data.items)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtainItemsInfo()
    }, [itemModelID])

    //handle buttons

    const handleShowItemsAssigned = (e) => {
        e.preventDefault()
        setShowItemsAssigned(!showItemsAssigned)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-14">
                <p className="text-section">
                    Items Assigned to this model
                </p>
                <button className="p-0" onClick={handleShowItemsAssigned}>
                    {showItemsAssigned ? <FaChevronUp className="h-6 w-6"/> :
                        <FaChevronDown className="h-6 w-6"/>}
                </button>
            </div>
            {
                showItemsAssigned ?
                    <ItemsAssignedTable tableData={itemList}/>
                    :
                    ""
            }
        </div>
    );
}

export default ItemsAssigned

