//for the moment no model specs are shown

import React, {useEffect, useState} from "react";
import callAPI from "../../../../Axios/callAPI";
import ItemDetailsInput from "../PrimaryDetails/ItemDetailsInput";

const ItemModelSpecs = ({itemModel, itemModelID, fromList}) => {

    // const to handle input and display information
    const [validFrom, setValidFrom] = useState()
    const [purchasePrice, setPurchasePrice] = useState()
    const [salePrice, setSalePrice] = useState()
    const [stockMinimum, setStockMinimum] = useState()
    const [stockReorder, setStockReorder] = useState()
    const [length, setLength] = useState()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [weightGross, setWeightGross] = useState()
    const [weightNet, setWeightNet] = useState()
    const [size, setSize] = useState()
    const [changes, setChanges] = useState()

    useEffect(() => {
        getSizeOptions()

    }, [])

    // input handlers
    const handleInitialDateInput = (e) => {
        setValidFrom(e.target.value)
    }

    const handlePurchasePriceInput = (e) => {
        e.preventDefault()
        setPurchasePrice(e.target.value)
    }

    const handleSalePriceInput = (e) => {
        e.preventDefault()
        setSalePrice(e.target.value)
    }

    const handleStockMinimumInput = (e) => {
        e.preventDefault()
        setStockMinimum(e.target.value)
    }

    const handleStockReorderInput = (e) => {
        e.preventDefault()
        setStockReorder(e.target.value)
    }

    const handleLengthInput = (e) => {
        e.preventDefault()
        setLength(e.target.value)
    }

    const handleWidthInput = (e) => {
        e.preventDefault()
        setWidth(e.target.value)
    }

    const handleHeightInput = (e) => {
        e.preventDefault()
        setHeight(e.target.value)
    }

    const handleWeightGrossInput = (e) => {
        e.preventDefault()
        setWeightGross(e.target.value)
    }

    const handleWeightNetInput = (e) => {
        e.preventDefault()
        setWeightNet(e.target.value)
    }

    const handleSizeInput = (e) => {
        e.preventDefault()
        setSize(e.target.value)
    }

    const handleChangesInput = (e) => {
        e.preventDefault()
        setChanges(e.target.value)
    }

    // submit handler
    const handleOnSubmit = (e) => {
        e.preventDefault()


    }
    // fetches
    const createItemVariant = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                weight_net_kg: weightNet,
                weight_gross_kg: weightGross,
                length_cm: length,
                width_cm: width,
                height_cm: height,
                size: size,
                purchase_price_net_eur: purchasePrice,
                sale_price_net_eur: salePrice,
                stock_level_minimum: stockMinimum,
                stock_level_reorder: stockReorder,
                item_changes: changes
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.post(`/item_specifications/new/`, data, config)
        } catch (error) {
            console.log(error)
        }
    }

    const updateItemVariant = async () => {

        if (!localStorage.getItem('token')) {
            return;
        }
        try {
            const data = {
                weight_net_kg: weightNet,
                weight_gross_kg: weightGross,
                length_cm: length,
                width_cm: width,
                height_cm: height,
                size: size,
                purchase_price_net_eur: purchasePrice,
                sale_price_net_eur: salePrice,
                stock_level_minimum: stockMinimum,
                stock_level_reorder: stockReorder,
                item_changes: changes
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await callAPI.patch(`/item_specifications/update/`, data, config)
            console.log(response)
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

    //fetching options
    const getSizeOptions = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/item_specifications/choices/sizes/`, config)
            const options = response.data.sizes.unshift("")

        } catch (error) {
            console.log(error);
        }
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    const date = new Date(validFrom).toString().slice(0, 15)
    return (
        <form className="flex flex-col gap-4 " onSubmit={handleOnSubmit}>
            <div className="flex w-full gap-10 justify-around">
                <div className="flex flex-col w-1/2 gap-1">

                    <ItemDetailsInput description={"Purchase Price [eur]:"}
                                      value={purchasePrice}
                                      disableInput={false}
                                      handleInput={handlePurchasePriceInput}/>
                </div>
            </div>
            <div className="flex items-center">
                <label className="w-1/5" htmlFor="item_variant_changes">Changes </label>
                <input className="w-full h-16 flex justify-start items-start"
                       id="item_variant_changes" name="item_variant_changes"
                       value={changes} onChange={handleChangesInput} disabled={true}/>
            </div>
            <div className="flex w-full justify-center">
                {
                    (fromList) ?
                        <button className="bg-ifOrange w-20 text-white" type={"submit"}>
                            Submit
                        </button> :
                        ""
                }
            </div>
        </form>
    )
}

export default ItemModelSpecs