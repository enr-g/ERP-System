import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import ModelTable from "./ModelTable";

const Models = () => {
    //define const
    const [modelsList, setModelsList] = useState([])

    // fetch data
    const obtainModelsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/item_models/`, config)
            setModelsList(response.data)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        obtainModelsInfo()
    }, [])


    return (
        <div className="flex w-full">
            <ModelTable tableData={modelsList}/>:
        </div>
    );
}

export default Models