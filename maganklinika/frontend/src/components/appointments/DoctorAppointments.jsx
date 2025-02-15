import React from "react";
import { useEffect, useState } from "react";
import { Collapse, Button, Table } from "react-bootstrap";
import usePatientContext from '../../contexts/PatientsContext';
import TextFilter from '../filters/text_filter_top/TextFilter';

const DoctorAppointments = () => {
  const { appointments, filteredList } = usePatientContext();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <TextFilter list={appointments} />
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
                {
                  filteredList ?
                    filteredList.map((e, i) => (
                      <tr key={i}>
                        <td>{e.d_name}</td>
                        <td>{e.s_name}</td>
                        <td>
                          <Button variant="primary">Időpontok</Button>
                        </td>
                      </tr>
                    )) :
                    <tr><td>loading</td></tr>
                }
              </tbody>
            </Table>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default DoctorAppointments;
