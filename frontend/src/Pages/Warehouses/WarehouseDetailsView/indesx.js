import React, { useState, useEffect } from "react";
import WarehouseDetails from "../../../Components/WarehouseComp/WarehouseDetails";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";
import {useNavigate, useParams} from "react-router-dom";
import callAPI from "../../../Axios/callAPI";
function WarehouseDetailsView() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [warehouse, setWarehouse] = useState({});
  const { warehouseID } = useParams();
  const handleClickGoBack = (e) => {
    e.preventDefault();
    navigate(`/warehouses`);
  };


const getWarehouseName = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await callAPI.get(`/warehouses/${warehouseID}/`, config);
    setName(response.data.name);
    setWarehouse(response.data); // set the warehouse state
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    getWarehouseName();
  }, []);

  return (
    <div className="h-screen w-screen py-6 px-8 justify-center bg-backgroundGrey">
      <div className="w-full h-full py-6 px-8 flex flex-col bg-white rounded-ifRadius overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey">
        <div className="flex flex-col h-screen gap-4">
          <div className="flex justify-start">
            <div className="flex items-center w-full">
              <img
                className="cursor-pointer mx-4"
                src={arrow_left_image}
                alt={"go back"}
                onClick={handleClickGoBack}
              />
              <h1 className="text-title">{warehouse.name}</h1>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 justify-between">
            <WarehouseDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDetailsView;
