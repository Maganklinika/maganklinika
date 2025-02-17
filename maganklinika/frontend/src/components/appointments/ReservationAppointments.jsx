import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, ListGroup } from "react-bootstrap";
import "./ReservationAppointments.css";
import usePatientContext from "../../contexts/PatientsContext";

const ReservationAppointments = () => {
  const { appointmentsByDate } = usePatientContext();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (value) => {
    const formattedDate = value.toLocaleDateString("sv-SE");
    setSelectedDate(formattedDate);
    setShow(true);
  };

  return (
    <div className="container mt-4 calendarParent">
      <h2>Foglalási Naptár</h2>
      <Calendar
        className="calendar"
        onClickDay={handleDateClick}
        value={date}
      />

      {/* Modális ablak a foglalások megjelenítéséhez */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Időpontok: {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Ellenőrzés, hogy van-e foglalás a kiválasztott napon */}
          {appointmentsByDate[selectedDate] &&
          appointmentsByDate[selectedDate].length > 0 ? (
            <ListGroup>
              {appointmentsByDate[selectedDate].map(
                (appointmentsByDate, index) => (
                  <ListGroup.Item key={index}>
                    {`
                  Doctor ID: ${appointmentsByDate.doctor_id}, 
                  Treatment ID: ${appointmentsByDate.treatment_id}, 
                  Start Time: ${appointmentsByDate.start_time}
                  `}
                  </ListGroup.Item>
                )
              )}
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
