import { configureStore } from "@reduxjs/toolkit";
import { signUpEmailAddress } from "./Slices/signUpEmailAddress";
import currentUser from "./Slices/currentUser";
import tableCheckedItems from "./Slices/tableCheckedItems";
import orderBuySellRefund from "./Slices/orderBuySellRefund";
import orderCheckedPartner from "./Slices/orderCheckedPartner";
import orderCheckedItem from "./Slices/orderCheckedItem";

export default configureStore({
  reducer: {
    signupemail: signUpEmailAddress,
    currentuser: currentUser,
    checkeditems: tableCheckedItems,
    orderbuysellrefund: orderBuySellRefund,
    checkedpartner: orderCheckedPartner,
    ordercheckeditem: orderCheckedItem,
  },
});
