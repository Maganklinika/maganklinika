import React, { useState } from "react";
import { myAxios } from "../api/Axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      // Küldjük a jelszó-visszaállító emailt
      const response = await myAxios.post("/forgot-password", { email });

      if (response.statusText === "OK") {
        setMessage("A jelszó-visszaállító linket elküldtük.");
      } else {
        setError("Valami hiba történt.");
      }
    } catch (err) {
      setError("Hiba történt: " + err.response.data.message);
    }
  };
  return (
    <div>
      <h2>Jelszó reset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Jelszó reset</button>
      </form>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default ForgotPassword;
