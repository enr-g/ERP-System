import QrReader from "react-qr-reader"
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const PopUpQRReader = () => {

    // define const
    const qrRef = useRef(null)
    const [fileResult, setFileResult] = useState()
    const navigate = useNavigate()


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
            setTimeout(() => {
                navigate(`/readqr/${fileResult.id}/`)
            }, 200)
        }
    }, [fileResult])


    return (

        <div>
            <QrReader
                className="flex justify-center items-center w-80 h-80"
                delay={10}
                onError={webcamError}
                onScan={webcamScan}
                legacyMode={false}
                facingMode={'environment'}
            />
        </div>
    )
}
export default PopUpQRReader