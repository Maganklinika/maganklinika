import React from 'react';
import { useEffect, useState } from "react";
import { Collapse, Button, Table } from "react-bootstrap";


const DoctorAppointments = () => {
    const [open, setOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/doctors") // Itt az API végpont
          .then((response) => response.json())
          .then((data) => setDoctors(data))
          .catch((error) => console.error("Hiba a lekérdezéskor:", error));
      }, []);   

  return (
    <div>
        <Button
      onClick={() => setOpen(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
    >
      Doktoraink listája
    </Button>

    <Collapse in={open}>
      <div id="example-collapse-text">
      <h2>Doktoraink</h2>
      <div className="container mt-4">
      <h2>Doktorok listája</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Doktor neve</th>
            <th>Specializáció</th>
            <th>Időpontok</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.d_id}>
              <td>{doctor.d_name}</td>
              <td>{doctor.s_name}</td>
              <td>
                <Button variant="primary">Időpontok</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
      </div>
    </Collapse>
    </div>
  )
}

export default DoctorAppointments