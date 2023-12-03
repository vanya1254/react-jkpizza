export type SortType = {
  name: string;
  sortProperty: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

export interface FilterSliceState {
  activeCategory: number;
  activeSortType: SortType;
  activePage: number;
  searchValue: string;
}
