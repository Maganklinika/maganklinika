import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorsWithSpec, setDoctorsWithSpec] = useState([]);
  const [filteredDoctorsList, setFilteredDoctorsList] = useState([]);

  const fetchDoctorsWithSpec = async () => {
    const response = await myAxios.get("/api/doctors-with-spec");
    setDoctorsWithSpec(response.data);
    setFilteredDoctorsList([...response.data]);
  };

  const fetchDoctorData = async () => {
    await fetchDoctorsWithSpec();
  };

  return (
    <DoctorContext.Provider
      value={{
        fetchDoctorData,
        doctorsWithSpec,
        setFilteredDoctorsList,
        filteredDoctorsList,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctorContext() {
  return useContext(DoctorContext);
}
