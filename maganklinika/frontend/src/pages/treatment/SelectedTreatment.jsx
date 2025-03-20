import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useDoctorContext from '../../contexts/DoctorContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SelectedTreatment = () => {
    const { fetchGetPatientData, patientData, fetchFinishAppointment } = useDoctorContext()
    const [ description, setDescription ] = useState( "" )
    const location = useLocation();
    const data = location.state; // Itt érjük el az

    useEffect( () => {
        if ( data?.p_id ) {
            fetchGetPatientData( data.p_id );
        }
    }, [ data?.p_id ] )

    const handleSubmit = ( e ) => {
        e.preventDefault()
        fetchFinishAppointment( data?.da_id, description )
    }

    const handleChange = ( e ) => {
        setDescription( e.target.value )
    }

    return (
        <div>
            <div className='patient-data'>
                <div>{patientData[ 0 ]?.name}</div>
                <div>
                    <p>{patientData[ 0 ]?.taj}</p>
                    <p>{patientData[ 0 ]?.bd}</p>
                    <p>{patientData[ 0 ]?.phone}</p>
                    <p>{patientData[ 0 ]?.email}</p>
                </div>
                <div></div>
            </div>
            <div className='selected-treatment-form'>
                <Form onSubmit={( e ) => handleSubmit( e )}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Kezelés Leírása:</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={( e ) => handleChange( e )} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Mentés és lezárás
                    </Button>
                </Form>
            </div>
        </div >
    )
}

export default SelectedTreatment