import { createSlice } from "@reduxjs/toolkit";

export const orderCheckedPartner = createSlice({
  name: "order-checked-partner",
  initialState: {
    // checkeditems: {},
    checkedpartner: [],
  },
  reducers: {
    setCheckedPartner: (state, action) => {
      // const newCheckedItems = { ...action.payload };
      // state.checkeditems = newCheckedItems;
      const newCheckedPartner = action.payload;
      state.checkedpartner = newCheckedPartner;
    },
  },
});
export const { setCheckedPartner } = orderCheckedPartner.actions;
export default orderCheckedPartner.reducer;
