import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminProvider } from "./contexts/AdminContext";
import { PatientProvider } from "./contexts/PatientsContext";
import { DoctorProvider } from "./contexts/DoctorContext";
import "./variables.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientProvider>
        <DoctorProvider>
          <AdminProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </AdminProvider>
        </DoctorProvider>
      </PatientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
