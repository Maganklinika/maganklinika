import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./textfilter.css";


const TextFilter = ( props ) => {
  const [ filteredText, setFilteredText ] = useState( "" );

  const handleChange = ( event ) => {
    setFilteredText( event.target.value );
    if ( event.target.value === "" ) {
      props.filterListSetter( [ ...props.list ] );
    }

    const filteredList = props.list.filter( ( e ) => {
      if (
        e.d_name?.toLowerCase().includes( event.target.value.toLowerCase() ) ||
        e.s_name?.toLowerCase().includes( event.target.value.toLowerCase() ) ||
        e.user_name?.toLowerCase().includes( event.target.value.toLowerCase() ) ||
        e.u_phone?.toLowerCase().includes( event.target.value.toLowerCase() ) ||
        e.tn?.toString().includes( event.target.value ) ||
        e.t_name?.toLowerCase().includes( event.target.value.toLowerCase() )
      ) {
        return true;
      }
    } );
    props.filterListSetter( [ ...filteredList ] );

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
