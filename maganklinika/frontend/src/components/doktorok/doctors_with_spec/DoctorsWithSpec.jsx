import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactStars from "react-stars";

const DoctorsWithSpec = ( props ) => {
  const [ show, setShow ] = useState( false );

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );

  const getStarCount = () => {
    const result = props.ratingList
      .map( ( e ) => {
        if ( props.e.d_name === e.doctor_name ) {
          return <ReactStars
            count={5}
            size={24}
            value={e.rating}
            edit={false}
            activeColor="gold"
            half={true}
          />;
        }
        return ""; 
      } )
      .filter( ( stars ) => stars !== "" ); 

    return result.length > 0 ? result[ 0 ] : "Nincs értékelés";
  };
  return (
    <div className="card">
      <div className="card-header">
        <h5>{props.e.d_name}</h5>
      </div>
      <div className="card-body">
        <div className="image">
          {
            props.e.img ?
              <img src={`http://localhost:8000/storage/${ props.e.img }`} alt={props.e.img} /> :
              <img src="/images/profile_picture/default_profil_picture.webp" alt="default_profile_picture" />
          }

        </div>
        <div className="description">
          <div className="text">
            <div className="spec">
              <h6>Szakterület:</h6>
              <p>{props.e.s_name}</p>
            </div>
            <div className="email">
              <h6>Email:</h6>
              <p>
                <a href={`mailto:${ props.e.email }`}>{props.e.email}</a>
              </p>
            </div>
          </div>
          <div className="button-div">
            <Button variant="primary" onClick={handleShow}>
              Részletek
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{props.e.d_name}</Modal.Title>
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
                  {getStarCount()}
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
