import React from "react";
import useAuthContext from "../contexts/AuthContext";

const Fooldal = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Kezdőlap</h1>
    </div>
  );
};

export default Fooldal;
