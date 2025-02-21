import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorsWithSpec, setDoctorsWithSpec] = useState([]);
  const [filteredDoctorsList, setFilteredDoctorsList] = useState([]);
  const [appointmentsByDoctor, setAppointmentsByDoctor] = useState([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState({});


  const fetchDoctorsWithSpec = async () => {
    const response = await myAxios.get("/api/doctors-with-spec");
    setDoctorsWithSpec(response.data);
    setFilteredDoctorsList([...response.data]);
  };


  const fetchDoctorData = async () => {
    await fetchDoctorsWithSpec();
    await fetchAppontmentsByDoctor();
  };

  const fetchAppontmentsByDoctor = async () => {
    const response = await myAxios.get("/api/get-appointments-by-doctor");
    setAppointmentsByDoctor(response.data);
    groupAppointmentsByDate(response.data);
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

  return (
    <DoctorContext.Provider
      value={{
        fetchDoctorData,
        doctorsWithSpec,
        setFilteredDoctorsList,
        filteredDoctorsList,
        appointmentsByDoctor,
        appointmentsByDate,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctorContext() {
  return useContext(DoctorContext);
}
