import React from "react";
import Navigacio from "../components/nav/Navigacio";
import { Outlet } from "react-router-dom";
import InfoBar from "./infobar/InfoBar";

const VendegLayout = () => {
  return (
    <>
      <InfoBar />
      <Navigacio />
      <Outlet />
    </>
  );
};

export default VendegLayout;
