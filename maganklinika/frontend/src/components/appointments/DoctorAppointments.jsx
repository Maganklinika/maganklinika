import React, { useEffect, useState } from 'react';
import { Button, Collapse, Table } from 'react-bootstrap';
import usePatientContext from "../../contexts/PatientsContext";
import TextFilter from "../filters/text_filter_top/TextFilter";
import { myAxios } from '../../api/Axios';

const DoctorAppointments = () => {
  const { filteredList, setFilteredList, appointmentsDoctor, setAppointmentsDoctor, fetchDoctorAppointments, fetchPatientData } = usePatientContext(); 
  const [openAppointments, setOpenAppointments] = useState({});

  const groupAppointmentsByMonth = (appointments) => {
    const grouped = {};
    appointments.forEach((appointment) => {
      const date = new Date(appointment.start_time); 
      const monthYear = date.toLocaleString("hu-HU", { year: "numeric", month: "long" });
      if (!grouped[monthYear]) grouped[monthYear] = [];
      grouped[monthYear].push(appointment);
    });
    return grouped;
  };

  

  const toggleAppointments = (doctorId, treatmentId) => {
    setOpenAppointments((prevState) => {
      if (prevState[doctorId] === treatmentId) {
        return { ...prevState, [doctorId]: null };
      }
      const newState = {};
      newState[doctorId] = treatmentId;
      return newState;
    });
    fetchDoctorAppointments(doctorId);
  };

  return (
    <div>
      <TextFilter list={appointmentsDoctor} filterListSetter={setFilteredList} />
      <h2>Doktoraink</h2>
      <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Doktor neve</th>
              <th>Specializáció</th>
              <th>Kezelések</th>
              <th>Időpontok</th>
            </tr>
          </thead>
          <tbody>
            {filteredList ? (
              filteredList.map((doctor, i) => {
                const doctorAppointments = appointmentsDoctor.filter(
                  (appointment) => appointment.doctor_id === doctor.d_id
                );
                const groupedAppointments = groupAppointmentsByMonth(doctorAppointments);

                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{doctor.d_name}</td>
                      <td>{doctor.s_name}</td>
                      <td>{doctor.t_name}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => toggleAppointments(doctor.d_id, doctor.t_id)}
                        >
                          Időpontok
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <Collapse in={openAppointments[doctor.d_id] === doctor.t_id}>
                          <div>
                            {Object.keys(groupedAppointments).length > 0 ? (
                              Object.entries(groupedAppointments).map(([month, appts]) => (
                                <div key={month} className="mt-2">
                                  <h5>{month}</h5>
                                  <ul>
                                    {appts.map((appointment, index) => (
                                      <li key={index}>
                                        {new Date(appointment.start_time).toLocaleString("hu-HU", {
                                          day: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}{" "}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))
                            ) : (
                              <p>Nincs elérhető időpont.</p>
                            )}
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
