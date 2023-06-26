import ListTable from "../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import moment from "moment/moment";
import React from "react";


const WarehouseRepTable = ({tableData}) => {

    //create columns model
    const columns = [
        {
            Header: "Event Date",
            accessor: "event_date",
            Cell: (props) => {
                const custom_date = moment(props.value).format("MMMM Do YYYY")
                return <span>{custom_date}</span>
            }
        },
        {
            Header: "Type",
            accessor: "event_type",
        },
        {
            Header: "Warehouse",
            accessor: "warehouse.name",
        },
        {
            Header: "Item",
            accessor: "item.name",
        },
        {
            Header: "Initial Stock Level",
            accessor: "stock_level_initial",
        },
        {
            Header: "Quantity Altered",
            accessor: "quantity_altered",
        },
        {
            Header: "Final Stock Level",
            accessor: "stock_level_final",
        },
    ];


    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (

        <div className="flex flex-col w-full h-full">
            <div className="flex gap-10">
                <h1 className="text-section mb-2">Inventory Ledger</h1>
            </div>
            {
                tableData?.length > 0 ?
                    <ListTable data={tableData} columns={columns}></ListTable> :
                    <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
            }
        </div>


    );
}

export default WarehouseRepTable