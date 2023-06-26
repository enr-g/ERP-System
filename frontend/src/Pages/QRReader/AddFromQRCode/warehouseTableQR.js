import ListTable from "../../../Components/ListTable/ListTable";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import React, {useState} from "react";
import ItemDetailsInput from "../../Items/Item/PrimaryDetails/ItemDetailsInput";
import callAPI from "../../../Axios/callAPI";
import {useSelector} from "react-redux";
import moment from "moment/moment";

const WarehouseTableQR = ({tableData, itemID}) => {
    // def const
    const [qty, setQty] = useState(0)
    const [submitClicked, setSubmitClicked] = useState(false)
    const listWarehousesChecked = useSelector((store) => store.checkeditems.checkeditems)

    // handle input and buttons
    const handleInputQty = (e) => {
        e.preventDefault()
        setQty(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        assignItemsToWarehouse()
    }

    // change format of numbers
    function commifyCurrency(n = 0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, "’") + (decimalPart ? "." + decimalPart : " " + "EUR");
    }

    function commify(n=0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    }

    // fetch - assign item to warehouse
    const assignItemsToWarehouse = async () => {
        try {
            const data = {
                item_id: itemID,
                quantity: parseInt(qty, 10)

            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/warehouses/update_items_one/${listWarehousesChecked[0]}/`, data, config)
            setSubmitClicked(!submitClicked)
        } catch (error) {
            console.log(error);
        }
    }

    //create columns model
    const columns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Total Stock",
            accessor: "stock_level_total_current",
            Cell : (props)=> {
                const number = commify(props.value)
                return <span className="flex justify-center">{number}</span>
            }
        },
        {
            Header: "Total Purchase Value",
            accessor: "stock_level_total_purchase_value_current",
            Cell : (props)=> {
                const number = commifyCurrency(props.value)
                return <span className="flex justify-center">{number}</span>
            }
        },
        {
            Header: "Total Sale Value",
            accessor: "stock_level_total_sale_value_current",
            Cell : (props)=> {
                const number = commifyCurrency(props.value)
                return <span className="flex justify-center">{number}</span>
            }
        },
    ];

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    return (

        <div
            className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
        >
            <div className="flex gap-10">
            </div>
            {
                submitClicked ?
                    <div className="flex justify-center gap-10">
                        {`Item successfully added to warehouse`}
                    </div> :
                    <div>
                        <div className="flex gap-10">
                            <ItemDetailsInput value={qty}
                                              disableInput={false}
                                              handleInput={handleInputQty}
                                              description={"Quantity: "}
                                              type={'number'}/>
                            <button className="m-4 bg-ifOrange w-40 text-white" onClick={handleSubmit}>
                                Submit
                            </button>

                        </div>
                        <h1 className="text-title mb-2">Warehouses Available</h1>
                        {
                            tableData?.length > 0 ?
                                <ListTable data={tableData} columns={columns}></ListTable> :
                                <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
                        }
                    </div>
            }
        </div>
    );
}

export default WarehouseTableQR