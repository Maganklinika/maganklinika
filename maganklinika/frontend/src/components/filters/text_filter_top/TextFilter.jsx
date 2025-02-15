import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import "./textfilter.css"

const TextFilter = (props) => {

    const [filteredText, setFilteredText] = useState("");
    const [list, setList] = useState(props.list);

    const handleChange = (event) => {
        setFilteredText(event.target.value)

        const filteredList = list.map((e) => {
            if (filteredList.toLowerCase() === e.name.toLowerCase()) {
                return e
            }
        })
        setList(filteredList);
    }

    return (
        <div className='top-filter'>
            <Form.Label htmlFor="inputText">Keresés:</Form.Label>
            <Form.Control
                type="text"
                id="inputText5"
                aria-describedby="passwordHelpBlock"
                placeholder='Keresendő szó'
                onChange={(event) => { handleChange(event) }}
            />
        </div>
    )
}

export default TextFilter