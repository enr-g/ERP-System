import React, { useEffect } from "react";
import moment from 'moment';

function OrderPrimaryDetails(props) {
  const orderDate = moment(props.order?.order_date).format("dddd, MMMM Do YYYY")
  const shippingDate = moment(props.order?.shipment_date).format("dddd, MMMM Do YYYY")

  return (
    <div>
      <div className="flex items-center justify-between bg-backgroundGrey px-4 h-10">
        <h2 className="text-section">Primary Details</h2>
      </div>
      <div className="flex w-full py-4">
        <div className="flex w-full justify-around gap-4">
          <div className="flex w-1/2 flex-col gap-1">
            <div>
              Type:
              <span className="pl-2">
                {props?.order.is_merchant_supplier ? "Supply" : "Purchase"}
              </span>
            </div>
            <div>
              Date: <span className="pl-2">{orderDate}</span>
            </div>
            <div>
              Partner: <span className="pl-2">{props.order.partner?.name}</span>
            </div>
            <div>
              Item qty.: <span className="pl-2">{props?.order.quantity}</span>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-1">
            <div>
              Refund:
              <span className="pl-2">{props?.order.is_refund ? "Yes" : "No"}</span>
            </div>
            <div>
              Shipping date:
              <span className="pl-2">{shippingDate}</span>
            </div>
            <div>
              Warehouse: <span className="pl-2">{props.order.warehouse?.name}</span>
            </div>
            <div>
              Total: <span className="pl-2">{props.order?.value_total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPrimaryDetails;
