import React from "react";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import { setActivePage } from "../../redux/slices/filterSlice";

import styles from "./Pagination.module.scss";

export const Pagination = ({ pages, limitPages }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setActivePage(event.selected + 1))}
      pageRangeDisplayed={limitPages}
      pageCount={pages}
      // forcePage={activePage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
