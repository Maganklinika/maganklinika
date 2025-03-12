import React, { useState } from "react";
import { Button, Table, ListGroup, Form } from "react-bootstrap";
import usePatientContext from "../../contexts/PatientsContext";
import { myAxios } from "../../api/Axios";
import useAuthContext from "../../contexts/AuthContext";

const TreatmentAppointments = () => {
  const { appointmentsDoctor, treatmentOptions, fetchDoctorAppointments } = usePatientContext();
  const { user } = useAuthContext();
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);

  const handleTreatmentChange = (event) => {
    const selectedTreatmentName = event.target.value;
    setSelectedTreatment(selectedTreatmentName);

    const filteredDoctors = appointmentsDoctor.filter(
      (appointment) => appointment.treatment_name === selectedTreatmentName
    );

    const uniqueDoctors = Array.from(
      new Map(filteredDoctors.map((doc) => [doc.doctor_id, doc])).values()
    );

    setAvailableDoctors(uniqueDoctors);
  };

  const bookAppointment = async (appointment) => {
    try {
      await myAxios.post("/api/book-appointment", {
        doctor_id: appointment.doctor_id,
        start_time: appointment.start_time,
        patient_id: user.id,
      });

      alert("Sikeres foglalás!");
      fetchDoctorAppointments(appointment.doctor_id);
    } catch (error) {
      console.error("Foglalási hiba:", error);
      alert("Hiba történt a foglalás során.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Foglalás kezelések alapján</h2>

      <Form.Group controlId="treatmentSelect">
        <Form.Label>Válasszon kezelést</Form.Label>
        <Form.Control as="select" value={selectedTreatment || ""} onChange={handleTreatmentChange}>
          <option value="">Kérem válasszon kezelést</option>
          {treatmentOptions.map((treatment, index) => (
            <option key={index} value={treatment.treatment_name}>
              {treatment.treatment_name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {selectedTreatment && (
        <div className="mt-4">
          <h3>Elérhető orvosok</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Orvos neve</th>
                <th>Értékelés</th>
                <th>Szabad időpontok</th>
              </tr>
            </thead>
            <tbody>
              {availableDoctors.length > 0 ? (
                availableDoctors.map((doctor) => {
                  const availableAppointments = appointmentsDoctor.filter(
                    (appointment) =>
                      appointment.doctor_id === doctor.doctor_id &&
                      appointment.treatment_name === selectedTreatment
                  );

                  return (
                    <tr key={doctor.doctor_id}>
                      <td>{doctor.doctor_name}</td>
                      <td>{doctor.rating ? `${doctor.rating}⭐` : "Nincs értékelés"}</td>
                      <td>
                        {availableAppointments.length > 0 ? (
                          <ListGroup>
                            {availableAppointments.map((appointment, index) => (
                              <ListGroup.Item key={index} className="d-flex justify-content-between">
                                {new Date(appointment.start_time).toLocaleString("hu-HU")}
                                <Button
                                  variant="success">
                                  Foglalok
                                </Button>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        ) : (
                          <p>Nincs elérhető időpont.</p>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3">Nincs elérhető orvos erre a kezelésre.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TreatmentAppointments;
