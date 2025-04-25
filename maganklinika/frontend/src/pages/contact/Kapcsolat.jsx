import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import L from "leaflet";
import "font-awesome/css/font-awesome.min.css";
import "./contact.css"

const Kapcsolat = () => {
  const position = [ 16.761785, -169.515644 ];

  const awesomeMarker = L.AwesomeMarkers.icon( {
    icon: "fa-map-marker",
    prefix: "fa",
    markerColor: "red", 
    iconColor: "white", 
  } );

  useEffect( () => {
    delete L.Icon.Default.prototype._getIconUrl;
  }, [] );

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Kapcsolat</h2>
      <div className="map container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

        <MapContainer center={position} zoom={14} style={{ height: "380px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={awesomeMarker}>
            <Popup>
              <b>Itt található az irodánk!</b> 📍
            </Popup>
          </Marker>
        </MapContainer>

        <div className="text-center mt-6">
          <p><strong>Cím:</strong>Akau Sziget</p>
          <p><strong>Telefon:</strong> +36 1 234 5678</p>
          <p><strong>Email:</strong> info@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Kapcsolat