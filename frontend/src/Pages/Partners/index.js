import React, {useEffect, useState} from "react";
import callAPI from "../../Axios/callAPI";
import ItemsTable from "../Items/ItemsTable";
import PartnerTable from "./PartnerTable";

const Partners = () => {
  const [partnerList, setpartnerList] = useState([])

  const obtainPartnerInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };

            const response = await callAPI.get(`/partners/`, config)
            setpartnerList(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtainPartnerInfo()
    }, [])

    const data_if_empty = [{
      name: ""
    }]
  return (
    <div className="flex w-full">
        <PartnerTable tableData={partnerList}/>
    </div>
  );
}

export default Partners;
