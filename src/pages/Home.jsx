import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setItems,
  setActivePage,
  setFilters,
} from "../redux/slices/filterSlice";

import { Categories } from "../components/Categories";
import { Sort, typesSort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

import { SearchContext } from "../context";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeCategory, activeSortType, activePage } = useSelector(
    (state) => state.filter
  );

  const items = useSelector((state) => state.filter.items);

  const { searchValue } = React.useContext(SearchContext);

  // const [items, setItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [activePage, setActivePage] = React.useState(1);
  const limit = 4;

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     console.log(params);

  //     const activeSortType = typesSort.find(
  //       (type) => type.sortProperty === params.sortProperty
  //     );
  //     console.log({ ...params, activeCategory });

  //     dispatch(setFilters({ ...params, activeSortType }));
  //   }
  // });

  React.useEffect(() => {
    const filters = [
      activeCategory > 0 ? `category=${activeCategory}` : "",
      activeSortType.sortProperty !== "rating"
        ? `sortBy=${activeSortType.sortProperty}`
        : "",
      searchValue ? `title=*${searchValue.toLowerCase()}*` : "",
      activePage > 0 ? `page=${activePage}&limit=${limit}` : "",
    ];

    const activeFilters = filters
      .filter((filter) => filter)
      .map((filter, id) => (id === 0 ? `?${filter}` : `&${filter}`));

    // const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    // const sort = `sortBy=${activeSortType.sortProperty}`;
    // const search = `title=${searchValue}`;
    //?${category}&${sort}&${search}

    axios
      .get(`https://3fbdd3c00f84b334.mokky.dev/items${activeFilters.join("")}`)
      .then((res) => {
        dispatch(setItems(res.data.items));
        setPageCount(res.data.meta.total_pages);
        dispatch(setActivePage(res.data.meta.current_page));
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [dispatch, activeCategory, activeSortType, searchValue, activePage]);

  React.useEffect(() => {
    const querryString = qs.stringify({
      activeCategory,
      sortProperty: activeSortType.sortProperty,
      // title: `*${searchValue.toLowerCase()}*`,
      activePage: `${activePage}&limit=${limit}`,
    });

    console.log(querryString);

    navigate(`?${querryString}`);
  }, [activeCategory, activeSortType.sortProperty, activePage]);

  const pizzaSkeletons = [...new Array(6)].map((_, id) => (
    <Skeleton key={id} />
  ));
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? pizzaSkeletons : pizzas}
      </div>
      <Pagination pages={pageCount} limitPages={limit} />
    </div>
  );
};
