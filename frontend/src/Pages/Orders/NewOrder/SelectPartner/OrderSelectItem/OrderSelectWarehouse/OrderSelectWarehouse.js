import { useEffect, useState } from "react";
import ListTable from "../../../../../../Components/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import callAPI from "../../../../../../Axios/callAPI";
import {
  setWarehouse,
  setOrderQuantity,
  setShipping,
  setOrderNumber,
} from "../../../../../../Redux/Slices/orderBuySellRefund";
import { useNavigate } from "react-router-dom";

function OrderSelectWarehouse() {
  //#### SHOW WAREHOUSE LIST ####
  //retrieve type buy or sell and refund from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);
  const isOrderRefund = useSelector(
    (store) => store.orderbuysellrefund.isrefund
  );
  // store fetched Warehouse list here
  const [warehouseList, setWarehouseList] = useState([]);
  // retrieve selected item id from redux
  // (could be changed to be done only when needed -> see fetch below)
  const selectedItemId = useSelector(
    (store) => store.orderbuysellrefund.item.id
  );
  // fetch warehouse list
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
          ? `/warehouses/items/${selectedItemId}`
          : "/warehouses/";
      const response = await callAPI.get(endpoint, config);
      setWarehouseList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtainItemsInfo();
  }, []);

  //create columns model for warehouse list
  //different columns are shown depending on buy/sell/refund
  const columns =
    (isOrderBuy && isOrderRefund) || (!isOrderBuy && !isOrderRefund)
      ? [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Item Stock",
            accessor: `warehouse_item_inventory.filter(warehouse => warehouse.item === ${selectedItemId})[0].stock_level_current`,
          },
        ]
      : [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Total Stock",
            accessor: "stock_level_total_current",
          },
        ];

  //#### HANDLE WAREHOUSE SELECTION ####
  const [isWarehouseSelected, setIsWarehouseSelected] = useState(false);
  const dispatch = useDispatch(); //used later to update redux store
  //retrieve id of selected warehouse from redux
  const selectedWarehouseId = useSelector(
    (store) => store.checkeditems.checkeditems
  );
  //change status and store warehouse id in redux
  const handleSelectWarehouse = () => {
    if (selectedWarehouseId.length === 1) {
      setIsWarehouseSelected(true);
      dispatch(setWarehouse(selectedWarehouseId[0]));
    }
  };
  useEffect(handleSelectWarehouse, [selectedWarehouseId]);

  //#### HANDLE INPUT QUANTITY ####
  const [isQuantityValid, setIsQuantityValid] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setIsQuantityValid(true);
  };
  //when quantity is changed, update value in redux
  useEffect(() => {
    if (quantity > 0) {
      dispatch(setOrderQuantity(quantity));
    }
  }, [quantity]);

  //#### HANDLE INSERT ORDER NUMBER ####
  const [isOrderNrValid, setIsOrderNrValid] = useState(false);
  const [orderNr, setOrderNr] = useState(0);
  const handleOrderNrChange = (e) => {
    setOrderNr(e.target.value);
    setIsOrderNrValid(true);
  };
  //when order number is changed, update value in redux
  useEffect(() => {
    dispatch(setOrderNumber(orderNr));
  }, [orderNr]);

  //#### HANDLE INSERT SHIPPING DATE ####
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [shippingDate, setShippingDate] = useState(0);
  const handleShippingDateChange = (e) => {
    setShippingDate(e.target.value);
    setIsShippingValid(true);
  };
  //when shipping date is changed, update value in redux
  useEffect(() => {
    dispatch(setShipping(shippingDate));
  }, [shippingDate]);

  //#### SAVE BUTTON ####
  //toggle activate Save button
  const [allSelected, setAllSelected] = useState(false);
  useEffect(() => {
    if (
      isQuantityValid &&
      isWarehouseSelected &&
      isOrderNrValid &&
      isShippingValid
    ) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [isQuantityValid, isWarehouseSelected, isOrderNrValid, isShippingValid]);

  //retrieve order data from redux
  const orderNumber = useSelector((store) => store.orderbuysellrefund.ordernr);
  const shipmentDate = "2024-04-19T21:41:00.366027Z"; //TODO
  const partner = useSelector((store) => store.orderbuysellrefund.partner.id);
  const isMerchantSupplier = !useSelector(
    (store) => store.orderbuysellrefund.isbuy
  );
  const isRefund = useSelector((store) => store.orderbuysellrefund.isrefund);
  const warehouse = useSelector((store) => store.orderbuysellrefund.warehouse);
  const items = [useSelector((store) => store.orderbuysellrefund.item.id)];
  const orderQuantity = Number(
    useSelector((store) => store.orderbuysellrefund.quantity)
  );
  //post new order to backend when button clicked
  const createNewOrder = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await callAPI.post(
        `/orders/new/`,
        JSON.stringify({
          order_number: orderNumber,
          shipment_date: shipmentDate,
          partner: partner,
          is_merchant_supplier: isMerchantSupplier,
          is_refund: isRefund,
          warehouse: warehouse,
          items: items,
          quantity: orderQuantity,
        }),
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  //handle click on Save button
  const navigate = useNavigate();
  const handleSave = () => {
    createNewOrder();
    navigate("/orders");
  };

  return (
    <div>
      <div className="flex my-2 gap-16">
        <div className="flex">
          <div className="mt-1 mr-4">Quantity:</div>
          <div>
            <input
              onChange={handleQuantityChange}
              value={quantity}
              type="number"
              min="1"
              className="w-20"
            />
          </div>
        </div>
        <div className="flex">
          <div className="mt-1 mr-4">Order #:</div>
          <div>
            <input
              onChange={handleOrderNrChange}
              value={orderNr}
              className="w-40"
            />
          </div>
        </div>
        <div className="flex">
          <div className="mt-1 mr-4">Shipping date:</div>
          <div>
            <input
              onChange={handleShippingDateChange}
              value={shippingDate}
              type="date"
              className="w-40"
            />
          </div>
        </div>
      </div>
      <ListTable data={warehouseList} columns={columns} />
      <div>
        <button
          className={
            allSelected
              ? "bg-ifOrange text-white float-right w-20"
              : "border-2 border-drawGrey text-drawGrey cursor-default float-right w-20"
          }
          onClick={allSelected ? handleSave : () => {}}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default OrderSelectWarehouse;
