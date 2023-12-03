import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FilterSliceState, SortType } from "./types";

const initialState: FilterSliceState = {
  activeCategory: 0,
  activeSortType: {
    name: "популярности (DESC)",
    sortProperty: "rating",
  },
  activePage: 1,
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveSortType(state, action: PayloadAction<SortType>) {
      state.activeSortType = action.payload;
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.activeCategory = action.payload.activeCategory;
      state.activeSortType = action.payload.activeSortType;
      state.activePage = action.payload.activePage;
      state.searchValue = action.payload.searchValue;
    },
  },
});

export const {
  setActiveCategory,
  setActiveSortType,
  setActivePage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
