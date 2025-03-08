import React, { useEffect, useState } from 'react';
import { Button, Collapse, Table } from 'react-bootstrap';
import usePatientContext from "../../contexts/PatientsContext";
import TextFilter from "../filters/text_filter_top/TextFilter";

import { myAxios } from '../../api/Axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { hu } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const DoctorAppointments = () => {
  const { filteredList, setFilteredList, appointmentsDoctor, setAppointmentsDoctor, fetchDoctorAppointments, fetchPatientData } = usePatientContext(); 
  const [openAppointments, setOpenAppointments] = useState({});
  const [view, setView] = useState('week');

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { 'hu': hu },
  });

  const messages = {
    today: 'Ma',
    previous: 'Előző',
    next: 'Következő',
    month: 'Hónap',
    week: 'Hét',
    day: 'Nap',
    agenda: 'Napló',
  };

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

  const handleViewChange = (view) => {
    setView(view);
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

                const events = doctorAppointments.map((appointment) => ({
                  start: new Date(appointment.start_time),
                  end: new Date(appointment.end_time),
                  title: `${appointment.patient_name} (${appointment.treatment_name})`,
                }));

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
                                <div key={month}>
                                  <h5>{month}</h5>
                                  <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    views={['month', 'week', 'day']}
                                    view={view}
                                    onView={handleViewChange}
                                    defaultView="week"
                                    min={new Date(0, 0, 0, 7, 0)}
                                    max={new Date(0, 0, 0, 18, 0)}
                                    culture="hu"
                                    firstDayOfWeek={1}
                                    style={{ height: 500 }}
                                    messages={messages}
                                  />
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
