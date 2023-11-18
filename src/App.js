import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";

import { SearchContext } from "./context";

import "./scss/app.scss";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="cart" element={<Cart />} />
            {/* {items.length > 0 ? ( */}
            <Route path="" element={<Home />} />
            {/* ) : ( */}
            <Route path="*" element={<NotFound />} />
            {/* )} */}
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
