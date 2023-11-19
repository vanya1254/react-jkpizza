import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  activeCategory: 0,
  activeSortType: {
    name: "популярности (DESC)",
    sortProperty: "rating",
  },
  activePage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSortType(state, action) {
      state.activeSortType = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    setFilters(state, action) {
      // state.items = action.payload.items;
      state.activeCategory = Number(action.payload.activeCategory);
      state.activeSortType = action.payload.activeSortType;
      state.activePage = Number(action.payload.activePage);
    },
  },
});

export const {
  setItems,
  setActiveCategory,
  setActiveSortType,
  setActivePage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
