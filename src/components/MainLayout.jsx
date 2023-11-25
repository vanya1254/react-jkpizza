import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";

export const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
