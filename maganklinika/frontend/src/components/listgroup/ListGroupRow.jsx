import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import useDoctorContext from '../../contexts/DoctorContext'
import useAuthContext from '../../contexts/AuthContext';

const ListGroupRow = (props) => {
    const { appointmentDeleteByDoctor, appointmentCancelDeleteByDoctor, fetchAllAppontmentsByDoctor } = useDoctorContext();
    const { user } = useAuthContext();

    const handleDeleteClick = (id) => {
        if (props.allAppointmentsByDate.status !== 'c') {
            appointmentDeleteByDoctor(id);
        } else {
            appointmentCancelDeleteByDoctor(id)
        }
        fetchAllAppontmentsByDoctor(user.id)
    }

    return (
        <div>
            {`
                Treatment ID: ${props.allAppointmentsByDate.treatment.treatment_name}, 
                Start Time: ${props.allAppointmentsByDate.start_time} ${"   "}
            `}
            {props.allAppointmentsByDate.status !== 'd' ?
                <Button onClick={() => { handleDeleteClick(props.allAppointmentsByDate.id) }}>{props.allAppointmentsByDate.status === 'c' ? "Visszaállít" : "Törlés"}</Button>
                : ""
            }
        </div>

    )
}

export default ListGroupRow