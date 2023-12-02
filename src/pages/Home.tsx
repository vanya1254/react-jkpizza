import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/store";
import {
  setActivePage,
  setFilters,
  filterSelector,
} from "../redux/slices/filterSlice";
import { fetchItems, itemsSelector } from "../redux/slices/itemsSlice";
import { SortType } from "../redux/slices/filterSlice";

import { Categories } from "../components/Categories";
import { Sort, typesSort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import NotFoundBlock from "../components/NotFoundBlock";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { activeCategory, activeSortType, activePage, searchValue } =
    useSelector(filterSelector);
  const { items, status, pageCount } = useSelector(itemsSelector);

  const limit = 4;

  const getItems = async () => {
    // const filters = [
    //   activeCategory > 0 ? `category=${activeCategory}` : "",
    //   activeSortType.sortProperty !== "rating"
    //     ? `sortBy=${activeSortType.sortProperty}`
    //     : "",
    //   searchValue ? `title=*${searchValue.toLowerCase()}*` : "",
    //   activePage > 0 ? `page=${activePage}&limit=${limit}` : "",
    // ];

    // const activeFilters = filters
    //   .filter((filter) => filter)
    //   .map((filter, id) => (id === 0 ? `?${filter}` : `&${filter}`));
    // ${activeFilters.join("")}

    const sortBy: string = activeSortType.sortProperty;
    const category: string =
      activeCategory > 0 ? `category=${activeCategory}` : "";
    const search: string = searchValue ? `title=*${searchValue}*` : "";
    const page: string = `page=${activePage}&limit=${limit}`;
    //?${category}&sortBy=${sortBy}&${search}&${page}

    dispatch(
      fetchItems({
        // filters: activeFilters.join(" "),
        sortBy,
        category,
        search,
        page,
        setActivePage(currentPage: number) {
          dispatch(setActivePage(currentPage));
        },
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        category: activeCategory,
        sortBy: activeSortType.sortProperty,
        title: `*${searchValue.toLowerCase()}*`,
        page: activePage,
      });

      navigate(`?${querryString}`);
    }

    isMounted.current = true;
  }, [activeCategory, activeSortType.sortProperty, activePage]);

  React.useEffect(() => {
    if (window.location.search) {
      const { category, sortBy, title, page } = qs.parse(
        window.location.search.substring(1)
      );
      if (category && sortBy && title && page) {
        const sort = typesSort.find(
          (type) => type.sortProperty === sortBy
        ) as SortType;

        dispatch(
          setFilters({
            activeCategory: Number(category),
            activeSortType: sort,
            searchValue: String(title),
            activePage: Number(page),
          })
        );
      }

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getItems();
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
        {status === "error" ? (
          <NotFoundBlock />
        ) : status === "loading" ? (
          pizzaSkeletons
        ) : (
          pizzas
        )}
      </div>
      <Pagination pages={pageCount} />
    </div>
  );
};
