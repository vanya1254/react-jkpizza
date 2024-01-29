import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import { MainLayout } from "./components";
import { Home } from "./pages/Home";

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart")
);
const Pizza = React.lazy(
  () => import(/*webpackChunkName: "Pizza"*/ "./pages/Pizza")
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound")
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="react-jkpizza/" element={<Home />} />
        <Route
          path="react-jkpizza/cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="react-jkpizza/pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Pizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
