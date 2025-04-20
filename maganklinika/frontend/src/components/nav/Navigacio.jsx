import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import "./nav.css";

const Navigacio = () => {
  const { navigation, logout } = useAuthContext();
  const location = useLocation();

  if (!navigation) {
    return (
      <nav className="navbar navbar-expand-sm fixed-top">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <span className="nav-link">Loading...</span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  const mainNav = navigation.filter(
    (item) => !["/login", "/logout", "/register"].includes(item.url)
  );
  const authNav = navigation.filter((item) =>
    ["/login", "/logout", "/register"].includes(item.url)
  );

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <ul className="navbar-nav">
          {mainNav.map((item, i) => {
            const isActive = location.pathname === item.url;
            return (
              <li className={`navbar-item ${isActive ? "active" : ""}`} key={i}>
                <Link className="nav-link" to={item.url}>
                  {item.name}
                </Link>
              </li>
            );
          })}

          <div className="navbar-auth">
            {authNav.map((item, i) => {
              const isActive = location.pathname === item.url;
              const isLogout = item.url === "/logout";
              return (
                <li
                  key={i}
                  className={`navbar-item ${isActive ? "active" : ""}`}
                  onClick={isLogout ? logout : undefined}
                >
                  <Link className="nav-link" to={item.url}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navigacio;
