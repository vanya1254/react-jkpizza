import { configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";
import items from "./slices/itemsSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: { filter, items, cart },
});
