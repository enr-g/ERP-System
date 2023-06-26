import SelectPartner from "./SelectPartner/SelectPartner";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderIsBuy,
  setOrderIsRefund,
} from "../../../Redux/Slices/orderBuySellRefund";
import { useNavigate } from "react-router-dom";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";

function NewOrder() {
  //retrieve type buy or sell from redux
  const isOrderBuy = useSelector((store) => store.orderbuysellrefund.isbuy);

  //handle user selection buy/sell
  const dispatch = useDispatch(); //state is in redux
  const changeOrderType = () => {
    dispatch(setOrderIsBuy()); //toggle type buy/sell in redux
  };

  //handle choice refund or not
  const isOrderRefund = useSelector(
    (store) => store.orderbuysellrefund.isrefund
  );
  const changeIsRefund = () => {
    dispatch(setOrderIsRefund());
  };

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
        <h1 className="text-title">New Order</h1>
        </div>
        <div className="flex gap-8">
          <div className="flex">
            <div className="pt-[10px] mr-2 text-buttonGrey">Type: </div>
            <button
              onClick={changeOrderType}
              className={
                isOrderBuy
                  ? "rounded-r-none bg-ifOrange text-white"
                  : "rounded-r-none border-2 border-ifOrange text-buttonGrey"
              }
            >
              Buy
            </button>
            <button
              onClick={changeOrderType}
              className={
                isOrderBuy
                  ? "rounded-l-none border-2 border-ifOrange text-buttonGrey"
                  : "rounded-l-none bg-ifOrange text-white"
              }
            >
              Sell
            </button>
          </div>
          <div className="flex">
            <div className="pt-[10px] mr-2 text-buttonGrey">Refund: </div>
            <button
              onClick={changeIsRefund}
              className={
                isOrderRefund
                  ? "rounded-r-none bg-ifOrange text-white"
                  : "rounded-r-none border-2 border-ifOrange text-buttonGrey"
              }
            >
              Yes
            </button>
            <button
              onClick={changeIsRefund}
              className={
                isOrderRefund
                  ? "rounded-l-none border-2 border-ifOrange text-buttonGrey"
                  : "rounded-l-none bg-ifOrange text-white"
              }
            >
              No
            </button>
          </div>
        </div>
        <h2 className=" bg-backgroundGrey text-section px-4 py-2 mt-4">
          {isOrderBuy ? "Supplier" : "Customer"}
        </h2>
        <div className="my-2">
          {/* it will need to get the data for the table as props */}
          <SelectPartner />
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
