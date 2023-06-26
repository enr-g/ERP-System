import React, {useEffect, useState} from "react";
import callAPI from "../../../../../Axios/callAPI";
import ItemsToAssignTable from "./ItemsToAssignTable";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useSelector} from "react-redux";

const ItemsToAssign = ({itemModelID}) => {
    const [itemList, setItemList] = useState([])
    const [showItemsAssigned, setShowItemsAssigned] = useState()
    const [clickedAssignToModel, setClickedAssignToModel] = useState(false)
    const listItemsChecked = useSelector((store) => store.checkeditems.checkeditems)

    // obtain the all the items
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

    // assign/unassign list of items to model
    const assignItemsToModel = async (itemsList) => {
        try {
            const data = {
                item_ids: itemsList,
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/item_models/assign/${itemModelID}/`, data, config)
            setClickedAssignToModel(!clickedAssignToModel)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtainItemsInfo()
    }, [showItemsAssigned])

    // hanlde Buttons

    const handleShowItemsAssigned = (e) => {
        e.preventDefault()
        if (clickedAssignToModel){
            setClickedAssignToModel(!clickedAssignToModel)
        } else {
            setShowItemsAssigned(!showItemsAssigned)
        }
    }

    const handleAssignToModel = (e) => {
        e.preventDefault()
        assignItemsToModel(listItemsChecked)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-14">
                <p className="text-section">
                    Assign Items to this model
                </p>
                <div className="flex p-0 items-center gap-4">
                    {
                        showItemsAssigned ?
                            <button className="items-center bg-ifOrange w-48 text-white"
                                    onClick={handleAssignToModel}>
                                {clickedAssignToModel ?
                                    "" :
                                    "Assign to Model"
                                }
                            </button> :
                            ""
                    }
                    <button className="p-0" onClick={handleShowItemsAssigned}>
                        {showItemsAssigned ? <FaChevronUp className="h-6 w-6"/> :
                            <FaChevronDown className="h-6 w-6"/>}
                    </button>
                </div>
            </div>
            {

                clickedAssignToModel ?
                    <div className="flex justify-center w-full mt-1">
                        {`Items succesfully assigned to Model`}
                    </div> :
                    <div>
                        {
                            showItemsAssigned ?
                                <ItemsToAssignTable tableData={itemList}/>
                                :
                                ""
                        }
                    </div>
            }
        </div>
    );
}

export default ItemsToAssign