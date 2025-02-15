import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/Axios";
import useAuthContext from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
    const { user, isVerified } = useAuthContext();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([])
    const [filteredList, setFilteredList] = useState([]);


    const fetchTreatmentsBySpecialization = async () => {
        console.log('valami')
        try {
            const treatmentsBySpecData = await myAxios.get("/api/get-treatments-by-specialization");
            setAppointments(treatmentsBySpecData.data)
            setFilteredList(treatmentsBySpecData.data)

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTreatmentsBySpecialization()
        if (user && user.role_id === 3) {
            if (isVerified) {

            }
        }
    }, [])

    return (
        <PatientContext.Provider
            value={{
                setFilteredList,
                appointments,
                filteredList,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};

export default function usePatientContext() {
    return useContext(PatientContext);
}
