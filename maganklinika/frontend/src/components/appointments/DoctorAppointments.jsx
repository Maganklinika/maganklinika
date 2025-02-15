import React from 'react';
import { useEffect, useState } from "react";
import { Collapse, Button, Table } from "react-bootstrap";
import { myAxios } from '../../api/Axios';


const DoctorAppointments = () => {
    const [open, setOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
      }, []); 

      
      const fetchDoctors = async () => {
          const doctors = await myAxios.get( "/api/get-treatments-by-specialization" );
          setDoctors( doctors.data );
        };

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
            <th>Kezelés</th>
            <th>Kezelés hossza</th>
            <th>Időpontok</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, i) => (
            <tr key={i}>
              <td>{doctor.d_name}</td>
              <td>{doctor.t_name}</td>
              <td>{doctor.t_length}</td>
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