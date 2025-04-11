import React, { useEffect } from "react";
import useDoctorContext from "../../contexts/DoctorContext";
import ListGroupTreatments from "./ListGroupTreatments";
import useAuthContext from "../../contexts/AuthContext";

const Treatment = () => {
  const { fetchGetTodayAppointments, appointmentsToday } = useDoctorContext();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchGetTodayAppointments(user.id);
  }, []);

  return (
    <div className="treatment-page">
      <h1>Mai vizsgálataid</h1>
      {appointmentsToday.length > 0
        ? appointmentsToday.map((e, i) => {
            return <ListGroupTreatments key={e.id} e={e} i={i} />;
          })
        : <h5>Ma nincsenek vizsgálataid</h5>}
    </div>
  );
};

export default Treatment;
