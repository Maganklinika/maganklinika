import React from "react";
import useAuthContext from "../../contexts/AuthContext";
import "./infobar.css";

const InfoBar = () => {
  const { user } = useAuthContext();
  return (
    <div className="infobar">
      <div></div>
      <div className="user-info">
        {user ? (
          <p>Bejelentkezett felhasználó: {user.name}</p>
        ) : (
          <p>Nincs bejelentkezett felhasználó</p>
        )}
      </div>
    </div>
  );
};

export default InfoBar;
