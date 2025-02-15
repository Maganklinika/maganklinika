import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, ListGroup } from "react-bootstrap";
import "./ReservationAppointments.css";
import { myAxios } from "../../api/Axios";

const ReservationAppointments = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});

  // Fetch appointments from the API
  useEffect(() => {
    fetchAppointments();
  }, []); 

  const fetchAppointments = async () => {
    try {
      const response = await myAxios.get("/api/appointments");
      console.log(response.data);  // Check the structure of the data
      groupAppointmentsByDate(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const groupAppointmentsByDate = (appointmentsArray) => {
    // Csoportosítjuk az appointments-t a start_time alapján dátum szerint
    const groupedAppointments = appointmentsArray.reduce((acc, appointment) => {
      // Csak a dátumot veszük figyelembe (YYYY-MM-DD)
      const date = appointment.start_time.split(" ")[0];  
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(appointment);
      return acc;
    }, {});

    setAppointments(groupedAppointments);
  };

  const handleDateClick = (value) => {
    const formattedDate = value.toLocaleDateString("sv-SE");
    setSelectedDate(formattedDate);
    setShow(true);
  };

  return (
    <div className="container mt-4 calendarParent">
      <h2>Foglalási Naptár</h2>
      <Calendar className="calendar" onClickDay={handleDateClick} value={date} />

      {/* Modális ablak a foglalások megjelenítéséhez */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Időpontok: {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Ellenőrzés, hogy van-e foglalás a kiválasztott napon */}
          {appointments[selectedDate] && appointments[selectedDate].length > 0 ? (
            <ListGroup>
              {appointments[selectedDate].map((appointment, index) => (
                <ListGroup.Item key={index}>
                  {`Doctor ID: ${appointment.doctor_id}, Treatment ID: ${appointment.treatment_id}, Start Time: ${appointment.start_time}`}
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
