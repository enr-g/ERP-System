import React, {useEffect, useState} from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png"
import {useNavigate} from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";
import {FaQrcode} from "react-icons/fa";
import QRReader from "../../QRReader";
import PopUpQRReader from "../../QRReader/AddFromQRCode/popUpQrCode";

const ItemsTable = ({tableData}) => {
    const navigate = useNavigate()
    const [qrcodeClicked, setQrcodeClicked] = useState(false)
    const [opacity, setOpacity] = useState(1)

    // change format of numbers
    function commifyCurrency(n = 0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return "EUR " + numberPart.replace(thousands, "’") + (decimalPart ? "." + decimalPart : " ");
    }

    function commify(n = 0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    }

    //create columns model
    const columns = [
        {
            Header: "Image",
            accessor: "item_model.images[0].image",
            Cell: (props) => {

                if (props.row.original.item_model) {
                    if(props.row.original.item_model.images[0]){
                        return <img
                        className="flex justify-center items-center"
                        src={props.row.original.item_model.images[0].image}
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
            Header: "SKU",
            accessor: "sku",
        },
        {
            Header: "Current Stock",
            accessor: "stock_level_total_current",
            Cell: (props) => {
                const number = commify(props.value)
                return <span>{number}</span>
            }
        },
        {
            Header: "Sale Price",
            accessor: "item_specifications[0].sale_price_net_eur",
            Cell: (props) => {
                const number = commifyCurrency(props.value)
                return <span>{number}</span>
            }
        },
        {
            Header: "Purchase Price",
            accessor: "item_specifications[0].purchase_price_net_eur",
            Cell: (props) => {
                const number = commifyCurrency(props.value)
                return <span>{number}</span>
            }
        },
    ];

    //Handle Buttons
    const handleCreateButton = (e) => {
        e.preventDefault()
        navigate(`/items/new/`)
    }

    const handleGoToModels = (e) => {
        e.preventDefault()
        navigate(`/items/models`)
    }


    const hanldeClickQrCode = (e) => {
        e.preventDefault()
        setQrcodeClicked(!qrcodeClicked)
        if (qrcodeClicked) {
            setOpacity(1)
        } else {
            setOpacity(.2)
        }
        setQrcodeClicked(!qrcodeClicked)
        // navigate(`/readqr`)
    }

    const hanldeClickGoBack = (e) =>{
        e.preventDefault()
        setQrcodeClicked(!qrcodeClicked)
        setOpacity(1)
    }

    //table data if empy in order to avoid rendering problems
    const data_if_empty = [{
        name: ""
    }]

    useEffect(() => {

    }, [opacity])


    return (
        <div
            className='flex h-full w-full py-6 px-8 justify-center
    bg-backgroundGrey'
        >
            <div
                style={{
                    opacity: opacity
                }}
                className='w-full h-full py-6 px-8
        flex flex-col
        bg-white
           rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey'
            >
                <div className="flex gap-10 mb-2">
                    <h1 className="text-title my-2">Items</h1>
                    <button className="bg-ifOrange mt-1 h-10 w-40 text-white" onClick={handleGoToModels}>Go to
                        Models
                    </button>
                    <FaQrcode className="mt-2 w-8 h-8 cursor-pointer" onClick={hanldeClickQrCode}/>
                </div>
                {
                    tableData?.length > 0 ?
                        <ListTable data={tableData} columns={columns}></ListTable> :
                        <ListTableIfEmpty data={data_if_empty} columns={columns}></ListTableIfEmpty>
                }
                <div>
                    <img className="cursor-pointer absolute bottom-10 right-12" src={addButton} alt={"create new item"}
                         onClick={handleCreateButton}/>
                </div>
            </div>
            {
                qrcodeClicked ?
                    <div style={{
                        opacity: 1
                    }}
                         className="fixed top-56 left-1/3">
                        <div className="flex flex-col gap-10 justify-center items-center">
                            <PopUpQRReader/>
                            <button className="p-0 p-0 bg-ifOrange w-40 h-8 text-white"
                                onClick={hanldeClickGoBack}>
                                Go Back
                            </button>
                        </div>
                    </div> :
                    ""
            }
        </div>
    );
}

export default ItemsTable