import React, { useState } from "react";
import { Button, Collapse, Modal, Table } from "react-bootstrap";
import usePatientContext from "../../contexts/PatientsContext";
import TextFilter from "../filters/text_filter_top/TextFilter";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { hu } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const {
    filteredList,
    setFilteredList,
    appointmentsDoctor,
    appointments,
    fetchDoctorAppointments,
    bookingAppointment,
  } = usePatientContext();
  const [openAppointments, setOpenAppointments] = useState({});
  const [view, setView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const navigate = useNavigate();

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales: { hu: hu },
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const messages = {
    today: "Ma",
    previous: "Előző",
    next: "Következő",
    month: "Hónap",
    week: "Hét",
    day: "Nap",
    agenda: "Napló",
  };

  const toggleAppointments = (doctorId, treatmentId) => {
    setOpenAppointments((prevState) => {
      if (
        prevState.doctorId === doctorId &&
        prevState.treatmentId === treatmentId
      ) {
        return { doctorId: null, treatmentId: null };
      }

      return { doctorId, treatmentId };
    });

    fetchDoctorAppointments(doctorId);
  };

  const generateEvents = (appointments) => {
    return appointments
      .filter(
        (appointment) =>
          appointment.doctor_id === openAppointments.doctorId &&
          appointment.treatment_id === openAppointments.treatmentId
      )
      .map((appointment) => {
        const id = appointment.id;
        const start = new Date(appointment.start_time.replace(" ", "T"));

        const [hours, minutes] = appointment.treatment.treatment_length
          .split(":")
          .map(Number);
        const durationInMinutes = hours * 60 + minutes;

        const end = new Date(start.getTime() + durationInMinutes * 60000);

        return {
          id,
          start,
          end,
          title: `${
            appointment.patient ? appointment.patient.name : "Szabad időpont"
          } (${appointment.treatment.treatment_name})`,
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
    let elem = appointmentsDoctor?.find((e) => e.id == event.id);
    setSelectedAppointment(elem);
    handleShow();
  };

  const bookAppointmentClick = (e) => {
    bookingAppointment(e.id);
    navigate("/profile");
  };

  return (
    <div className="doctor-appointments">
      <h2>Doktoraink</h2>
      <TextFilter list={appointments} filterListSetter={setFilteredList} />
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
                  id: appointment.doctor_id,
                  start: new Date(appointment.start_time),
                  end: new Date(appointment.end_time),
                  title: `${appointment.patient_name} (${appointment.treatment_name})`,
                  da_id: appointment.id,
                  d_name: appointment.d_name,
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
                          onClick={() =>
                            toggleAppointments(doctor.d_id, doctor.t_id)
                          }
                        >
                          Időpontok
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4">
                        <Collapse
                          in={
                            openAppointments.doctorId === doctor.d_id &&
                            openAppointments.treatmentId === doctor.t_id
                          }
                        >
                          <div>
                            {doctorAppointments.length > 0 ? (
                              <Calendar
                                localizer={localizer}
                                events={generateEvents(doctorAppointments)}
                                startAccessor="start"
                                endAccessor="end"
                                views={["month", "week", "day"]}
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
                                onSelectEvent={(event) =>
                                  handleEventClick(event)
                                }
                              />
                            ) : (
                              <p>Nincs elérhető időpont.</p>
                            )}
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Biztosan le szeretné foglalni az időpontot?
                        </Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>
                          <b>Kezelés neve: </b>
                          {selectedAppointment?.treatment?.treatment_name}
                        </p>
                        <p>
                          <b>Kezelés kezdése: </b>
                          {selectedAppointment?.start_time}
                        </p>
                        <p>
                          <b>Kezelés hossza: </b>
                          {selectedAppointment?.treatment?.treatment_length}
                        </p>
                        <p>
                          <b>Kezelés ára: </b>
                          {selectedAppointment?.treatment?.price} Ft
                        </p>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={() => {
                            bookAppointmentClick(selectedAppointment);
                          }}
                        >
                          Igen
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                          Mégse
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
