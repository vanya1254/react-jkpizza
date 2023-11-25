import React from "react";
import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./components/MainLayout";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Pizza } from "./pages/Pizza";
import { NotFound } from "./pages/NotFound";

import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<Pizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
