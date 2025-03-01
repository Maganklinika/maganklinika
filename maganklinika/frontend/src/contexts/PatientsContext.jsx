import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState({});
  const [appointmentsDoctor, setAppointmentsDoctor] = useState([]);
  const [treatmentOptions, setTreatmentOptions] = useState([]);

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
      const doctorId = 'id_a_doktortól';
      const response = await myAxios.get('/api/get-appointments-by-doctor', {
        params: { doctor_id: doctorId },
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
    fetchAppointmentstoDoctor();
    fetchTreatments();
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
        setTreatmentOptions,
        treatmentOptions,
  }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default function usePatientContext() {
  return useContext(PatientContext);
}
