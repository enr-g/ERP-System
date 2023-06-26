import ItemVariant from "../Items/Item/ItemVariant";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import callAPI from "../../Axios/callAPI";
import arrow_left_image from "../../Assets/Icons/arrow_left_orange.svg";

const CreateItemVariant = () => {
    // def const
    const [item, setItem] = useState("")
    const {itemID} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        obtainItemInfo()
    }, [])

    // fetch item information
    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${itemID}/`, config);
            setItem(response.data)
        } catch (error) {
            console.log(error);
        }

    }

    //hanlde buttons
    const handleClickGoBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <div className="flex h-screen w-screen justify-center bg-backgroundGrey items-center p-5">
            <div className="flex flex-col h-full w-full rounded-ifRadius py-6 px-4 bg-white  overflow-y-scroll">
                <div className="flex h-10 rounded-ifRadius bg-white gap-4 justify-center items-center">
                    <div className="flex w-full content-start items-center gap-4 px-4">
                        <div>
                            <img className="cursor-pointer" src={arrow_left_image} alt={"go back"}
                                 onClick={handleClickGoBack}/>
                        </div>
                        <h1 className="text-title">
                            {`Create New Item Specifications for ${item.name}`}
                        </h1>
                    </div>
                </div>
                <div className="flex h-screen w-full justify-center">
                    <div className="flex flex-col h-full w-11/12 pt-10 pb-10 gap-4">
                        <ItemVariant fromCreate={true} itemID={item.id}/>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CreateItemVariant