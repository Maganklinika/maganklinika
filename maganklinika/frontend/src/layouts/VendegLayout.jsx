import React from "react";
import Navigacio from "../components/nav/Navigacio";
import { Outlet } from "react-router-dom";
import InfoBar from "./infobar/InfoBar";
import Footer from "./footer/Footer";

const VendegLayout = () => {
  return (
    <div id="root">
      <InfoBar />
      <Navigacio />
      <Outlet />
      <Footer />
    </div>
  );
};

export default VendegLayout;
