import React, { useState } from "react";
import useDoctorContext from "../contexts/DoctorContext";
import Calendar from "react-calendar";
import { Button, ListGroup, Modal } from "react-bootstrap";
import "./appointment.css";
import usePatientContext from "../contexts/PatientsContext";
import useAuthContext from "../contexts/AuthContext";
import { myAxios } from "../api/Axios";

const CreateAppointmentsByDoctor = () => {
  const { appointmentsByDoctor, appointmentsByDate, fetchAppontmentsByDoctor } = useDoctorContext();
  const { appointments } = usePatientContext();
  const { user } = useAuthContext();
  const [ date, setDate ] = useState( new Date() );
  const [ show, setShow ] = useState( false );
  const [ selectedDate, setSelectedDate ] = useState( null );
  const [ treatment, setTreatment ] = useState( "" );
  const [ startTime, setStartTime ] = useState( "7:00" );
  const [ endTime, setEndTime ] = useState( "18:00" );

  const handleDateClick = ( value ) => {
    const formattedDate = value.toLocaleDateString( "sv-SE" );
    setSelectedDate( formattedDate );
    setShow( true );
  };

  // Az időpontok generálása 7:00 és 14:00 között, 30 perces lépésekben
  const createStartTimes = () => {
    const times = [];
    const startHour = 7; // Kezdési idő 7:00
    const endHour = 14; // Maximális kezdési idő 14:00

    // 30 perces lépések generálása, 14:30 nem szerepel
    for ( let h = startHour; h <= endHour; h++ ) {
      for ( let m = 0; m < 60; m += 30 ) {
        if ( !( h === 14 && m === 30 ) ) {
          // 14:30 nem jelenhet meg
          const hour = String( h ).padStart( 2, "0" );
          const minute = String( m ).padStart( 2, "0" );
          times.push( `${ hour }:${ minute }` );
        }
      }
    }

    return times;
  };

  const handleSubmit = async () => {
    const startDateTime = `${ selectedDate }T${ startTime }:00`; // dátum + időformátum
    const endDateTime = `${ selectedDate }T${ endTime }:00`; // dátum + időformátum

    // POST kérés küldése a backend felé
    const response = await myAxios
      .post( "/api/create-appointments", {
        start_time: startDateTime,
        end_time: endDateTime,
        treatment_name: treatment, // kezelés neve
      } )
    console.log( response.message )
    fetchAppontmentsByDoctor( user.id )

  };

  const createEndTimes = ( startTime ) => {
    const endTimes = [];
    const [ startHour, startMinute ] = startTime.split( ":" );
    let startInMinutes = parseInt( startHour ) * 60 + parseInt( startMinute ); // Kezdés időpontja percben

    // Ha a kezdés 12:00 vagy később, akkor a zárás legkorábban 14:00
    let displayTime = startInMinutes + 120; // Alapértelmezett 2 órás eltolás, ha 12:00 vagy későbbi kezdés

    // A legkorábbi zárás 12:00, ha még nem érjük el
    if ( startInMinutes < 12 * 60 ) {
      displayTime = 12 * 60; // Zárás legkorábban 12:00
    }

    // Ha a kezdés 12:00 után van, akkor a legkorábbi zárás 14:00
    if ( startInMinutes >= 12 * 60 ) {
      displayTime = Math.max( startInMinutes + 120, 14 * 60 ); // 2 órás eltolás vagy minimum 14:00
    }

    // 30 perces lépésekben hozzuk létre a zárási időpontokat, de ne zárjuk le előre, hogy csak 8 órás legyen
    for ( let t = displayTime; t <= 18 * 60; t += 30 ) {
      let hours = Math.floor( t / 60 );
      let minutes = t % 60;
      const hour = String( hours ).padStart( 2, "0" );
      const minute = String( minutes ).padStart( 2, "0" );
      endTimes.push( `${ hour }:${ minute }` );
    }

    return endTimes;
  };

  // Kezdés időpont változása, zárás automatikus frissítése
  const handleStartTimeChange = ( event ) => {
    const selectedStartTime = event.target.value;
    setStartTime( selectedStartTime );

    // Zárás beállítása az új kezdéshez
    const newEndTimes = createEndTimes( selectedStartTime );
    setEndTime( newEndTimes[ 0 ] ); // Az első elérhető zárás
  };

  const handleChange = ( event ) => {
    setTreatment( event.target.value );
  };

  // Ellenőrizni, hogy egy adott nap hétvége vagy múltbeli dátum
  const tileClassName = ( { date, view } ) => {
    const isWeekend = date.getDay() === 6 || date.getDay() === 0; // Szombat vagy vasárnap
    const isPastDate = date < new Date(); // Ha a nap a múltban van
    const formattedDate = date.toLocaleDateString( "sv-SE" );

    // Ha múltbeli vagy hétvégi dátum, pirosra színezzük és nem lehet kattintani
    if ( isWeekend ) {
      return "red-tile"; // Osztály, amit a CSS-ben kezelhetünk
    }

    // Ha van foglalás az adott napon, akkor azt is kezelhetjük
    if (
      appointmentsByDate[ formattedDate ] &&
      appointmentsByDate[ formattedDate ].length > 0
    ) {
      return "has-appointments"; // Ha van foglalás, külön osztály
    }

    return null;
  };
  console.log( "appointmentsByDoctor:", appointmentsByDoctor );
  console.log( selectedDate );


  const getTreatmentsByDoctor = () => {
    const result = appointments
      .map( ( e ) => {
        if ( user.name === e.d_name ) {
          return e.t_name;
        }
        return "";
      } )
      .filter( ( e ) => e !== "" );
    return result;
  };

  return (
    <div className="container mt-4 calendarParent">
      <h2 className="h2book">Időpont létrehozása</h2>
      <Calendar
        className="calendar"
        onClickDay={handleDateClick}
        value={date}
        tileClassName={tileClassName}
      />

      <Modal show={show} onHide={() => setShow( false )}>
        <Modal.Header closeButton>
          <Modal.Title>Nap: {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {appointmentsByDate[ selectedDate ] &&
            appointmentsByDate[ selectedDate ].length > 0 ? (
            <div>
              <ListGroup>
                {appointmentsByDate[ selectedDate ].map(
                  ( appointmentsByDate, index ) => (
                    <ListGroup.Item key={index}>
                      {`
                    Treatment ID: ${ appointmentsByDate.treatment_id }, 
                    Start Time: ${ appointmentsByDate.start_time },
                    `}
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
              <form className="select-time-form book">
                <label htmlFor="kezeles">Kezelés: </label>
                <select value={treatment} onChange={handleChange}>
                  {getTreatmentsByDoctor()?.map( ( e, i ) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ) )}
                </select>
                <p>
                  <label htmlFor="start">Kezdés: </label>
                  <select value={startTime} onChange={handleStartTimeChange}>
                    {createStartTimes().map( ( time, i ) => (
                      <option value={time} key={i}>
                        {time}
                      </option>
                    ) )}
                  </select>
                  <label htmlFor="end">Végzés: </label>
                  <select
                    value={endTime}
                    onChange={( e ) => setEndTime( e.target.value )}
                  >
                    {createEndTimes( startTime ).map( ( time, i ) => (
                      <option value={time} key={i}>
                        {time}
                      </option>
                    ) )}
                  </select>
                </p>
              </form>
            </div>
          ) : (
            selectedDate >= date.toLocaleDateString( "sv-SE" ) ?
              < form className="select-time-form">
                <label htmlFor="kezeles">Kezelés:</label>
                <select value={treatment} onChange={handleChange}>
                  {getTreatmentsByDoctor()?.map( ( e, i ) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ) )}
                </select>

                <label htmlFor="start">Kezdés:</label>
                <select value={startTime} onChange={handleStartTimeChange}>
                  {createStartTimes().map( ( time, i ) => (
                    <option value={time} key={i}>
                      {time}
                    </option>
                  ) )}
                </select>

                <label htmlFor="end">Végzés:</label>
                <select
                  value={endTime}
                  onChange={( e ) => setEndTime( e.target.value )}
                >
                  {createEndTimes( startTime ).map( ( time, i ) => (
                    <option value={time} key={i}>
                      {time}
                    </option>
                  ) )}
                </select>
              </form>
              :
              ""
          )}
        </Modal.Body>
        <Modal.Footer>
          {
            selectedDate >= date.toLocaleDateString( "sv-SE" ) ? (
              <Button variant="primary" onClick={handleSubmit}>
                Mentés
              </Button>
            ) :
              ""
          }
          <Button variant="secondary" onClick={() => setShow( false )}>
            Bezárás
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default CreateAppointmentsByDoctor;
