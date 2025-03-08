import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import useDoctorContext from '../../contexts/DoctorContext';

const UserDivList = (props) => {
    const { appointmentCount } = useDoctorContext();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const appointmentCountSelector = () => {
        return appointmentCount.filter((e) => e.u_id === props.e.user_id)
    }

    return (
        <>
            <div className='list-group-users'>
                <p>{props.e.user_name}</p>
                <p>{props.e.tn}</p>
                <p>{props.e.u_phone}</p>
                <p>{appointmentCountSelector().da_number}</p>
                <Button onClick={handleShow}>Részletek</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserDivList