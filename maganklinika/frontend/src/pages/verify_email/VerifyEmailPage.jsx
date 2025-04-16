import React from "react";
import useAuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./verifyEmail.css"
import { Button } from "react-bootstrap";

const VerifyEmailPage = () => {
  const { fetchEmailStatus, isVerified } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="email-verify">
      <h1>Email cím megerősítése</h1>
      <p>
        Kérjük, ellenőrizd az email fiókodat, és kattints a megerősítő
        linkre,hogy hozzáférhess az alkalmazáshoz.
      </p>
      <Button className="btn-primary"
        onClick={() => {
          fetchEmailStatus();
          if ( isVerified )
            navigate( "/" );
        }}
      >
        Újratölt
      </Button>
    </div>
  );
};

export default VerifyEmailPage;
