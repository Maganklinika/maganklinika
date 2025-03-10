import React, { useState } from 'react';
import useAuthContext from '../../contexts/AuthContext';


const PatientProfile = () => {
    const { user } = useAuthContext();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

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
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                    ) : (
                                        formData.name
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>
                                    {isEditing ? (
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    ) : (
                                        formData.email
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Telefonszám:</strong></td>
                                <td>
                                    {isEditing ? (
                                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                                    ) : (
                                        formData.phone
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Lakcím:</strong></td>
                                <td>
                                    {isEditing ? (
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                                    ) : (
                                        formData.address
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td><strong>Születési dátum:</strong></td>
                                <td>{user.birthdate}</td>
                            </tr>
                            <tr>
                                <td><strong>TAJ szám:</strong></td>
                                <td>{user.taj}</td>
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
        </div>
    );
};

export default PatientProfile;
    