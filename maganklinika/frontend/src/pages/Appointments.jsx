import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import "./appointment.css"
import BookingCalendar from '../components/appointments/ReservationAppointments'
import Reservation from '../components/appointments/ReservationAppointments'
import ReservationAppointments from '../components/appointments/ReservationAppointments'
import DoctorAppointments from '../components/appointments/DoctorAppointments'

const Appointments = () => {
    return (
        <div>
            <div className='appointment-page'>
                <h1>Időpontfoglalás</h1>
            </div>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-2"
            >
                <Tab eventKey="home" title="Időpont keresése doktorok alapján" className='tab'>
                    <DoctorAppointments/>
                </Tab>
                <Tab eventKey="profile" title="Időpont keresése kezelések alapján" className='tab'>
                    Tab content for Profile
                    <ReservationAppointments/>
                </Tab>
            </Tabs>


        </div>
    )
}

export default Appointments