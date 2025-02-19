import React, { useState } from "react";
import useDoctorContext from "../contexts/DoctorContext";
import Calendar from "react-calendar";
import { Button, ListGroup, Modal } from "react-bootstrap";
import "./appointment.css";
import usePatientContext from "../contexts/PatientsContext";
import useAuthContext from "../contexts/AuthContext";

const CreateAppointmentsByDoctor = () => {
  const { appontmentsByDoctor } = useDoctorContext();
  const { appointments } = usePatientContext();
  const { user } = useAuthContext();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (value) => {
    const formattedDate = value.toLocaleDateString("sv-SE");
    setSelectedDate(formattedDate);
    setShow(true);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  // Ellenőrizni, hogy egy adott nap hétvége vagy múltbeli dátum
  const tileClassName = ({ date, view }) => {
    const isWeekend = date.getDay() === 6 || date.getDay() === 0; // Szombat vagy vasárnap
    const isPastDate = date < new Date(); // Ha a nap a múltban van
    const formattedDate = date.toLocaleDateString("sv-SE");

    // Ha múltbeli vagy hétvégi dátum, pirosra színezzük és nem lehet kattintani
    if (isWeekend) {
      return "red-tile"; // Osztály, amit a CSS-ben kezelhetünk
    } else if (isPastDate) {
      return "past-tile";
    }

    // Ha van foglalás az adott napon, akkor azt is kezelhetjük
    if (
      appontmentsByDoctor[formattedDate] &&
      appontmentsByDoctor[formattedDate].length > 0
    ) {
      return "has-appointments"; // Ha van foglalás, külön osztály
    }

    return null;
  };

  const getTreatmentsByDoctor = () => {
    const result = appointments
      .map((e) => {
        if (user.name === e.d_name) {
          return e.t_name;
        }
        return "";
      })
      .filter((e) => e !== "");
    return result;
  };
  console.log(getTreatmentsByDoctor());

  return (
    <div className="container mt-4 calendarParent">
      <h2>Foglalási Naptár</h2>
      <Calendar
        className="calendar"
        onClickDay={handleDateClick}
        value={date}
        tileClassName={tileClassName}
      />

      {/* Modális ablak a foglalások megjelenítéséhez */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Időpontok: {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Ellenőrzés, hogy van-e foglalás a kiválasztott napon */}
          {appontmentsByDoctor[selectedDate] &&
          appontmentsByDoctor[selectedDate].length > 0 ? (
            <ListGroup>
              {appontmentsByDoctor[selectedDate].map(
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
            <form>
              <select value="teszt" onChange={handleChange}>
                {getTreatmentsByDoctor()?.map((e, i) => (
                  <option value={e} key={i}>
                    {e}
                  </option>
                ))}
              </select>
            </form>
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

export default CreateAppointmentsByDoctor;
