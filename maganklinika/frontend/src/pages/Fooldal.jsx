import React, { useState, useEffect } from "react";
import { myAxios } from "../api/Axios";
import './Fooldal.css';
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import useAuthContext from "../contexts/AuthContext";

const Fooldal = () => {
  const { user } = useAuthContext();
  const [ specializations, setSpecializations ] = useState( [] );
  const navigate = useNavigate();

  console.log( user )
  const fetchAllSpecializations = async () => {
    try {
      const response = await myAxios.get( "/api/specializations" );
      setSpecializations( response.data );
    } catch ( error ) {
      console.error( "Hiba történt a specializációk lekérésekor:", error );
    }
  };

  const handleClick = () => {
    if ( user && user.role_id === 3 ) {
      navigate( "/appointments" )
    } else {
      navigate( "/login" )
    }
  }

  useEffect( () => {
    fetchAllSpecializations();
  }, [] );

  // Carousel
  const UncontrolledExample = () => {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/clinic1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Ügyfélfogadás</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/clinic2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Épületünk</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/clinic3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Belső nézet</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/clinic4.jpg"
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3>Új szárny</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/clinic5.jpg"
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3>Új szárny</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  };

  return (
    <div>
      <div className="clinic-description">
        <h2>Üdvözöljük a Magánklinika weboldalán!</h2>
        <p>
          Klinikánkon a legmodernebb eszközökkel és magasan képzett szakemberekkel várjuk
          Önt. Különböző kezeléseket és konzultációkat kínálunk, hogy a legjobb
          egészségügyi szolgáltatásokat nyújthassuk.
        </p>
      </div>

      <UncontrolledExample />

      <div className="specializations">
        <h3>Az alábbi témákban fordulhatnak hozzánk:</h3>
        <ul>
          {specializations.length > 0 ? (
            specializations.map( ( spec, index ) => (
              <li key={index}>{spec.specialization_name}</li>
            ) )
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
      <button className="appointment-button" onClick={() => handleClick()}>
        Időpontfoglalás
      </button>
    </div>
  );
};

export default Fooldal;
