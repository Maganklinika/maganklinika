import { createContext, useContext } from "react";

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const fetchDoctorData = () => {};

  return (
    <DoctorContext.Provider value={{ fetchDoctorData }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctorContext() {
  return useContext(DoctorContext);
}
