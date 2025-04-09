import { createContext, useContext, useState } from "react";
import { myAxios } from "../api/Axios";

const DoctorContext = createContext();

export const DoctorProvider = ( { children } ) => {
  const [ doctorsWithSpec, setDoctorsWithSpec ] = useState( [] );
  const [ filteredDoctorsList, setFilteredDoctorsList ] = useState( [] );
  const [ appointmentsByDoctor, setAppointmentsByDoctor ] = useState( [] );
  const [ allAppointmentsByDoctor, setAllAppointmentsByDoctor ] = useState( [] );
  const [ appointmentsByDate, setAppointmentsByDate ] = useState( {} );
  const [ allAppointmentsByDate, setAllAppointmentsByDate ] = useState( {} );
  const [ allPatients, setAllPatients ] = useState( [] );
  const [ filteredAllPatientsList, setFilteredAllPatientsList ] = useState( [] );
  const [ patientsByAppointments, setPatientsByAppointments ] = useState( [] );
  const [
    filteredPatientsByAppointmentsList,
    setFilteredPatientsByAppointmentsList,
  ] = useState( [] );
  const [ appointmentsByPatients, setAppointmentsByPatients ] = useState( [] );
  const [ appointmentCount, setAppointmentCount ] = useState( [] );
  const [ appointmentsToday, setAppointmentsToday ] = useState( [] )
  const [ patientData, setPatientData ] = useState( [] )


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

  const fetchAppointmentByPatients = async ( pat_id ) => {
    const response = await myAxios.get(
      `/api/get-appointments-by-patients/${ pat_id }`
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
    const response = await myAxios.get( "/api/get-appointments-by-doctor", {
      params: {
        doctor_id: doctor_id, // A doctor_id értéke, amit át akarsz adni
      }
    } );
    setAppointmentsByDoctor( response.data );
    groupAppointmentsByDate( response.data );
  };

  const fetchAllAppontmentsByDoctor = async ( doctor_id ) => {
    const response = await myAxios.get( "/api/get-all-appointment-by-doctor", {
      params: {
        doctor_id: doctor_id, // A doctor_id értéke, amit át akarsz adni
      }
    } );
    setAllAppointmentsByDoctor( response.data );
    groupAllAppointmentsByDate( response.data );
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

  const groupAllAppointmentsByDate = ( appointmentsArray ) => {
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

    setAllAppointmentsByDate( groupedAppointments );
  };

  const fetchGetTodayAppointments = async ( id ) => {
    const response = await myAxios.get( `/api/get-today-appointments/${ id }` )
    setAppointmentsToday( response.data )
  }

  const fetchGetPatientData = async ( id ) => {
    const response = await myAxios.get( `/api/get-patient-data/${ id }` )
    setPatientData( response.data )
  }

  const fetchFinishAppointment = async ( id, description ) => {
    const response = await myAxios.put( `/api/finish-appointment/${ id }`, { description } )

  }



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
        appointmentsToday,
        fetchGetTodayAppointments,
        fetchGetPatientData,
        patientData,
        fetchFinishAppointment,
        fetchAllAppontmentsByDoctor,
        allAppointmentsByDoctor,
        allAppointmentsByDate,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctorContext() {
  return useContext( DoctorContext );
}
