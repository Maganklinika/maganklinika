import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState({});

  const fetchAppointments = async () => {
    try {
      const response = await myAxios.get("/api/appointments");
      console.log(response.data); // Check the structure of the data
      groupAppointmentsByDate(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const groupAppointmentsByDate = (appointmentsArray) => {
    // Csoportosítjuk az appointments-t a start_time alapján dátum szerint
    const groupedAppointments = appointmentsArray.reduce((acc, appointment) => {
      // Csak a dátumot veszük figyelembe (YYYY-MM-DD)
      const date = appointment.start_time.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {});

    setAppointmentsByDate(groupedAppointments);
  };

  const fetchTreatmentsBySpecialization = async () => {
    console.log("valami");
    try {
      const treatmentsBySpecData = await myAxios.get(
        "/api/get-treatments-by-specialization"
      );
      setAppointments(treatmentsBySpecData.data);
      setFilteredList(treatmentsBySpecData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatientData = () => {
    fetchTreatmentsBySpecialization();
    fetchAppointments();
  };

  return (
    <PatientContext.Provider
      value={{
        setFilteredList,
        appointments,
        filteredList,
        fetchPatientData,
        appointmentsByDate,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default function usePatientContext() {
  return useContext(PatientContext);
}
