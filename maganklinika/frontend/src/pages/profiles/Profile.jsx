import React, { useState, useEffect } from "react";
import useAuthContext from "../../contexts/AuthContext";
import useDoctorContext from "../../contexts/DoctorContext";
import PatientAppointmentTableRow from "./PatientAppointmentTableRow";

const Profile = () => {
  const { userData } = useAuthContext();
  const [ isEditing, setIsEditing ] = useState( false );
  const [ formData, setFormData ] = useState( {
    name: "",
    email: "",
    phone: "",
    address: "",
  } );

  const { appointmentsByPatients, fetchAppointmentByPatients } =
    useDoctorContext();

  useEffect( () => {
    if ( userData.length > 0 && userData[ 0 ]?.id ) {
      setFormData( {
        name: userData[ 0 ]?.name || "",
        email: userData[ 0 ]?.email || "",
        phone: userData[ 0 ]?.phone_number || "",
        address: userData[ 0 ]?.address || "",
      } );
      const getData = async () => {
        await fetchAppointmentByPatients( userData[ 0 ].id );
      };
      getData();
    }
  }, [ userData ] );

  const handleChange = ( e ) => {
    setFormData( {
      ...formData,
      [ e.target.name ]: e.target.value,
    } );
  };

  const handleEdit = () => setIsEditing( true );
  const handleSave = () => {
    console.log( "Mentett adatok:", formData );
    setIsEditing( false );
  };

  return (
    <div>
      <div className="container max-w-4xl mx-auto mt-4 px-4 p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Saját profil</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-semibold">
              <b>Név:</b>
            </span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            ) : (
              <p>{formData?.name}</p>
            )}
          </div>
          <div>
            <span className="font-semibold">
              <b>Email:</b>
            </span>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            ) : (
              <p>{formData?.email}</p>
            )}
          </div>
          <div>
            <span className="font-semibold">
              <b>Telefonszám:</b>
            </span>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData?.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            ) : (
              <p>{formData?.phone}</p>
            )}
          </div>

          {
            userData[ 0 ]?.role_id === 3 ? (
              <>
                <div>
                  <span className="font-semibold">
                    <b>Cím:</b>
                  </span>
                  {
                    isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData?.address}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                      />
                    ) : (
                      <p>{formData?.address}</p>
                    )}
                </div>
                <div>
                  <span className="font-semibold">
                    <b>Születési dátum:</b>
                  </span>
                  <p>{userData[ 0 ]?.birth_date}</p>
                </div>
                <div>
                  <span className="font-semibold">
                    <b>TAJ szám:</b>
                  </span>
                  <p>{userData[ 0 ]?.taj_number}</p>
                </div>
              </>
            ) :
              <>
                {/* Doktor role profil */}
                <p>Doktor adatok</p>
              </>
          }
        </div>
        {isEditing ? (
          <button className="btn btn-primary" onClick={handleSave}>
            Mentés
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleEdit}>
            Módosítás
          </button>
        )}
      </div>

      {
        userData[ 0 ]?.role_id === 3 ?
          <div className="container mx-auto mt-4 px-4 bg-white">
            <h2 className="text-xl font-bold mt-6 mb-2">Kezelések listája</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Időpont: </th>
                    <th className="border border-gray-300 p-2">Orvos</th>
                    <th className="border border-gray-300 p-2">Kezelés</th>
                    <th className="border border-gray-300 p-2">Törlés</th>
                    <th className="border border-gray-300 p-2">Értékelés</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsByPatients && appointmentsByPatients.length > 0 ? (
                    appointmentsByPatients.map( ( e, i ) => {
                      return <PatientAppointmentTableRow e={e} key={i} />;
                    } )
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4">
                        Nincs elérhető időpont
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          :
          <></>
      }
    </div>
  );
};

export default Profile;
