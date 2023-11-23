import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItemsStatus",
  async (params, thunkAPI) => {
    const { sortBy, category, search, page, setActivePage } = params;

    const dispatch = thunkAPI.dispatch;

    const { data } = await axios.get(
      `https://3fbdd3c00f84b334.mokky.dev/items?${category}&sortBy=${sortBy}&${search}&${page}`
    );

    const { items, meta } = data;

    dispatch(setPageCount(meta.total_pages));
    setActivePage(meta.current_page);

    return items;
  }
);

const initialState = {
  items: [],
  pageCount: 1,
  status: "loading", //loading | success | error
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const itemsSelector = (state) => state.items;

export const { setItems, setPageCount } = itemsSlice.actions;

export default itemsSlice.reducer;
