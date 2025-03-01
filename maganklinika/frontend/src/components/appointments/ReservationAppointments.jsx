import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import "./ReservationAppointments.css";
import usePatientContext from "../../contexts/PatientsContext";
import { myAxios } from "../../api/Axios";


const ReservationAppointments = () => {
  const { appointmentsByDate, appointmentsDoctor, treatmentOptions } = usePatientContext();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const handleDateClick = (value) => {
    const formattedDate = value.toLocaleDateString("sv-SE");
    setSelectedDate(formattedDate);
    setShow(true);
  };

  const handleTreatmentChange = (event) => {
    setSelectedTreatment(event.target.value);
  };

  const getHighlightedDates = () => {
    const highlightedDates = [];

    if (selectedTreatment) {
      appointmentsDoctor.forEach((doctor) => {
        if (doctor.treatment_name === selectedTreatment) {
          const date = doctor.start_time.split(" ")[0]; 
          if (!highlightedDates.includes(date)) {
            highlightedDates.push(date);
          }
        }
      });
    }

    return highlightedDates;
  };

  return (
    <div className="container mt-4 calendarParent">
      <h2>Foglalási Naptár</h2>

      <Form.Group controlId="treatmentSelect">
        <Form.Label>Válasszon kezelést</Form.Label>
        <Form.Control
          as="select"
          value={selectedTreatment || ""}
          onChange={handleTreatmentChange}
        >
          <option value="">Kérem válasszon kezelést</option>
          {treatmentOptions.map((treatment, index) => (
            <option key={index} value={treatment.treatment_name}>
              {treatment.treatment_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Calendar
        className="calendar"
        onClickDay={handleDateClick}
        value={date}
        tileClassName={({ date, view }) => {
          const formattedDate = date.toLocaleDateString("sv-SE");
          if (getHighlightedDates().includes(formattedDate)) {
            return "highlighted";
          }
        }}
      />


      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Időpontok: {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointmentsByDate[selectedDate] &&
          appointmentsByDate[selectedDate].length > 0 ? (
            <ListGroup>
              {appointmentsByDate[selectedDate].map((appointment, index) => (
                <ListGroup.Item key={index}>
                  {`
                  Doctor ID: ${appointment.doctor_id}, 
                  Treatment ID: ${appointment.treatment_id}, 
                  Start Time: ${appointment.start_time}
                  `}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Nincs foglalás erre a napra.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservationAppointments;
