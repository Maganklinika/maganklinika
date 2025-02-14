import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import "./appointment.css"

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
                    
                </Tab>
                <Tab eventKey="profile" title="Időpont keresése kezelések alapján" className='tab'>
                    Tab content for Profile
                </Tab>
            </Tabs>
        </div>
    )
}

export default Appointments