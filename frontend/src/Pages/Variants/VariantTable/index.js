import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png"
import {useNavigate} from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";
import React from "react";

const VariantTable = ({tableData}) => {
    const navigate = useNavigate()

    //create columns model
    const columns = [
        {
            Header: "Valid From",
            accessor: "valid_from",
        },
        {
            Header: "Valid To",
            accessor: "valid_to",
        },
        {
            Header: "Sale Price (eur)",
            accessor: "sale_price_net_eur",
        },
        {
            Header: "Purchase Price (eur)",
            accessor: "purchase_price_net_eur",
        },
    ];

    //handle buttons
    const handleCreateButton = (e) => {
        e.preventDefault()
        navigate(`/items/models/create/`)
    }

    const handleClickGoBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (
        <div
            className="flex h-full w-full py-6 px-6 justify-between
    bg-backgroundGrey"
        >
            <div
                className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
            >
                <div className="flex gap-10 mb-2">
                    <img className="cursor-pointer" src={arrow_left_image} alt={"go back"} onClick={handleClickGoBack}/>
                    <h1 className="text-title">{`Variants of Item`}</h1>
                </div>
                {
                    tableData?.length > 0 ?
                        <ListTable data={tableData} columns={columns}></ListTable> :
                        <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
                }

                <div className="flex">
                    <img className="cursor-pointer absolute bottom-10 right-12" src={addButton} alt={"create new model"}
                         onClick={handleCreateButton}/>
                </div>
            </div>

        </div>
    );
}

export default VariantTable