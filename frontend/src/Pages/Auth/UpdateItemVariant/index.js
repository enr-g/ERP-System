import ItemVariant from "../Items/ItemVariant";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import React from "react";
import {useParams} from "react-router-dom";

const CreateItemVariant = () => {
    const { itemID } = useParams();
    return (
        <div className="flex flex-col h-screen w-full justify-center w-full ">
            <div className="flex h-screen w-full pt-10 justify-center">
                <div className="flex w-11/12 justify-center bg-backgroundGrey px-4">
                    <div className="text-xl">
                        {`Create Item variants Specifications of item id`}
                    </div>
                    <div className="items-center flex gap-4 justify-items-center">
                    </div>
                </div>
            </div>
            <div className="flex h-screen w-full justify-center">
                <div className="flex flex-col h-screen w-11/12 pt-10 pb-10 gap-4">
                    <ItemVariant fromCreate={true} itemID={itemID}/>
                </div>
            </div>
        </div>

    )
}
export default CreateItemVariant