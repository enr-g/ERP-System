import callAPI from "../../../Axios/callAPI";
import {useEffect, useState} from "react";
import ShowItemInfo from "./showItemInfo";
import {useParams} from "react-router-dom";

const AddFromQRCode = ({itemID}) => {
    //define const
    const [item, setItem] = useState({})

    //fetch data of Item
    const obtainItemInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/items/${itemID}/`, config)
            setItem(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtainItemInfo()

    }, [itemID])

    console.log(itemID)

    return (
        <div>
            <div>
                {
                    item ?
                        <ShowItemInfo item={item}/> :
                        "item not found"
                }
            </div>
        </div>
    )
}
export default AddFromQRCode
