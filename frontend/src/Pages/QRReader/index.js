import QrReader from "react-qr-reader"
import React, {useEffect, useRef, useState} from "react";
import AddFromQRCode from "./AddFromQRCode";
import {useNavigate, useParams} from "react-router-dom";
import callAPI from "../../Axios/callAPI";
import WarehouseTableQR from "./AddFromQRCode/warehouseTableQR";

const QRReader = () => {

    // define const
    const qrRef = useRef(null)
    const [fileResult, setFileResult] = useState()
    const navigate = useNavigate()
    const [warehouses, setWarehouses] = useState([])
    const [warehousesClicked, setWarehousesClicked] = useState(false)
    const {itemID} = useParams()


    // QRcode Reader
    const openDialog = () => {
        qrRef.current.openImageDialog()
    }
    const webcamError = (error) => {
        if (error) {
            console.log(error)
        }
    }
    const webcamScan = (result) => {
        if (result) {
            const objectResult = JSON.parse(result)
            setFileResult(objectResult)
        }
    }

    useEffect(() => {
        if (fileResult) {
            navigate(`/readqr`)
        }
    }, [fileResult])

    // handle buttons

    const handleGoToItemButton = (e) => {
        e.preventDefault()
        navigate(`/items/${itemID}/`)
    }

    const handleAddToWarehouseButton = (e) => {
        e.preventDefault()
        setWarehousesClicked(!warehousesClicked)
        obtainWarehouses()
    }


    // fetch warehouses
    const obtainWarehouses = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/warehouses/`, config)
            setWarehouses(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex h-screen w-full justify-center bg-backgroundGrey items-center p-5">
            <div className="flex flex-col h-full w-full rounded-ifRadius p-5 bg-white  overflow-y-scroll">
                <div className="flex  h-10 rounded-ifRadius bg-white gap-4 justify-center items-center">
                    <div className="flex w-full content-start items-center gap-4 bg-backgroundGrey px-4">
                        <h1 className="text-title">
                            ReadQRcode
                        </h1>
                    </div>
                </div>
                <div className="flex h-screen w-full justify-center">
                    <div className="w-full">
                        <div className="flex w-full justify-start items-center">
                            <button className="m-4 bg-ifOrange w-40 text-white"
                                    onClick={handleGoToItemButton}> Go to Item
                            </button>
                            <button className="m-4 bg-ifOrange w-60 text-white"
                                    onClick={handleAddToWarehouseButton}> Add to Warehouse </button>

                        </div>
                        <div>
                            {
                                warehousesClicked ?
                                    <WarehouseTableQR tableData={warehouses}
                                                      itemID={itemID}
                                    /> :
                                    ""
                            }
                        </div>
                        <div>
                            <AddFromQRCode itemID={itemID}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QRReader