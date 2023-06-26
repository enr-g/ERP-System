//for the moment, no Partners are shown

import React, {useState} from "react";

const ItemPartner = () => {

    return (
        <div className="flex w-full justify-start">
            <div className="flex gap-1 flex-wrap">
                <input placeholder={'Partner 1'}/>
                <input placeholder={'Partner 2'}/>
                <input placeholder={'Partner 3'}/>
                <input placeholder={'Partner 4'}/>
            </div>
        </div>
    )
}

export default ItemPartner