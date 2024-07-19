import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function MainContainer() {
  return (
    <div className="w-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
