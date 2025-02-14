import React from "react";
import useAuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const { fetchEmailStatus, isVerified } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Email cím megerősítése</h1>
      <p>
        Kérjük, ellenőrizd az email fiókodat, és kattints a megerősítő
        linkre,hogy hozzáférhess az alkalmazáshoz.
      </p>
      <button
        onClick={() => {
          fetchEmailStatus();
          if ( isVerified )
            navigate( "/" );
        }}
      >
        Újratölt
      </button>
    </div>
  );
};

export default VerifyEmailPage;
