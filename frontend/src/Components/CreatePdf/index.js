import {PDFViewer} from '@react-pdf/renderer';
import MyDocument from "./PdfFile";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import React, {useState} from "react";

const PDFCreate = (qrcode) => {

    const [numerOfQrCode, setNumerOfQrCode] = useState(0)


    const handeleInputNumber = (e) =>{
        e.preventDefault()
        setNumerOfQrCode(e.target.value)
    }

        return (
            <div className="flex flex-col w-full">
                <div className="flex w-1/3 justify-start m-4">
                    <ItemDetailsInput className="flex justify-center w-full"
                                  value={numerOfQrCode}
                                          disableInput={false}
                                          handleInput={handeleInputNumber}
                                          description={"Number of QrCodes"}/>
                    <button> Submit </button>

                </div>
                <PDFViewer className="w-full h-screen">
                    <MyDocument qrcode={qrcode} number={numerOfQrCode}/>
                </PDFViewer>
            </div>


        )
    }
;

export default PDFCreate