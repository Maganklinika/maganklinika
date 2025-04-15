import React, { useEffect, useRef, useState } from "react";
import useAuthContext from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";

const Navigacio = () => {
  const { navigation, logout } = useAuthContext();
  const logoutRef = useRef();
  const navRef = useRef();
  const [isOverlapping, setIsOverlapping] = useState(false);
  const location = useLocation();

  const checkLayout = () => {
    const logoutEl = logoutRef.current;
    const navEl = navRef.current;

    if (!logoutEl || !navEl) return;

    const logoutRect = logoutEl.getBoundingClientRect();
    const navItems = Array.from(navEl.children).filter((li) => li !== logoutEl);

    // Ellenőrzés, hogy ütközik-e a logout gomb a többi elemmel
    const isOverlap = navItems.some((li) => {
      const liRect = li.getBoundingClientRect();
      return !(
        logoutRect.right < liRect.left ||
        logoutRect.left > liRect.right ||
        logoutRect.bottom < liRect.top ||
        logoutRect.top > liRect.bottom
      );
    });

    // Ellenőrzés, hogy minden elem egy sorban van-e
    const tops = new Set(navItems.map((li) => li.getBoundingClientRect().top));
    const isSingleLine = tops.size === 1;

    const shouldMove = !(isSingleLine && !isOverlap);

    // Frissítjük az állapotot, ha szükséges
    if (shouldMove !== isOverlapping) {
      setIsOverlapping(shouldMove);
    }
  };

  // A ResizeObserver és a resize események kezelése
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkLayout); // Frissítjük a layoutot a legközelebbi animációs frissítésnél
    });

    if (navRef.current) resizeObserver.observe(navRef.current);
    if (logoutRef.current) resizeObserver.observe(logoutRef.current);

    window.addEventListener("resize", checkLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkLayout);
    };
  }, []); // Csak egyszer indítjuk el

  // Az inicializálás és újraellenőrzés
  useEffect(() => {
    requestAnimationFrame(checkLayout); // Azonnali layout frissítés az oldalon
  }, [navigation]); // Akkor is újraellenőrizzük, ha a navigáció változik

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <ul className="navbar-nav" ref={navRef}>
          {navigation ? (
            navigation.map((item, i) => {
              const isLogout = item.url === "/logout";
              const isActive = location.pathname === item.url;
              return (
                <li
                  className={`navbar-item ${isLogout ? "logout" : ""} ${
                    isLogout && isOverlapping ? "static-logout" : ""
                  } ${isActive ? "active" : ""}`}
                  key={i}
                  onClick={isLogout ? logout : undefined}
                  ref={isLogout ? logoutRef : undefined}
                >
                  <Link className="nav-link" to={item.url}>
                    {item.name}
                  </Link>
                </li>
              );
            })
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
