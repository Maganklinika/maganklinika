import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorsWithSpec, setDoctorsWithSpec] = useState([]);
  const [filteredDoctorsList, setFilteredDoctorsList] = useState([]);
  const [appontmentsByDoctor, setAppontmentsByDoctor] = useState([]);

  const fetchDoctorsWithSpec = async () => {
    const response = await myAxios.get("/api/doctors-with-spec");
    setDoctorsWithSpec(response.data);
    setFilteredDoctorsList([...response.data]);
  };

  const fetchDoctorData = async () => {
    await fetchDoctorsWithSpec();
  };

  const fetchAppontmentsByDoctor = async () => {
    const response = myAxios.get("/api/get-appointments-by-doctor");
    setAppontmentsByDoctor(response.data);
  };

  return (
    <DoctorContext.Provider
      value={{
        fetchDoctorData,
        doctorsWithSpec,
        setFilteredDoctorsList,
        filteredDoctorsList,
        appontmentsByDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctorContext() {
  return useContext(DoctorContext);
}
