import React, { useState } from "react";
import useDoctorContext from "../../contexts/DoctorContext";
import "./userlist.css";
import { Button, Table } from "react-bootstrap";
import TextFilter from "../filters/text_filter_top/TextFilter";
import PatientsRow from "./PatientsRow";

const Paciensek = () => {
  const {
    fetchAllPatients,
    allPatients,
    filteredAllPatientsList,
    setFilteredAllPatientsList,
    setFilteredPatientsByAppointmentsList,
    filteredPatientsByAppointmentsList,
    patientsByAppointments,
  } = useDoctorContext();
  const [ allPat, setAllPat ] = useState( false );
  const headerList = [
    "Név",
    "Taj",
    "Telefonszám",
    "Befejezett kezelések",
    "Kezelési előzmények",
  ];

  const handleClick = async () => {
    if ( !allPat && allPatients.length <= 0 ) {
      await fetchAllPatients();
    }
    setAllPat( !allPat );
  };

  if ( filteredPatientsByAppointmentsList <= 0 ) {
  }
  return (
    <div className="patients" >
      <h1>Páciensek</h1>
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <Button onClick={handleClick}
          className="me-2"
          style={{ minHeight: '40px', padding: '0.5rem 1rem' }}>
          {!allPat ? "Összes Páciens" : "Saját páciensek"}
        </Button>
        <TextFilter
          list={!allPat ? patientsByAppointments : allPatients}
          filterListSetter={
            !allPat
              ? setFilteredPatientsByAppointmentsList
              : setFilteredAllPatientsList
          }
        />
      </div>
      <div className="patients-table">
      <Table striped >
        <thead>
          <tr>
            {headerList.map( ( e, i ) => {
              return <th key={i}>{e}</th>;
            } )}
          </tr>
        </thead>
        <tbody>
          {!allPat
            ? filteredPatientsByAppointmentsList?.map( ( e, i ) => {
              return <PatientsRow e={e} key={i} />;
            } )
            : filteredAllPatientsList?.map( ( e, i ) => {
              return <PatientsRow e={e} key={i} />;
            } )}
        </tbody>
      </Table>
      </div>
    </div >
  );
};

export default Paciensek;
