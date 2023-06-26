import React, { useEffect, useState } from "react";
import ListTable from "../../../Components/ListTable/ListTable";
import addButton from "../../../Assets/Icons/plus_orange.png";
import { useNavigate } from "react-router-dom";
import ListTableIfEmpty from "../../../Components/ListTableIfEmpty/ListTable";

const WarehouseTable = ({ tableData }) => {
  const navigate = useNavigate();

  function commifyCurrency(n = 0) {
    let parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
      "EUR" +
      " " +
      numberPart.replace(thousands, "’") +
      (decimalPart ? "." + decimalPart : " ")
    );
  }

  function commify(n = 0) {
    let parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
      numberPart.replace(thousands, ",") +
      (decimalPart ? "." + decimalPart : "")
    );
  }

    //create columns model
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
            Header: "Phone",
            accessor: "phone",
        },
        {
            Header: "Total Stock",
            accessor: "stock_level_total_current",
            Cell: (props) => {
                const number = commify(props.value)
                return <span className="flex justify-start">{number}</span>
            }
        },
        {
            Header: "Total Purchase Value",
            accessor: "stock_level_total_purchase_value_current",
            Cell: (props) => {
                const number = commifyCurrency(props.value)
                return <span className="flex justify-start">{number}</span>
            }
        },
        {
            Header: "Total Sale Value",
            accessor: "stock_level_total_sale_value_current",
            Cell: (props) => {
                const number = commifyCurrency(props.value)
                return <span className="flex justify-start">{number}</span>
            }
        },
    ];

  const handleCreateButton = (e) => {
    e.preventDefault();
    navigate(`/warehouses/new/`);
  };

  const data_if_empty = [
    {
      name: "",
    },
  ];

  return (
    <div className="flex h-full w-full py-6 px-8 justify-center bg-backgroundGrey">
      <div
        className="w-full h-full py-6 px-8 flex flex-col bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
        <div className="flex">
          <h1 className="text-title mb-2">Warehouses</h1>
        </div>
        {tableData?.length > 0 ? (
          <ListTable data={tableData} columns={columns}></ListTable>
        ) : (
          <ListTableIfEmpty
            data={data_if_empty}
            columns={columns}
          ></ListTableIfEmpty>
        )}
        <div>
          <img
            className="cursor-pointer absolute bottom-10 right-12"
            src={addButton}
            alt={"create new warehouse"}
            onClick={handleCreateButton}
          />
        </div>
      </div>
    </div>
  );
};

export default WarehouseTable;
