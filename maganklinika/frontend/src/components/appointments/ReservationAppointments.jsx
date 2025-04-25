import React, { useState } from "react";
import { ListGroup, Form, Button, Modal } from "react-bootstrap";
import usePatientContext from "../../contexts/PatientsContext";
import "./ReservationAppointments.css";
import { useNavigate } from "react-router-dom";

const ReservationAppointments = () => {
  const { fetchAvailableAppointments, treatmentOptions, bookingAppointment } =
    usePatientContext();
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  const handleTreatmentChange = async (event) => {
    const treatmentName = event.target.value;
    setSelectedTreatment(treatmentName);

    const selectedTreatmentObj = treatmentOptions.find(
      (treatment) => treatment.treatment_name === treatmentName
    );

    if (selectedTreatmentObj) {
      try {
        const appointments = await fetchAvailableAppointments(
          Number(selectedTreatmentObj.treatment_id)
        );
        setAvailableAppointments(appointments || []);
      } catch (error) {
        console.error("Hiba az időpontok lekérésekor:", error);
        setAvailableAppointments([]);
      }
    } else {
      setAvailableAppointments([]);
    }
  };

  const handleBooking = async () => {
    if (selectedAppointment) {
      await bookingAppointment(selectedAppointment.id);
      setShowModal(false);
      navigate("/profile");
    }
  };

  const handleShowModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
    console.log(appointment)
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
  };

  return (
    <div className="res-app container mt-4">
      <h2>Foglalási Időpontok</h2>

      <Form.Group controlId="treatmentSelect">
        <Form.Label>Válasszon kezelést</Form.Label>
        <Form.Control
          as="select"
          value={selectedTreatment}
          onChange={handleTreatmentChange}
        >
          <option value="">Válasszon kezelést</option>
          {treatmentOptions.map((treatment, index) => (
            <option key={index} value={treatment.treatment_name}>
              {treatment.treatment_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {selectedTreatment && availableAppointments.length > 0 ? (
        <ListGroup className="mt-3">
          {availableAppointments.map((appointment, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Időpont:</strong> {appointment.start_time}
              </div>
              <Button
                variant="success"
                onClick={() => handleShowModal(appointment)}
              >
                Foglalok
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : selectedTreatment ? (
        <p className="mt-3">Nincsenek elérhető időpontok ehhez a kezeléshez.</p>
      ) : null}

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Biztosan le szeretné foglalni az időpontot?</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>
                <strong>Kezelés neve:</strong> {selectedTreatment}
              </p>
              <p>
                <strong>Kezelés kezdésének időpontja:</strong> {selectedAppointment.start_time}
              </p>
              <p>A kezelés lefoglalását követően átirányítjuk profiljára, ahol szükség esetén le tudja mondani az időpontot.</p>
              <p>Foglalási igény megerősítése esetén nyomjon az Igen gombra.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleBooking}>
            Igen
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Mégse
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservationAppointments;


