import React from "react";
import "./disabledUser.css";
import { Button } from "react-bootstrap";
import useAuthContext from "../../contexts/AuthContext";

const DisabledUser = () => {
  const { logout } = useAuthContext();
  return (
    <div className="disabled-user">
      <h1>A felhasználói fiókod inaktiválták!</h1>
      <Button className="btn-primary" onClick={logout}>
        Kijelentkezés
      </Button>
    </div>
  );
};

export default DisabledUser;
