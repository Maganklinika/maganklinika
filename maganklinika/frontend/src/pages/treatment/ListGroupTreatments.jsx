import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import "./listgroup.css";

const ListGroupTreatments = (props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/selected-treatment", { state: props.e });
  };

  return (
    <ListGroup horizontal className="my-2 custom-hover" onClick={handleOnClick}>
      <ListGroup.Item> {props.e.treatment_time}</ListGroup.Item>
      {props.e.patient_name ? (
        <ListGroup.Item>{props.e.patient_name}</ListGroup.Item>
      ) : (
        ""
      )}
      <ListGroup.Item>{props.e.treatment_name}</ListGroup.Item>
    </ListGroup>
  );
};

export default ListGroupTreatments;
