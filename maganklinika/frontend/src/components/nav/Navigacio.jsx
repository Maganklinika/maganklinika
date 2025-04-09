import React from "react";
import useAuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./nav.css";

const Navigacio = () => {
  const { navigation, logout } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <ul className="navbar-nav">
          {navigation ? (
            navigation.map((item, i) =>
              item.url !== "/logout" ? (
                <li className="navbar-item" key={i}>
                  <Link className="nav-link" to={item.url}>
                    {item.name}
                  </Link>
                </li>
              ) : (
                <li className="navbar-item" key={i} onClick={logout}>
                   <Link className="nav-link disable" to={item.url}>
                    {item.name}
                  </Link>
                </li>
              )
            )
          ) : (
            <li className="navbar-item">
              <span className="nav-link">Loading...</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigacio;
