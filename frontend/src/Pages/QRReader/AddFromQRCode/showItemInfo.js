import PrimaryDetails from "../../Items/Item/PrimaryDetails";
import ItemModel from "../../Items/Item/ItemModel";
import React from "react";

const ShowItemInfo = ({item}) => {

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center  bg-backgroundGrey px-4 h-10">
                <div className="text-title">
                    Item Model
                </div>
            </div>
            <ItemModel fromItem={true} modelFromItem={item.item_model} modelID={item.id}/>
            <PrimaryDetails fromQRCode={true} fromItem={true} itemFromItem={item}/>
        </div>
    )
}
export default ShowItemInfo