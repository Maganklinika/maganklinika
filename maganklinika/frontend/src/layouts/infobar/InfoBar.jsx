import React from "react";
import useAuthContext from "../../contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import "./infobar.css";


const InfoBar = () => {
  const { user, navigation } = useAuthContext();
  const location = useLocation();
  const pathnames = location.pathname
  console.log( pathnames )

  const elements = navigation.map( ( e ) => (
    e.url === pathnames ? e : null
  ) ).filter( ( e ) => e )

  return (
    <div className="infobar">
      <div className="bread-crum">
        <Breadcrumb className="custom-breadcrumb">
          {
            pathnames !== "/" ?
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Főoldal
              </Breadcrumb.Item>
              :
              ""
          }
          {elements.map( ( e, index ) => {
            const routeTo = e.url;
            const isLast = index === elements.length - 1;

            return (
              <Breadcrumb.Item
                key={routeTo}
                active={isLast}
                linkAs={!isLast ? Link : undefined}
                linkProps={!isLast ? { to: routeTo } : undefined}
              >
                {e.name.charAt( 0 ).toUpperCase() + e.name.slice( 1 )}
              </Breadcrumb.Item>
            );
          } )}
        </Breadcrumb>
      </div>

      <div className="user-info">
        {user ? (
          <p>Bejelentkezett felhasználó: <Link to="/profile">{user.name}</Link></p>

        ) : (
          <p>Nincs bejelentkezett felhasználó. <Link to="/login">Bejelentkezés</Link></p>
        )}
      </div>
    </div>
  );
};

export default InfoBar;
