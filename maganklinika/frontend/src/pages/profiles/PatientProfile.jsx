import React, { useState, useEffect } from "react";
import useAuthContext from "../../contexts/AuthContext";
import useDoctorContext from "../../contexts/DoctorContext";

const PatientProfile = () => {
  const { userData } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const {appointmentsByPatients, fetchAppointmentByPatients} = useDoctorContext();

  useEffect(() => {
    if (userData.length > 0 && userData[0]?.id) {
      setFormData({
        name: userData[0]?.name || "",
        email: userData[0]?.email || "",
        phone: userData[0]?.phone_number || "",
        address: userData[0]?.address || "",
      });
      const getData = async () => {
        await fetchAppointmentByPatients(userData[0].id);
      };
      getData();
    }
  }, [userData]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    console.log("Mentett adatok:", formData);
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1>Saját profil</h1>
        </div>
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <td><strong>Név:</strong></td>
                <td>
                  {isEditing ? (
                    <input type="text" name="name" value={formData?.name} onChange={handleChange} />
                  ) : (
                    formData?.name
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>
                  {isEditing ? (
                    <input type="email" name="email" value={formData?.email} onChange={handleChange} />
                  ) : (
                    formData?.email
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Telefonszám:</strong></td>
                <td>
                  {isEditing ? (
                    <input type="text" name="phone" value={formData?.phone} onChange={handleChange} />
                  ) : (
                    formData?.phone
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Cím:</strong></td>
                <td>
                  {isEditing ? (
                    <input type="text" name="address" value={formData?.address} onChange={handleChange} />
                  ) : (
                    formData?.address
                  )}
                </td>
              </tr>
              <tr>
                <td><strong>Születési dátum:</strong></td>
                <td>{userData[0]?.birth_date}</td>
              </tr>
              <tr>
                <td><strong>TAJ szám:</strong></td>
                <td>{userData[0]?.taj_number}</td>
              </tr>
            </tbody>
          </table>

          {isEditing ? (
            <button className="btn btn-success" onClick={handleSave}>Mentés</button>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit}>Módosítás</button>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Időpont</th>
            <th>Orvos</th>
            <th>Kezelés</th>
            <th>Értékelés</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsByPatients ? (
            appointmentsByPatients.map((e, i) => (
              <tr key={i}>
                <td>{e.time}</td>
                <td>{e.user_name}</td>
                <td>{e.t_name}</td>
                <td><button>ez mán igen</button></td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">Loading...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientProfile;
