import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const PatientContext = createContext();


export const PatientProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState({});
  const [appointmentsDoctor, setAppointmentsDoctor] = useState([]);
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [bookingStatusChange, setBookingStatusChange] = useState({});

  const fetchAppointments = async () => {
    try {
      const response = await myAxios.get("/api/appointments");
      groupAppointmentsByDate(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const fetchAvailableAppointments = async (treatmentId) => {
  
    try {
      const response = await fetch(`http://localhost:8000/api/get-available-appointments?treatment_id=${treatmentId}`);
      if (!response.ok) {
        throw new Error(`Hiba az API hívásban: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return undefined;
    }
  };
  

  const fetchDoctorAppointments = async (doctorId) => {
    try {
      const response = await myAxios.get("/api/get-appointments-by-doctor", {
        params: { doctor_id: doctorId },
      });
      setAppointmentsDoctor(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const groupAppointmentsByDate = (appointmentsArray) => {
    const groupedAppointments = appointmentsArray.reduce((acc, appointment) => {
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

  const fetchTreatments = async () => {
    try {
      const response = await myAxios.get("/api/get-treatments");
      setTreatmentOptions(response.data);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  };

  const fetchPatientData = () => {
    fetchTreatmentsBySpecialization();
    fetchAppointments();
    fetchTreatments();
  };

  const bookingAppointment = async (id) => {
    const response = await myAxios.put(`/api/booking-appointment/${id}`)
    setBookingStatusChange(response.data)
  }

  const fetchAppointmentRating = async (id, rating) => {
    try {
        const response = await myAxios.put(`/api/profile/rate/${id}`, { rating });
    } catch (error) {
        console.error("Hiba az értékelés mentésekor:", error.response?.data || error.message);
    }
};


  const fetchCancelAppointmentByPatient = async (id) => {
    await myAxios.put(`/api/cancel-appointment-by-patient/${id}`)
  }

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
        setTreatmentOptions,
        treatmentOptions,
        fetchAvailableAppointments,
        bookingAppointment,
        bookingStatusChange,
        fetchAppointmentRating,
        fetchCancelAppointmentByPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default function usePatientContext() {
  return useContext(PatientContext);
}
