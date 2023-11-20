import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setActivePage, setFilters } from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/itemsSlice";

import { Categories } from "../components/Categories";
import { Sort, typesSort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

import { SearchContext } from "../context";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { activeCategory, activeSortType, activePage } = useSelector(
    (state) => state.filter
  );
  const { items, cartItems } = useSelector((state) => state.items);

  const { searchValue } = React.useContext(SearchContext);

  const [pageCount, setPageCount] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  const limit = 4;

  const fetchItems = () => {
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
    // ${activeFilters.join("")}

    // const sortBy = activeSortType.sortProperty;
    // const category = activeCategory > 0 ? `category=${activeCategory}` : "";
    // const search = searchValue ? `title=*${searchValue}*` : "";
    //?page=${activePage}&limit=4&${category}&sortBy=${sortBy}&${search}

    axios
      .get(`https://3fbdd3c00f84b334.mokky.dev/items${activeFilters.join("")}`)
      .then((res) => {
        dispatch(setItems(res.data.items));
        setPageCount(res.data.meta.total_pages);
        dispatch(setActivePage(res.data.meta.current_page));
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        category: activeCategory,
        sortBy: activeSortType.sortProperty,
        // title: `*${searchValue.toLowerCase()}*`,
        page: activePage,
      });

      navigate(`?${querryString}`);
    }

    isMounted.current = true;
  }, [activeCategory, activeSortType.sortProperty, activePage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortBy = typesSort.find(
        (type) => type.sortProperty === params.sortBy
      );

      dispatch(setFilters({ ...params, sortBy }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchItems();
    }

    isSearch.current = false;
  }, [
    dispatch,
    activeCategory,
    activeSortType.sortProperty,
    searchValue,
    activePage,
  ]);

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
