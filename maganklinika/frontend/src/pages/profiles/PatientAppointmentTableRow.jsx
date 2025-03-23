import React, { useState } from "react";
import ReactStars from "react-stars";
import usePatientContext from "../../contexts/PatientsContext";
import useDoctorContext from "../../contexts/DoctorContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PatientAppointmentTableRow = (props) => {
  const [ratings, setRatings] = useState({});
  const { fetchAppointmentRating, fetchCancelAppointmentByPatient } =
    usePatientContext();
  const { fetchAppointmentByPatients } = useDoctorContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRatingChange = (appointmentId, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [appointmentId]: newRating,
    }));
    console.log(`Időpont ${appointmentId} új értékelése: ${newRating}`);
    fetchAppointmentRating(appointmentId, newRating);
    fetchAppointmentByPatients(props.e.u_id);
  };

  const handleClickCancelAppointmentByPatient = () => {
    fetchCancelAppointmentByPatient(props.e.id);
    fetchAppointmentByPatients(props.e.u_id);
    handleClose();
  };

  return (
    <>
      <tr className="text-center border-b border-gray-300">
        <td className="border border-gray-300 p-2">{props.e.time}</td>
        <td className="border border-gray-300 p-2">{props.e.user_name}</td>
        <td className="border border-gray-300 p-2">{props.e.t_name}</td>
        <td className="border border-gray-300 p-2">
          {props.e.da_status === "b" ? (<Button onClick={handleShow}>Törlés</Button>): ("Már nem törölhető")}
        </td>
        <td className="border border-gray-300 p-2">
          {props.e.rating === null && props.e.da_status === "d" ? (
            <ReactStars
              count={5}
              size={24}
              value={ratings[props.e.id] ?? props.e.rating ?? 0} // Ha van már állított érték, azt mutatja
              edit={true} // Engedélyezzük a módosítást
              activeColor="gold"
              onChange={(newRating) =>
                handleRatingChange(props.e.id, newRating)
              }
              half={false}
            />
          ) : props.e.da_status === "d" ? (
            <div>
              <p>Az értékelésed:</p>
              <span>
                <ReactStars
                  count={5}
                  size={24}
                  value={ratings[props.e.id] ?? props.e.rating ?? 0} // Ha van már állított érték, azt mutatja
                  edit={false} // Nem engedélyezi a módosítást
                  activeColor="gold"
                  half={false}
                />
              </span>
            </div>
          ) : (
            <p>A kezelés folyamatban</p>
          )}
        </td>
      </tr>
      <
      >
        <Modal
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Időpont törlése</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Biztosan törölni szeretné az időpontot?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleClickCancelAppointmentByPatient}
            >
              Igen
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Mégse
            </Button>
          </Modal.Footer>
        </Modal>
        
      </>
    </>
  );
};

export default PatientAppointmentTableRow;
