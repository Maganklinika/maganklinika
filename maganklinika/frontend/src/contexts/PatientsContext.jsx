import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState({});
  const [appointmentsDoctor, setAppointmentsDoctor] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await myAxios.get("/api/appointments");
      groupAppointmentsByDate(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const fetchAppointmentstoDoctor = async () => {
    try {
      const doctorId = 'id_a_doktortól'; // Itt cseréld ki arra a megfelelő módra, ahogy megkapod a doktor ID-t
      const response = await myAxios.get('/api/get-appointments-by-doctor', {
        params: { doctor_id: doctorId }, // átadjuk a doctor_id paramétert
      });
      setAppointmentsDoctor(response.data);
    } catch (error) {
      console.error('Hiba az időpontok lekérésekor:', error);
    }
  };
  
  
    const fetchDoctorAppointments = async (doctorId) => {
      try {
        const response = await myAxios.get('/api/get-appointments-by-doctor', {
          params: { doctor_id: doctorId }
        });
        console.log('Appointments:', response.data);
        setAppointmentsDoctor(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
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
    fetchAppointmentstoDoctor();
  };

  return (
    <PatientContext.Provider
      value={{
        setFilteredList,
        appointments,
        filteredList,
        fetchPatientData,
        appointmentsByDate,
        appointmentsDoctor,
        fetchDoctorAppointments,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default function usePatientContext() {
  return useContext(PatientContext);
}
