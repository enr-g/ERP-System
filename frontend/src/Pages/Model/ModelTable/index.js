import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png"
import {useNavigate} from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import moment from "moment/moment";
import React from "react";

const ModelTable = ({tableData}) => {
    const navigate = useNavigate()
    console.log(tableData)

    //create columns model
    const columns = [
        {
            Header: "Image",
            accessor: "images[0].image",
            Cell: (props) => {

                if (props.row.original.images) {
                    if(props.row.original.images[0]){
                        return <img
                        className="flex justify-center items-center"
                        src={props.row.original.images[0].image}
                        width={60}
                        alt='Player'
                    />
                    }
                    else {
                        return <span>No Images assigned to Model</span>
                    }
                }
            }
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Condition",
            accessor: "condition",
        },
        {
            Header: "Category",
            accessor: "category",
        },
        {
            Header: "Color",
            accessor: "color",
        },
        {
            Header: "No. of Variants",
            accessor: "items",
            Cell: (props) => {
                if(props.row.original.items){
                    return <span>{props.row.original.items.length}</span>
                }
            }
        },
    ];

    // handle buttons
    const handleCreateButton = (e) => {
        e.preventDefault()
        navigate(`/items/models/create/`)
    }

    const handleGoToItems = (e) => {
        e.preventDefault()
        navigate(`/items`)
    }

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (
        <div
            className="flex h-full w-full py-6 px-8 justify-between
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
                    <h1 className="text-title my-2">Models</h1>
                    <button className="bg-ifOrange mt-1 h-10 w-40 text-white" onClick={handleGoToItems}>Go to Items
                    </button>
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

export default ModelTable