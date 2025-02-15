import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, ListGroup } from "react-bootstrap";
import "./ReservationAppointments.css"


const ReservationAppointments = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Példa foglalások
  const reservations = {
    "2025-02-20": ["10:00 - 11:00", "14:00 - 15:00"],
    "2025-02-21": ["09:00 - 10:00", "16:00 - 17:00"],
  };

  const handleDateClick = (value) => {
    const formattedDate = value.toLocaleDateString("sv-SE");
    setSelectedDate(formattedDate);
    setShow(true);
  };  

    return (
        <div className="container mt-4 calendarParent">
          <h2>Foglalási Naptár</h2>
          <Calendar className='calendar' onClickDay={handleDateClick} value={date} />
          
          {/* Modális ablak a foglalások megjelenítéséhez */}
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Foglalások: {selectedDate}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {reservations[selectedDate] ? (
                <ListGroup>
                  {reservations[selectedDate].map((time, index) => (
                    <ListGroup.Item key={index}>{time}</ListGroup.Item>
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
}   

export default ReservationAppointments;