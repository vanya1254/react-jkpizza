import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {
  FetchData,
  FetchItemsParams,
  ItemsSliceState,
  PizzaItem,
  Status,
} from "./types";

export const fetchItems = createAsyncThunk<PizzaItem[], FetchItemsParams>(
  "items/fetchItemsStatus",
  async (params, thunkAPI) => {
    const { sortBy, category, search, page, setActivePage } = params;

    const dispatch = thunkAPI.dispatch;

    const { data } = await axios.get<FetchData>(
      `https://3fbdd3c00f84b334.mokky.dev/items?${category}&sortBy=${sortBy}&${search}&${page}`
    );

    const { items, meta } = data;

    dispatch(setPageCount(meta.total_pages));
    setActivePage(meta.current_page);

    return items;
  }
);

const initialState: ItemsSliceState = {
  items: [],
  pageCount: 1,
  status: Status.PENDING,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = Status.PENDING;
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.FULFILLED;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = Status.REJECTED;
        state.items = [];
      });
  },
});
export const { setItems, setPageCount } = itemsSlice.actions;
export default itemsSlice.reducer;
