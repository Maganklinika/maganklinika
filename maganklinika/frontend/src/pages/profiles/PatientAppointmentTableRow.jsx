import React, { useState } from "react";
import ReactStars from "react-stars";
import usePatientContext from "../../contexts/PatientsContext";
import useDoctorContext from "../../contexts/DoctorContext";

const PatientAppointmentTableRow = (props) => {

    const [ratings, setRatings] = useState({});
    const {fetchAppointmentRating} = usePatientContext();
    const { fetchAppointmentByPatients } =
        useDoctorContext();

    const handleRatingChange = (appointmentId, newRating) => {
        setRatings(prevRatings => ({
          ...prevRatings,
          [appointmentId]: newRating,
        }));
        console.log(`Időpont ${appointmentId} új értékelése: ${newRating}`);
        fetchAppointmentRating(appointmentId, newRating);
        fetchAppointmentByPatients(props.e.u_id)
      };
    

  return (
    <tr className="text-center border-b border-gray-300">
      <td className="border border-gray-300 p-2">{props.e.time}</td>
      <td className="border border-gray-300 p-2">{props.e.user_name}</td>
      <td className="border border-gray-300 p-2">{props.e.t_name}</td>
      <td className="border border-gray-300 p-2">
        {props.e.rating === null ? 
        <ReactStars
          count={5}
          size={24}
          value={ratings[props.e.id] ?? props.e.rating ?? 0} // Ha van már állított érték, azt mutatja
          edit={true} // Engedélyezzük a módosítást
          activeColor="gold"
          onChange={(newRating) => handleRatingChange(props.e.id, newRating)}
          half={false}
        /> : 
        <span><p>Az értékelésed: </p> <ReactStars
        count={5}
        size={24}
        value={ratings[props.e.id] ?? props.e.rating ?? 0} // Ha van már állított érték, azt mutatja
        edit={false} // Engedélyezzük a módosítást
        activeColor="gold"
        onChange={(newRating) => handleRatingChange(props.e.id, newRating)}
        half={false}
          /> </span>
          }    
      </td>
      
    </tr>
  );
};

export default PatientAppointmentTableRow;
