import React, { useState } from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import { useNavigate, useParams } from "react-router-dom";
import OrderPrimaryDetails from "./OrderPrimaryDetails";
import callAPI from "../../../Axios/callAPI";
import { useEffect } from "react";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";

function OrderDetails() {
  //fetch order data
  //read id of the order to fetch
  const orderId = useParams().orderID;

  const [orderData, setOrderData] = useState({});

  //TODO fetch order -> endpoint missing?
  const getOrderById = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(`/orders/${orderId}`, config);
      setOrderData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderById();
  }, []);

  //create columns model
  const columns = [
    {
      Header: "Name",
      accessor: "items[0].name",
    },
    {
      Header: "Size",
      accessor: "items[0].item_specifications[0].size",
    },
    {
      Header: "SKU",
      accessor: "items[0].sku",
    },
    {
      Header: "EAN",
      accessor: "items[0].ean",
    },
    {
      Header: "UPC",
      accessor: "items[0].upc",
    },
    {
      Header: "Stock",
      accessor: "items[0].stock_level_total_current",
    },
    {
      Header: "Cost",
      accessor: "items[0].item_specifications[0].purchase_price_net_eur",
    },
    {
      Header: "Price",
      accessor: "items[0].item_specifications[0].sale_price_net_eur",
    },
  ];

  const navigate = useNavigate();
  const handleClickGoBack = (e) => {
    e.preventDefault();
    navigate(`/orders`);
  };

  return (
    <div
      className="h-screen w-screen py-6 px-8 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <div className="flex w-full content-start items-center gap-4 px-4 mb-4">
          <div>
            <img
              className="cursor-pointer"
              src={arrow_left_image}
              alt={"go back"}
              onClick={handleClickGoBack}
            />
          </div>
          <h1 className="text-title">Order # {orderData.order_number}</h1>
        </div>
        <OrderPrimaryDetails order={orderData} />
        <div className="flex items-center justify-between bg-backgroundGrey px-4 mb-2 h-10">
          <h2 className="text-section">Items</h2>
        </div>
        <ListTable data={[orderData]} columns={columns}></ListTable>
      </div>
    </div>
  );
}
export default OrderDetails;
