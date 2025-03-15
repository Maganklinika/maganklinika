import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const DoctorContext = createContext();

export const DoctorProvider = ( { children } ) => {
  const [ doctorsWithSpec, setDoctorsWithSpec ] = useState( [] );
  const [ filteredDoctorsList, setFilteredDoctorsList ] = useState( [] );
  const [ appointmentsByDoctor, setAppointmentsByDoctor ] = useState( [] );
  const [ appointmentsByDate, setAppointmentsByDate ] = useState( {} );
  const [ allPatients, setAllPatients ] = useState( [] );
  const [ filteredAllPatientsList, setFilteredAllPatientsList ] = useState( [] );
  const [ patientsByAppointments, setPatientsByAppointments ] = useState( [] );
  const [
    filteredPatientsByAppointmentsList,
    setFilteredPatientsByAppointmentsList,
  ] = useState( [] );
  const [ appointmentsByPatients, setAppointmentsByPatients ] = useState( [] );
  const [ appointmentCount, setAppointmentCount ] = useState( [] );


  const appointmentDeleteByDoctor = async ( id ) => {
    try {
      await myAxios.put( `/api/appointment-delete-by-doctor/${ id }` )
    } catch ( error ) {
      console.log( error )
    }
  }

  const appointmentCancelDeleteByDoctor = async ( id ) => {
    try {
      await myAxios.put( `/api/appointment-cancel-delete-by-doctor/${ id }` )
    } catch ( error ) {
      console.log( error )
    }
  }


  const fetchAllPatients = async () => {
    const response = await myAxios.get( "/api/get-all-patients-with-name" );
    setAllPatients( response.data );
    setFilteredAllPatientsList( [ ...response.data ] );
  };

  const fetchAppointmentByPatients = async ( pac_id ) => {
    const response = await myAxios.get(
      `/api/get-appointments-by-patients/${ pac_id }`
    );
    setAppointmentsByPatients( response.data );
  };

  const fetchAppointmentsCount = async () => {
    const response = await myAxios.get( `/api/get-appointments-count` );
    setAppointmentCount( response.data );
  };

  const fetchPatientsByAppointments = async () => {
    const response = await myAxios.get( "/api/get-patients-to-auth-doctor" );
    setPatientsByAppointments( response.data );
    setFilteredPatientsByAppointmentsList( [ ...response.data ] );
  };

  const fetchDoctorsWithSpec = async () => {
    const response = await myAxios.get( "/api/doctors-with-spec" );
    setDoctorsWithSpec( response.data );
    setFilteredDoctorsList( [ ...response.data ] );
  };

  const fetchDoctorData = async () => {
    await fetchDoctorsWithSpec();
    //await fetchAppontmentsByDoctor();
    await fetchPatientsByAppointments();
    await fetchAppointmentsCount();
  };

  const fetchAppontmentsByDoctor = async ( doctor_id ) => {
    console.log( doctor_id )
    const response = await myAxios.get( "/api/get-appointments-by-doctor", {
      params: {
        doctor_id: doctor_id, // A doctor_id értéke, amit át akarsz adni
      }
    } );
    setAppointmentsByDoctor( response.data );
    groupAppointmentsByDate( response.data );
  };

  const groupAppointmentsByDate = ( appointmentsArray ) => {
    // Csoportosítjuk az appointments-t a start_time alapján dátum szerint
    const groupedAppointments = appointmentsArray.reduce( ( acc, appointment ) => {
      // Csak a dátumot veszük figyelembe (YYYY-MM-DD)
      const date = appointment.start_time.split( " " )[ 0 ];
      if ( !acc[ date ] ) {
        acc[ date ] = [];
      }
      acc[ date ].push( appointment );
      return acc;
    }, {} );

    setAppointmentsByDate( groupedAppointments );
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
        fetchAppontmentsByDoctor,
        fetchAllPatients,
        allPatients,
        filteredAllPatientsList,
        patientsByAppointments,
        setFilteredPatientsByAppointmentsList,
        filteredPatientsByAppointmentsList,
        setFilteredAllPatientsList,
        fetchAppointmentByPatients,
        appointmentsByPatients,
        appointmentCount,
        appointmentDeleteByDoctor,
        appointmentCancelDeleteByDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctorContext() {
  return useContext( DoctorContext );
}
