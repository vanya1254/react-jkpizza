import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";

import { ItemsLoadingContext } from "./context";

import "./scss/app.scss";

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://3fbdd3c00f84b334.mokky.dev/items").then((res) =>
      res.json().then((jsonArr) => {
        setItems(jsonArr);
        setIsLoading(false);
      })
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <ItemsLoadingContext.Provider value={{ items, isLoading }}>
          <Routes>
            <Route path="cart" element={<Cart />} />
            {items.length > 0 ? (
              <Route path="" element={<Home />} />
            ) : (
              <Route path="*" element={<NotFound />} />
            )}
          </Routes>
        </ItemsLoadingContext.Provider>
      </div>
    </div>
  );
}

export default App;
