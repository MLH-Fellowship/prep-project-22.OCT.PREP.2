import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Map.css'

var marker = L.icon({
    iconUrl: './MapPin.webp',
    iconSize: [40, 40],
});

const MyMap = ({ location, city, country, weather, feels_like}) => {
    const coord = [location.lat, location.lon]
    return (
        <div className="map">
            <MapContainer className="map"
                center={coord}
                zoom={3}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={coord}
                    icon={marker}>
                    <Popup>
                       <b>{city}, {country}</b> <br/>
                       <b>Weather: </b> {weather} <br/>
                       <b>Feels like: </b>{feels_like}°C <br/>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MyMap;