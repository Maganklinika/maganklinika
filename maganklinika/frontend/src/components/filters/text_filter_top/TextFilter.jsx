import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import "./textfilter.css"
import usePatientContext from '../../../contexts/PatientsContext'

const TextFilter = () => {
    const { setFilteredList, appointments } = usePatientContext()
    const [filteredText, setFilteredText] = useState("");


    const handleChange = (event) => {
        setFilteredText(event.target.value)
        console.log(event.target.value)
        if (event.target.value === "") {
            setFilteredList([...appointments])
        }

        const filteredList = appointments.filter((e) => {
            if (e.d_name.toLowerCase().includes(event.target.value.toLowerCase())) {
                return e
            }
        })
        setFilteredList([...filteredList])
    }


    return (
        <div className='top-filter'>
            <Form.Label htmlFor="inputText">Keresés:</Form.Label>
            <Form.Control
                type="text"
                id="inputText5"
                aria-describedby="passwordHelpBlock"
                placeholder='Keresendő szó'
                onChange={handleChange}
                value={filteredText}
            />
        </div>
    )
}

export default TextFilter