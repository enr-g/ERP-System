import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedItems } from "../../../../../Redux/Slices/tableCheckedItems.js";
import OrderSelectWarehouse from "./OrderSelectWarehouse/OrderSelectWarehouse.js";
import callAPI from "../../../../../Axios/callAPI.js";
import SelectItemTable from "./SelectItemTable/SelectItemTable.js";
import { setItem } from "../../../../../Redux/Slices/orderBuySellRefund.js";
import { setOrderCheckedItem } from "../../../../../Redux/Slices/orderCheckedItem.js";

function OrderSelectItem() {
  //#### SHOW ITEM LIST ####
  //retrieve type buy or sell and refund from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);
  const isOrderRefund = useSelector(
    (store) => store.orderbuysellrefund.isrefund
  );
  // store fetched items list here
  const [itemList, setItemList] = useState([]);
  // fetch items list
  const obtainItemsInfo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const endpoint =
        (isOrderBuy && isOrderRefund) || (!isOrderBuy && !isOrderRefund)
          ? "/items/order_outbound/"
          : "/items/order_inbound/";
      const response = await callAPI.get(endpoint, config);
      setItemList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtainItemsInfo();
  }, []);

  //create columns model for item list
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Size",
      accessor: "item_specifications[0].size",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "EAN",
      accessor: "ean",
    },
    {
      Header: "UPC",
      accessor: "upc",
    },
    {
      Header: "Stock",
      accessor: "stock_level_total_current",
    },
    {
      Header: "Cost",
      accessor: "item_specifications[0].purchase_price_net_eur",
    },
    {
      Header: "Price",
      accessor: "item_specifications[0].sale_price_net_eur",
    },
  ];

  //#### HANDLE ITEM SELECTION ####
  const [isItemSelected, setIsItemSelected] = useState(false);
  //retrieve id of selected item from redux
  const selectedItemId = useSelector(
    (store) => store.ordercheckeditem.ordercheckeditem
  );
  //change status
  const handleSelectItem = () => {
    if (selectedItemId.length === 1) {
      setIsItemSelected(true);
    }
  };
  useEffect(handleSelectItem, [selectedItemId]);

  //store the selected items's data fetched from the backend here
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch(); //used later to update redux store
  //fetch item data from backend
  const fetchItemData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await callAPI.get(
        `/items/${selectedItemId[0]}/`,
        config
      );
      setItemData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItemData();
  }, [selectedItemId]);

  //change an already selected item
  const handleChangeItem = () => {
    setIsItemSelected(false);
    dispatch(setOrderCheckedItem([]));
  };
  //store item data in redux when local state changes
  useEffect(() => {
    dispatch(setItem(itemData));
  }, [itemData]);

  return (
    <div>
      <div className="flex flex-col">
        {isItemSelected ? (
          <div className="flex justify-between">
            <div className="pt-4">
              {itemData.name} - size: {itemData.item_specifications ? itemData.item_specifications[0].size : ""}
            </div>
            <div className="m-2">
              <button
                onClick={handleChangeItem}
                className="float-right text-buttonGrey border-2 border-buttonGrey w-24"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <SelectItemTable data={itemList} columns={columns} />
        )}
      </div>
      <div>
        {isItemSelected ? (
          <div>
            <h2 className=" bg-backgroundGrey text-section py-2 px-4 mt-4">
              Quantity & Warehouse
            </h2>
            <OrderSelectWarehouse />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderSelectItem;
