import React, {useEffect, useState} from "react";
import callAPI from "../../../../Axios/callAPI";
import ItemDetailsInput from "./ItemDetailsInput";
import {useNavigate, useParams} from "react-router-dom";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import moment from "moment/moment";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";


const PrimaryDetails = ({fromCreate, fromItem, itemFromItem, fromQRCode}) => {

    //define const

    const [item, setItem] = useState({})
    const [editClicked, setEditClicked] = useState(false)
    const [disableInput, setDisableInput] = useState(true)
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [series, setSeries] = useState("")
    const [SKU, setSKU] = useState("")
    const [EAN, setEAN] = useState("")
    const [UPC, setUPC] = useState("")
    const [AASIN, setAASIN] = useState("")
    const [AFNSKU, setAFNSKU] = useState("")
    const [creatQRCodeBarcodeClicked, setCreatQRCodeBarcodeClicked] = useState(false)
    const navigate = useNavigate()
    const {itemID} = useParams();


    // QRCODE GENERATOR

    const [qrcode, setQrcode] = useState("")
    const createQRCode = () => {
        const data = {
            id: item.id,
            amazon_asin: item.amazon_asin,
            amazon_fnsku: item.amazon_fnsku,
            ean: item.ean,
            sku: item.sku,
            upc: item.upc,
        }
        const datJson = JSON.stringify(data)
        const generateQR = async text => {
            try {
                setQrcode(await QRCode.toDataURL(datJson))
            } catch (err) {
                console.error(err)
            }
        }
        generateQR()

    }


    //Barcode Generator
    JsBarcode(".barcode").init();

    // handle input

    const handleNameInput = (e) => {
        setName(e.target.value);
    };

    const handleStatusInput = (e) => {
        setStatus(e.target.value);
    };

    const handleSeriesInput = (e) => {
        setSeries(e.target.value);
    };

    const handleSKUInput = (e) => {
        setSKU(e.target.value);
    };

    const handleEANInput = (e) => {
        setEAN(e.target.value);
    };

    const handleUPCInput = (e) => {
        setUPC(e.target.value);
    };

    const handleAASINInput = (e) => {
        setAASIN(e.target.value);
    };

    const handleAFNSKUInput = (e) => {
        setAFNSKU(e.target.value);
    };

    // handle buttons

    const handleEditButton = (e) => {
        e.preventDefault()
        if (editClicked) {
            setEditClicked(!editClicked)
            setDisableInput(!disableInput)
            updateItem()
        } else {
            setEditClicked(!editClicked)
            setDisableInput(!disableInput)
        }
    }

    const handleSubmitButton = (e) => {
        e.preventDefault()
        createItem()
        // navigate(`/items/${newItemID}/`)
    }

    const handleCreateQrCodeBarcodeButton = (e) => {
        e.preventDefault()
        setCreatQRCodeBarcodeClicked(!creatQRCodeBarcodeClicked)
        createQRCode()
    }

    const handleCreatePDF = (e) => {
        e.preventDefault()
        navigate(`/createPdf/${itemID}/`)
    }


    useEffect(() => {
        if (fromItem) {
            setItem(itemFromItem)
            setName(itemFromItem.name)
            setStatus(itemFromItem.status)
            setSeries(itemFromItem.series)
            setSKU(itemFromItem.sku)
            setEAN(itemFromItem.ean)
            setUPC(itemFromItem.upc)
            setAASIN(itemFromItem.amazon_asin)
            setAFNSKU(itemFromItem.amazon_fnsku)
        }
    }, [itemFromItem])

    //  fetch - Update Item - Create Item
    const updateItem = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                name: name,
                status: status,
                series: series,
                sku: SKU,
                ean: EAN,
                upc: UPC,
                amazon_asin: AASIN,
                amazon_fnsku: AFNSKU
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/items/${itemID}/`, data, config)
        } catch (error) {
            console.log(error)
        }
    }

    const createItem = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                name: name,
                status: status,
                series: series,
                sku: SKU,
                ean: EAN,
                upc: UPC,
                amazon_asin: AASIN,
                amazon_fnsku: AFNSKU
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.post(`/items/new/`, data, config)
            navigate(`/items/${response.data.id}/`)

        } catch (error) {
            const keys = Object.keys(error.response.data)
            const values = Object.values(error.response.data)
            let message = ""
            values?.forEach((errorMessage, index) => {
                message += `${errorMessage} ${keys[index]} \n`
            })
            alert(message)
        }
    }

    // convert date into readable
    let date = ""

    if (item.release_date) {
        date = moment(item.release_date).format("dddd, MMMM Do YYYY")
    }

    function commify(n) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
    }

    function commifyCurrency(n = 0) {
        let parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return "EUR " + numberPart.replace(thousands, "’") + (decimalPart ? "." + decimalPart : " ");
    }

    return (
        <form className="flex flex-col w-full justify-between gap-4" onSubmit={handleSubmitButton}>
            <div className="flex items-center justify-between bg-backgroundGrey px-4 h-14">
                <h2 className="text-section">
                    Primary Details
                </h2>
                {
                    (fromCreate || fromQRCode) ?
                        "" :
                        <button className="bg-ifOrange w-20 text-white" onClick={handleEditButton}>
                            {
                                editClicked ?
                                    "Save" :
                                    "Edit"
                            }
                        </button>
                }
            </div>
            <div className="flex w-full">
                <div className="flex w-full justify-around gap-4">
                    <div className="flex w-1/2 flex-col gap-1">
                        {
                            fromCreate ?
                                "" :
                                [<ItemDetailsInput value={item.id}
                                                   disableInput={true}
                                                   description={"Item ID:"}/>,
                                    <ItemDetailsInput value={date}
                                                      disableInput={true}
                                                      description={"Release Date:"}/>]
                        }
                        <ItemDetailsInput value={name}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleNameInput}
                                          description={"Item Name:"}/>
                        <ItemDetailsInput value={status}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleStatusInput}
                                          description={"Item Status: "}
                                          choicesEnabeled={true}
                                          choices={["", "Active", 'No restock']}/>
                        <ItemDetailsInput value={series}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleSeriesInput}
                                          description={"Series No.:"}/>
                        {
                            fromCreate ?
                                "" :
                                <ItemDetailsInput
                                    value={item.stock_level_total_current ?
                                        commify(item.stock_level_total_current)
                                        : ""}
                                    disableInput={true}
                                    description={"Current Stock:"}/>
                        }
                    </div>
                    <div className="flex w-1/2 flex-col gap-1">
                        <ItemDetailsInput value={SKU}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleSKUInput}
                                          description={"SKU No.:"}/>
                        <ItemDetailsInput value={EAN}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleEANInput}
                                          description={"EAN No.:"}/>
                        <ItemDetailsInput value={UPC}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleUPCInput}
                                          description={"UPC No.:"}/>
                        <ItemDetailsInput value={AASIN}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleAASINInput}
                                          description={"Amazon ASIN No.:"}/>
                        <ItemDetailsInput value={AFNSKU}
                                          disableInput={!fromCreate & fromItem & disableInput}
                                          handleInput={handleAFNSKUInput}
                                          description={"Amazon FNSKU No.:"}/>
                        {
                            fromCreate ?
                                "" :
                                [<ItemDetailsInput
                                    value={item.stock_level_total_purchase_value_current ?
                                        commifyCurrency(item.stock_level_total_purchase_value_current)
                                        : ""}
                                    disableInput={true}
                                    description={"Total Purchase Value:"}/>,
                                    <ItemDetailsInput
                                        value={item.stock_level_total_sale_value_current ?
                                            commifyCurrency(item.stock_level_total_sale_value_current)
                                            : ""}
                                        disableInput={true}
                                        description={"Total Sale Value:"}/>]
                        }
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center">
                {
                    (fromCreate) ?
                        <div>
                            <button className="bg-ifOrange w-24 text-white" type={"submit"}>
                                Submit
                            </button>
                        </div> :
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-14">
                                <div className="text-section">
                                    QR- and Barcodes
                                </div>
                                <div className="items-center flex gap-4 justify-items-center">
                                    <button className="p-0" onClick={handleCreateQrCodeBarcodeButton}>
                                        {creatQRCodeBarcodeClicked ? <FaChevronUp className="h-6 w-6"/> :
                                            <FaChevronDown className="h-6 w-6"/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>
            {
                creatQRCodeBarcodeClicked ?
                    <div className="flex w-full justify-center">
                        {
                            (fromCreate) ?
                                <div>
                                    <button className="text-xl p-0 bg-ifOrange w-20 text-white" type={"submit"}>
                                        Submit
                                    </button>
                                </div> :
                                <div className="flex w-full justify-around">
                                    {
                                        fromQRCode ?
                                            "" :
                                            [<div className="flex justify-between gap-8 items-center">
                                                <img alt={"QrCode"} src={qrcode}/>
                                                <button className="bg-ifOrange w-40 text-white"
                                                        onClick={handleCreatePDF}> Create PDF
                                                </button>
                                            </div>,
                                                <div className="flex justify-between gap-8 items-center">
                                                    <svg className="barcode"
                                                        //jsbarcode-format="EAN13"
                                                         jsbarcode-value={item.ean}
                                                         jsbarcode-textmargin="0"
                                                         jsbarcode-fontoptions="bold">
                                                    </svg>
                                                    <button className="bg-ifOrange w-40 text-white"
                                                        onClick={handleCreatePDF}> Create PDF
                                                    </button>
                                                </div>]
                                    }
                                </div>
                        }
                    </div> :
                    ""
            }
        </form>
    )
}

export default PrimaryDetails