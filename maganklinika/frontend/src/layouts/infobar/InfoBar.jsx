import React from "react";
import useAuthContext from "../../contexts/AuthContext";
import "./infobar.css";
import { Link } from "react-router-dom";

const InfoBar = () => {
  const { user } = useAuthContext();
  return (
    <div className="infobar">
      <div></div>
      <div className="user-info">
        {user ? (
          <p>Bejelentkezett felhasználó: <Link to="">{user.name}</Link></p>
          
        ) : (
          <p>Nincs bejelentkezett felhasználó. <Link to="/login">Bejelentkezés</Link></p>
        )}
      </div>
    </div>
  );
};

export default InfoBar;
