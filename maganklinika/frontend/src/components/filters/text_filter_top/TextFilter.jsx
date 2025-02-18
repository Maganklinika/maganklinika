import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./textfilter.css";
import usePatientContext from "../../../contexts/PatientsContext";

const TextFilter = (props) => {
  const [filteredText, setFilteredText] = useState("");

  const handleChange = (event) => {
    setFilteredText(event.target.value);
    console.log(event.target.value);
    if (event.target.value === "") {
      props.filterListSetter([...props.list]);
    }

    const filteredList = props.list.filter((e) => {
      if (e.d_name.toLowerCase().includes(event.target.value.toLowerCase())) {
        return e;
      }
    });
    props.filterListSetter([...filteredList]);
  };

  return (
    <div className="top-filter">
      <Form.Label htmlFor="inputText">Keresés:</Form.Label>
      <Form.Control
        type="text"
        id="inputText5"
        aria-describedby="passwordHelpBlock"
        placeholder="Keresendő szó"
        onChange={handleChange}
        value={filteredText}
      />
    </div>
  );
};

export default TextFilter;
