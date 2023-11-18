import React from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

import { SearchContext } from "../context";

export const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSortType, setActiveSortType] = React.useState({
    name: "популярности (DESC)",
    sortProperty: "rating",
  });
  const [activePage, setActivePage] = React.useState(1);
  const limit = 4;

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

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

    fetch(
      `https://3fbdd3c00f84b334.mokky.dev/items${activeFilters.join("")}`
    ).then((res) =>
      res.json().then((jsonArr) => {
        setItems(jsonArr.items);
        setPageCount(jsonArr.meta.total_pages);
        setActivePage(jsonArr.meta.current_page);
        setIsLoading(false);
      })
    );
    window.scrollTo(0, 0);
  }, [activeCategory, activeSortType, searchValue, activePage]);

  const pizzaSkeletons = [...new Array(6)].map((_, id) => (
    <Skeleton key={id} />
  ));
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={activeCategory}
          onChangeCategory={(id) => setActiveCategory(id)}
        />
        <Sort
          typeId={activeSortType}
          onChangeSort={(id) => setActiveSortType(id)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? pizzaSkeletons : pizzas}
      </div>
      <Pagination
        pages={pageCount}
        onChangePage={(page) => setActivePage(page)}
        limitPages={limit}
      />
    </div>
  );
};
