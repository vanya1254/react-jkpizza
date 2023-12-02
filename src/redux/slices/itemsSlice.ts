import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type FetchItemsParams = {
  sortBy: string;
  category: string;
  search: string;
  page: string;
  setActivePage: (page: number) => void;
};

type FetchMeta = Record<string, number>;

interface FetchData {
  items: PizzaItem[];
  meta: FetchMeta;
}

type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  PENDING = "loading",
  FULFILLED = "success",
  REJECTED = "error",
}

interface ItemsSliceState {
  items: PizzaItem[];
  pageCount: number;
  status: Status;
}

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

export const itemsSelector = (state: RootState) => state.items;

export const { setItems, setPageCount } = itemsSlice.actions;

export default itemsSlice.reducer;
