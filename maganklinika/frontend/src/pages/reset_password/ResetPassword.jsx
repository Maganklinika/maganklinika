import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { myAxios } from "../../api/Axios";
import "./resetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("A jelszavak nem egyeznek.");
      return;
    }

    if (!token || !email) {
      setError("A token vagy email cím hiányzik.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await myAxios.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      if (response.data.status === "Your password has been reset.") {
        setSuccess("Sikeresen megváltoztatta a jelszavát.");
        navigate("/login");
      }
    } catch (err) {
      setError(
        "Hiba történt: " + (err.response?.data?.message || "Ismeretlen hiba.")
      );
    }
  };

  return (
    <div className="reset-password">
      <h2>Új jelszó</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Új jelszó</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Új jelszó megerősítése</label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="btn btn-primary w-100" type="submit">
            Jelszó visszaállítása
          </button>
        </div>
      </form>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
};
export default ResetPassword;
