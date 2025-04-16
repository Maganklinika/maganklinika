import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDoctorContext from "../../contexts/DoctorContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SelectedTreatment = () => {
  const { fetchGetPatientData, patientData, fetchFinishAppointment } =
    useDoctorContext();
  const [description, setDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    if (data?.p_id) {
      fetchGetPatientData(data.p_id);
    }
  }, [data?.p_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFinishAppointment(data?.da_id, description);
    navigate("/treatment");
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="selected-treatment">
      <div className="patient-data">
        <div>
          <h2>{patientData[0]?.name}</h2>
        </div>
        <div>
          <p>Tajszám: {patientData[0]?.taj}</p>
          <p>Születési idő: {patientData[0]?.bd}</p>
          <p>Telefonszám: {patientData[0]?.phone}</p>
          <p>Email cím: {patientData[0]?.email}</p>
        </div>
        <div></div>
      </div>
      <div className="selected-treatment-form">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Kezelés Leírása:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Mentés és lezárás
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SelectedTreatment;
