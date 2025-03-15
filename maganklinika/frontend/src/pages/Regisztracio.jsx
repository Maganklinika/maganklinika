import React, { useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


const Regisztracio = () => {
  const [ selectedValue, setSelectedValue ] = useState( "patient" );
  const [ name, setName ] = useState( "" );
  const [ birthDay, setBirthDay ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ phone, setPhone ] = useState( "" );
  const [ taj, setTaj ] = useState( "" );
  const [ licence, setLicence ] = useState( "" );
  const [ address, setAddress ] = useState( "" );
  const [ password_confirmation, setPassword_confirmation ] = useState( "" );
  const [ spec_id, setSpec ] = useState( "" );
  const [ localErrors, setLocalErrors ] = useState( {} ); // Lokális hibaállapot

  const { reg, errors, fetchSpecializations, specializations, checkDoctorLicence, isValidLicence } = useAuthContext();

  const handleSubmit = async ( e ) => {
    e.preventDefault();

    let licenceResponse = "";

    if ( selectedValue === "doctor" ) {
      licenceResponse = await checkDoctorLicence( licence );
    }

    const adat = {
      name: name,
      email: email,
      phone_number: phone,
      password: password,
      password_confirmation: password_confirmation,
      licence_number: licence,
      taj_number: taj,
      address: address,
      birth_date: birthDay,
      selectedValue: selectedValue,
      specialization_id: spec_id,
    }

    console.log( licenceResponse.statusText )
    if ( selectedValue === "doctor" ) {
      if ( licenceResponse.statusText === "OK" ) {
        reg( adat );
      } else {
        setLocalErrors( ( prev ) => ( {
          ...prev,
          licence: licenceResponse.message,
        } ) );
      }
    } else if ( selectedValue === "patient" ) {
      reg( adat );
    }

  };

  const radiobuttonClickHandle = ( e ) => {
    setName( "" );
    setBirthDay( "" );
    setAddress( "" );
    setEmail( "" );
    setLicence( "" );
    setPassword( "" );
    setPassword_confirmation( "" );
    setTaj( "" );
    setPhone( "" );
    setSelectedValue( e );
    if ( e === "doctor" )
      fetchSpecializations();
    setSpec( "" );
  }


  return (
    <div className="m-auto" style={{ maxWidth: "80vw" }}>
      <h1 className="text-center">Regisztráció</h1>

      <Form>
        <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
          <Form.Check
            inline
            label="Páciens"
            name="patientOptions"
            type="radio"
            id="patient"
            value="patient"
            checked={selectedValue === "patient"}
            onChange={( e ) => radiobuttonClickHandle( e.target.value )}
          />
          <Form.Check
            inline
            label="Doktor"
            name="doctorOptions"
            type="radio"
            id="doctor"
            value="doctor"
            checked={selectedValue === "doctor"}
            onChange={( e ) => radiobuttonClickHandle( e.target.value )}
          />
        </Form.Group>
      </Form >
      {selectedValue === "patient" ? (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">
                      Név:
                    </label>
                    <input
                      type="text"
                      // value beállítása a state értékére
                      value={name}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setName( e.target.value );
                      }}
                      className="form-control"
                      id="name"
                      placeholder="név"
                      name="name"
                    />
                  </div>
                  <div>
                    {errors.name && (
                      <span className="text-danger">{errors.name[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="phone" className="form-label">
                      Telefonszám:
                    </label>
                    <input
                      type="text"
                      // value beállítása a state értékére
                      value={phone}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setPhone( e.target.value );
                      }}
                      className="form-control"
                      id="phone"
                      placeholder="Telefonszám"
                      name="phone"
                    />
                  </div>
                  <div>
                    {errors.phone && (
                      <span className="text-danger">{errors.phone[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      // value beállítása a state értékére
                      value={email}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setEmail( e.target.value );
                      }}
                      className="form-control"
                      id="email"
                      placeholder="email"
                      name="email"
                    />
                  </div>
                  <div>
                    {errors.email && (
                      <span className="text-danger">{errors.email[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="birthDay" className="form-label">
                      Születési év:
                    </label>
                    <input
                      type="date"
                      // value beállítása a state értékére
                      value={birthDay}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setBirthDay( e.target.value );
                      }}
                      className="form-control"
                      id="birthDay"
                      name="birthDay"
                    />
                  </div>
                  <div>
                    {errors.birthDay && (
                      <span className="text-danger">{errors.birthDay[ 0 ]}</span>
                    )}
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <div className="mb-3 mt-3">
                    <label htmlFor="address" className="form-label">
                      Cím:
                    </label>
                    <input
                      type="text"
                      // value beállítása a state értékére
                      value={address}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setAddress( e.target.value );
                      }}
                      className="form-control"
                      id="address"
                      placeholder="Cím"
                      name="address"
                    />
                  </div>
                  <div>
                    {errors.address && (
                      <span className="text-danger">{errors.address[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="taj" className="form-label">
                      Taj szám:
                    </label>
                    <input
                      type="number"
                      // value beállítása a state értékére
                      value={taj}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setTaj( e.target.value );
                      }}
                      className="form-control"
                      id="taj"
                      placeholder="Taj szám"
                      name="taj"
                    />
                  </div>
                  <div>
                    {errors.taj && (
                      <span className="text-danger">{errors.taj[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">
                      Jelszó:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={( e ) => {
                        setPassword( e.target.value );
                      }}
                      className="form-control"
                      id="pwd"
                      placeholder="jelszó"
                      name="pwd"
                    />
                    <div>
                      {errors.password && (
                        <span className="text-danger">{errors.password[ 0 ]}</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwdcmn" className="form-label">
                      Jelszó:
                    </label>
                    <input
                      type="password"
                      value={password_confirmation}
                      onChange={( e ) => {
                        setPassword_confirmation( e.target.value );
                      }}
                      className="form-control"
                      id="pwdcmn"
                      placeholder="jelszó újra"
                      name="pwdcmn"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">
                      Név:
                    </label>
                    <input
                      type="text"
                      // value beállítása a state értékére
                      value={name}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setName( e.target.value );
                      }}
                      className="form-control"
                      id="name"
                      placeholder="név"
                      name="name"
                    />
                  </div>
                  <div>
                    {errors.name && (
                      <span className="text-danger">{errors.name[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="phone" className="form-label">
                      Telefonszám:
                    </label>
                    <input
                      type="text"
                      // value beállítása a state értékére
                      value={phone}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setPhone( e.target.value );
                      }}
                      className="form-control"
                      id="phone"
                      placeholder="Telefonszám"
                      name="phone"
                    />
                  </div>
                  <div>
                    {errors.phone && (
                      <span className="text-danger">{errors.phone[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      // value beállítása a state értékére
                      value={email}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setEmail( e.target.value );
                      }}
                      className="form-control"
                      id="email"
                      placeholder="email"
                      name="email"
                    />
                  </div>
                  <div>
                    {errors.email && (
                      <span className="text-danger">{errors.email[ 0 ]}</span>
                    )}
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <div className="mb-3 mt-3">
                    <label htmlFor="licence-number" className="form-label">
                      Orvosi licensz szám:
                    </label>
                    <input
                      type="number"
                      // value beállítása a state értékére
                      value={licence}
                      // state értékének módosítása ha változik a beviteli mező tartalma
                      onChange={( e ) => {
                        setLicence( e.target.value );
                      }}
                      className="form-control"
                      id="licence"
                      placeholder="Orvosi Licensz szám"
                      name="licence"
                    />
                  </div>
                  <div>
                    {errors.licence && (
                      <span className="text-danger">{errors.licence[ 0 ]}</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">
                      Jelszó:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={( e ) => {
                        setPassword( e.target.value );
                      }}
                      className="form-control"
                      id="pwd"
                      placeholder="jelszó"
                      name="pwd"
                    />
                    <div>
                      {errors.password && (
                        <span className="text-danger">{errors.password[ 0 ]}</span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pwdcmn" className="form-label">
                      Jelszó:
                    </label>
                    <input
                      type="password"
                      value={password_confirmation}
                      onChange={( e ) => {
                        setPassword_confirmation( e.target.value );
                      }}
                      className="form-control"
                      id="pwdcmn"
                      placeholder="jelszó újra"
                      name="pwdcmn"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                Specializáció kiválasztása:
              </label>
              <Form.Select aria-label="select-spec"
                onChange={( event ) => {

                  setSpec( Number( event.target.value ) )
                }}
              >
                <option value={"-1"}>Válassz a listából</option>
                {
                  specializations ?
                    specializations.map( ( e ) => {
                      return <option key={e.specialization_id} value={e.specialization_id}>{e.specialization_name}</option>
                    } ) :
                    ""
                }
              </Form.Select>

            </div>
          </Container>
          {localErrors.licence && (
            <span className="text-danger">{localErrors.licence}</span>
          )}
        </Form>
      )
      }
      <div className="text-center">
        <Button type="submit" className="btn btn-primary w-50">
          Regisztráció
        </Button>
      </div>
    </div >
  );
};

export default Regisztracio;
