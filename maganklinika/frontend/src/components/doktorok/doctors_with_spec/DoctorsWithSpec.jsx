import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DoctorsWithSpec = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card">
      <div className="card-header">
        <h5>{props.e.d_name}</h5>
      </div>
      <div className="card-body">
        <div className="image">image</div>
        <div className="description">
          <div className="text">
            <div className="spec">
              <h6>Szakterület:</h6>
              <p>{props.e.s_name}</p>
            </div>
            <div className="email">
              <h6>Email:</h6>
              <p>
                <a href={`mailto:${props.e.email}`}>{props.e.email}</a>
              </p>
            </div>
          </div>
          <div className="button-div">
            <Button variant="primary" onClick={handleShow}>
              Részletek
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{props.e.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h6>Magamról:</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dolorum nisi laudantium maiores quibusdam pariatur nesciunt,
                    reprehenderit sed molestiae optio animi facilis commodi.
                    Numquam molestiae aut mollitia omnis aliquam consequatur
                    neque.
                  </p>
                </div>
                <div>
                  <h6>Értékelés:</h6>
                  <p>⭐⭐⭐⭐⭐</p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsWithSpec;
