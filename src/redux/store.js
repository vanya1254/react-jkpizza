import { configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filterSlice";
import items from "./slices/itemsSlice";

export const store = configureStore({
  reducer: { filter, items },
});
