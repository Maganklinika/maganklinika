import React, { useEffect, useState } from "react";
import UserDivList from "../userdivlist/UserDivList";
import useDoctorContext from "../../contexts/DoctorContext";
import ListHeader from "../userdivlist/ListHeader";
import "./userlist.css";
import { Button, ListGroup, Table } from "react-bootstrap";
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
  const [allPat, setAllPat] = useState(false);
  const headerList = [
    "Név",
    "Taj",
    "Telefonszám",
    "Befejezett kezelések",
    "Kezelési előzmények",
  ];

  const handleClick = async () => {
    if (!allPatients) {
      await fetchAllPatients();
    }
    setAllPat(!allPat);
  };

  return (
    <div>
      <h1>Páciensek</h1>
      <TextFilter
        list={!allPat ? patientsByAppointments : allPatients}
        filterListSetter={
          !allPat
            ? setFilteredPatientsByAppointmentsList
            : setFilteredAllPatientsList
        }
      />
      <Table striped>
        <thead>
          <tr>
            {headerList.map((e, i) => {
              return <th key={i}>{e}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {!allPat
            ? filteredPatientsByAppointmentsList?.map((e) => {
                return <PatientsRow e={e} />;
              })
            : filteredAllPatientsList?.map((e) => {
                return <PatientsRow e={e} />;
              })}
        </tbody>
      </Table>
      <Button onClick={handleClick}>{!allPat ? "Összes Páciens" : "Saját páciensek"}</Button>
    </div>
  );
};

export default Paciensek;
