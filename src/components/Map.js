import React, { useRef, useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Map.css'

var marker = L.icon({
    iconUrl: './MapPin.webp',
    iconSize: [40, 40],
});

const MyMap = ({ center, city, country, weather, feels_like}) => {
    return (
        <div className="map">
            <MapContainer className="map"
                center={[center.lng, center.lat]}
                zoom={13}>
                <TileLayer
                    noWrap={true}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[34.038, -118.24881]}
                    icon={marker}>
                    <Popup>
                       <b>{city}, {country}</b> <br/>
                       <b>Temp: </b> {weather} <br/>
                       <b>Feels like: </b>{feels_like}°C <br/>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MyMap;