import { createSlice } from "@reduxjs/toolkit";

export const orderCheckedItem = createSlice({
  name: "order-checked-item",
  initialState: {
    // checkeditems: {},
    ordercheckeditem: [],
  },
  reducers: {
    setOrderCheckedItem: (state, action) => {
      // const newCheckedItems = { ...action.payload };
      // state.checkeditems = newCheckedItems;
      const newCheckedItem = action.payload;
      state.ordercheckeditem = newCheckedItem;
    },
  },
});
export const { setOrderCheckedItem } = orderCheckedItem.actions;
export default orderCheckedItem.reducer;
