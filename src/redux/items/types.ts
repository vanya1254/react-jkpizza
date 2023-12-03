export type FetchItemsParams = {
  sortBy: string;
  category: string;
  search: string;
  page: string;
  setActivePage: (page: number) => void;
};

export type FetchMeta = Record<string, number>;

export interface FetchData {
  items: PizzaItem[];
  meta: FetchMeta;
}

export type PizzaItem = {
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

export interface ItemsSliceState {
  items: PizzaItem[];
  pageCount: number;
  status: Status;
}
