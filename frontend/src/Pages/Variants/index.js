import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import VariantTable from "./VariantTable";
import {useParams} from "react-router-dom";

const Variants = () => {
    //define const
    const [variantsList, setVariantsList] = useState([])
    const {itemID} = useParams();

    //fetch variants information
    const obtainVariantsInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/item_specifications/${itemID}/`, config)
            setVariantsList(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtainVariantsInfo()
    }, [])


    return (
        <div className="flex w-full">
            <VariantTable tableData={variantsList}/>:
        </div>
    );
}

export default Variants