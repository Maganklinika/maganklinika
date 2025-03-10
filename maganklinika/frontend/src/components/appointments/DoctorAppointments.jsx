import React, { useState } from 'react';
import { Button, Collapse, Table } from 'react-bootstrap';
import usePatientContext from "../../contexts/PatientsContext";
import TextFilter from "../filters/text_filter_top/TextFilter";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { hu } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { myAxios } from '../../api/Axios';
import useAuthContext from '../../contexts/AuthContext';

const DoctorAppointments = () => {
  const { filteredList, setFilteredList, appointmentsDoctor, setAppointmentsDoctor, fetchDoctorAppointments, fetchPatientData } = usePatientContext(); 
  const [openAppointments, setOpenAppointments] = useState({});
  const [view, setView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const {user} = useAuthContext();


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

  const generateEvents = (appointments) => {
    return appointments.map((appointment) => {
      const start = new Date(appointment.start_time.replace(" ", "T"));
  
      const [hours, minutes, seconds] = appointment.treatment.treatment_length.split(":").map(Number);
      const durationInMinutes = hours * 60 + minutes;
  
      const end = new Date(start.getTime() + durationInMinutes * 60000);
  
      return {
        start,
        end,
        title: `${appointment.patient ? appointment.patient.name : "Szabad időpont"} (${appointment.treatment.treatment_name})`,
      };
    });
  };


  const handleViewChange = (view) => {
    setView(view);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const handleEventClick = (event) => {
    if (window.confirm(`Biztosan le szeretnéd foglalni ezt az időpontot?\n\n${event.title}\n${event.start.toLocaleString()}`)) {
      bookAppointment(event);
    }
  };
  
  const bookAppointment = async (event) => {
    try {
      const response = await myAxios.post("/api/book-appointment", {
        doctor_id: event.d_id,
        start_time: event.start_time.toISOString(), // -----------  Javítani az event elemeit. -> Cannot read properties of undefined (reading 'toISOString') -------------------------
        patient_id: event.patient_id,
      });
  
      alert("Sikeres foglalás!");
      fetchDoctorAppointments(event.doctor_id);
    } catch (error) {
      console.error("Foglalási hiba:", error);
      alert("Hiba történt a foglalás során.");
    }
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
                            {doctorAppointments.length > 0 ? (
                              <Calendar
                              localizer={localizer}
                              events={generateEvents(doctorAppointments)}
                              startAccessor="start"
                              endAccessor="end"
                              views={['month', 'week', 'day']}
                              view={view}
                              onView={handleViewChange}
                              onNavigate={handleNavigate}
                              date={currentDate}
                              defaultView="week"
                              min={new Date(0, 0, 0, 7, 0)}
                              max={new Date(0, 0, 0, 18, 0)}
                              culture="hu"
                              firstDayOfWeek={1}  
                              style={{ height: 500 }}
                              messages={messages}
                              onSelectEvent={handleEventClick}
                            />
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

