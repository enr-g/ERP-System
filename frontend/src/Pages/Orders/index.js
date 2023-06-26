import React, { useEffect, useState } from "react";
import ListTable from "../../Components/ListTable/ListTable";
import addButton from "../../Assets/Icons/plus_orange.png";
import { useNavigate } from "react-router-dom";
import callAPI from "../../Axios/callAPI";

function Orders() {
  //fetch orders
  const [orderList, setOrderList] = useState([]);

  const obtainItemsInfo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(`/orders/`, config);
      setOrderList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtainItemsInfo();
  }, []);




  //create columns model
  //convert is_merchant_supplier to order type
  const BoolToOrderType = ({ value }) => {
    return value ? "Supply" : "Purchase";
  };

  //convert is_refund to yes or no
  const BoolToIsRefund = ({ value }) => {
    return value ? "Yes" : "No";
  };

  //slice datetime value to only display date
  const sliceDateTime = ({ value }) => {
    return value.slice(0, 10);
  };

  const columns = [
    {
      Header: "Type",
      accessor: "is_merchant_supplier",
      Cell: BoolToOrderType,
    },
    {
      Header: "Refund",
      accessor: "is_refund",
      Cell: BoolToIsRefund,
    },
    {
      Header: "Order #",
      accessor: "order_number",
    },
    {
      Header: "Date",
      accessor: "order_date",
      Cell: sliceDateTime,
    },
    {
      Header: "Shipping",
      accessor: "shipment_date",
      Cell: sliceDateTime,
    },
    {
      Header: "Partner",
      accessor: "partner.name",
    },
    {
      Header: "Warehouse",
      accessor: "warehouse.name",
    },
    {
      Header: "Qty.",
      accessor: "quantity",
    },
    // {
    //   Header: "Total",
    //   accessor: "total", //TODO how is the field called?
    // },
  ];

  //handle click on plus button to add a new order
  const navigate = useNavigate();
  const handleAddButton = (e) => {
    e.preventDefault();
    navigate(`/orders/new/`);
  };

  return (
    <div
      className="h-screen w-screen py-6 px-8 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col space-around
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <div>
          <h1 className="text-title mb-2">Orders</h1>
          <ListTable data={orderList} columns={columns}></ListTable>
        </div>
        <div>
          <img
            className="cursor-pointer absolute bottom-10 right-12"
            src={addButton}
            alt={"create new item"}
            onClick={handleAddButton}
          />
        </div>
      </div>
    </div>
  );
}
export default Orders;
