import React from 'react'
import UserDivList from '../userdivlist/UserDivList'
import useDoctorContext from '../../contexts/DoctorContext';
import ListHeader from "../userdivlist/ListHeader"
import "./userlist.css"
import { ListGroup } from 'react-bootstrap';
import TextFilter from '../filters/text_filter_top/TextFilter';

const Paciensek = () => {
  const { fetchAllPatients, allPatients, filteredAllPatientsList, setFilteredAllPatientsList, setFilteredPatientsByAppointmentsList,
    filteredPatientsByAppointmentsList, patientsByAppointments } = useDoctorContext();

  const headerList = [
    "Név",
    "Taj",
    "Telefonszám",
    "Befejezett kezelések",
    "Részletek",
  ];

  return (
    <div>
      <h1>Páciensek</h1>
      <TextFilter list={patientsByAppointments} filterListSetter={setFilteredPatientsByAppointmentsList} />
      <ListHeader list={headerList} />
      <div className='user-list-item d-flex align-item-center'>
        <ListGroup>
          {
            filteredPatientsByAppointmentsList?.map((e) => {
              return <UserDivList e={e} />
            })
          }
        </ListGroup>
      </div>

    </div>
  )
}

export default Paciensek  