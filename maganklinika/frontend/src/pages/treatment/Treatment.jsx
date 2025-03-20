import React, { useEffect } from 'react'
import useDoctorContext from '../../contexts/DoctorContext'
import ListGroupTreatments from './ListGroupTreatments';
import useAuthContext from '../../contexts/AuthContext'

const Treatment = () => {
  const { fetchGetTodayAppointments, appointmentsToday } = useDoctorContext();
  const { user } = useAuthContext()

  useEffect( () => {
    fetchGetTodayAppointments( user.id );
  }, [] )

  return (
    <div>
      {
        appointmentsToday.length > 0 ?
          appointmentsToday.map( ( e, i ) => {
            return <ListGroupTreatments key={e.id} e={e} i={i} />
          } )
          :
          ""
      }
    </div>
  )
}

export default Treatment