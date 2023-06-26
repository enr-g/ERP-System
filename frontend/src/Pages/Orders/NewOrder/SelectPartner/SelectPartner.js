import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderSelectItem from "./OrderSelectItem/OrderSelectItem.js";
import callAPI from "../../../../Axios/callAPI.js";
import { setPartner } from "../../../../Redux/Slices/orderBuySellRefund.js";
import { setCheckedPartner } from "../../../../Redux/Slices/orderCheckedPartner.js";
import SelectPartnerTable from "./SelectPartnerTable/SelectPartnerTable.js";

function SelectPartner() {
  //#### SHOW LIST OF PARTNERS ####
  //retrieve type buy or sell from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);
  //store fetched data here
  const [partnerList, setPartnerList] = useState([]);
  //fetch partner list from backend
  const fetchSuppliersOrCustomers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const endpoint = isOrderBuy
        ? "/partners/suppliers/"
        : "/partners/customers/";
      const response = await callAPI.get(endpoint, config);
      setPartnerList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSuppliersOrCustomers();
  }, [isOrderBuy]);

  //create columns model for partner list
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "E-Mail",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
  ];

  //#### HANDLE PARTNER SELECTION ####
  const [isPartnerSelected, setIsPartnerSelected] = useState(false);
  //retrieve id of selected partner from redux
  const selectedPartnerId = useSelector(
    (store) => store.checkedpartner.checkedpartner
  );
  const handleSelectPartner = () => {
    if (selectedPartnerId.length === 1) {
      setIsPartnerSelected(true);
    }
  };
  useEffect(handleSelectPartner, [selectedPartnerId]);

  //store the selected partner's data fetched from the backend here
  const [partnerData, setPartnerData] = useState([]);
  const dispatch = useDispatch(); //used later to update redux store
  //fetch partner data from backend
  const fetchPartnerData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await callAPI.get(
        `/partners/${selectedPartnerId[0]}/`,
        config
      );
      setPartnerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPartnerData();
  }, [selectedPartnerId]);
  //store partner data in redux when local state changes
  useEffect(() => {
    dispatch(setPartner(partnerData));
  }, [partnerData]);

  //change an already selected partner
  const handleChangePartner = () => {
    setIsPartnerSelected(false);
    dispatch(setCheckedPartner([]));
  };

  return (
    <div>
      <div className="flex flex-col">
        {isPartnerSelected ? (
          <div className="flex justify-between">
            <div className="pt-4">
              {partnerData.name} - {partnerData.address}
            </div>
            <div className="m-2">
              <button
                onClick={handleChangePartner}
                className="float-right text-buttonGrey border-2 border-buttonGrey w-24"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <SelectPartnerTable data={partnerList} columns={columns} />
        )}
      </div>
      <div>
        {isPartnerSelected ? (
          <div>
            <h2 className=" bg-backgroundGrey text-section px-4 py-2 mt-4">Items</h2>
            <OrderSelectItem />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SelectPartner;
