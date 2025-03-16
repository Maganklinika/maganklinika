import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import useDoctorContext from '../../contexts/DoctorContext'
import useAuthContext from '../../contexts/AuthContext';

const ListGroupRow = ( props ) => {
    const { appointmentDeleteByDoctor, appointmentCancelDeleteByDoctor, fetchAppontmentsByDoctor } = useDoctorContext();
    const { user } = useAuthContext();
    const [ isDeletedAppointment, setIsDeletedAppointment ] = useState( false )

    const handleDeleteClick = ( id ) => {
        if ( !isDeletedAppointment ) {
            appointmentDeleteByDoctor( id );
        } else {
            appointmentCancelDeleteByDoctor( id )
        }
        setIsDeletedAppointment( !isDeletedAppointment );
        fetchAppontmentsByDoctor( user.id )
    }

    return (
        <div>
            {`
                Treatment ID: ${ props.appointmentsByDate.treatment.treatment_name }, 
                Start Time: ${ props.appointmentsByDate.start_time },
            `}
            <Button onClick={() => { handleDeleteClick( props.appointmentsByDate.id ) }}>{isDeletedAppointment ? "Visszaállít" : "Törlés"}</Button>
        </div>

    )
}

export default ListGroupRow