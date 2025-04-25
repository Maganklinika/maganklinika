import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import useDoctorContext from "../../contexts/DoctorContext";

const PatientsRow = (props) => {
  const {
    appointmentCount,
    fetchAppointmentByPatients,
    appointmentsByPatients,
  } = useDoctorContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    await fetchAppointmentByPatients(props.e.user_id);
  };
  const selectedAppointment = appointmentCount.find(
    (e) => e.u_id === props.e.user_id
  );
  const selectedAppointmentCount = selectedAppointment?.da_number;

  return (
    <>
      <tr>
        <td>{props.e.user_name}</td>
        <td>{props.e.tn}</td>
        <td>{props.e.u_phone}</td>
        <td>{selectedAppointmentCount}</td>
        <td>
          <Button onClick={handleShow}>Részletek</Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{props.e.user_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {appointmentsByPatients.map((e, i) => {
              return (
                <Row key={i} className="m-4">
                  <Col xs={6} md={4}>
                    kezelés ideje: {e.time}
                  </Col>
                  <Col xs={6} md={4}>
                    Doktor: {e.user_name}
                  </Col>
                  <Col xs={6} md={4}>
                    Kezelés: {e.t_name}
                  </Col>
                </Row>
              );
            })}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientsRow;
