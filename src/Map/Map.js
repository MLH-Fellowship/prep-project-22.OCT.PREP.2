import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useRef, useEffect } from "react";
import './Map.css'
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {
    FaArrowDown,
    FaArrowUp
} from "react-icons/fa";
const Maps = (props) => {
    
    const [center, setCenter] = useState(props.results['coord'])
    const [pressed, setPressed] = useState(true);
    
    useEffect(() => {
        setCenter(props.results['coord'])
    }, [props.results['coord'], center], pressed);
    const collapseHandler = () => {
        setPressed(!pressed);
    };
    const ZOOM_LEVEL = 7;
    const mapRef = useRef();


return (
    <div>
        {pressed && <button className='button1' onClick={collapseHandler}><FaArrowUp />    </button>}
        {!pressed && <button className='button1' onClick={collapseHandler}><FaArrowDown />    </button>}

        {center === props.results['coord'] &&   pressed && <MapContainer
            className='leaflet-container'  center={center} zoom={ZOOM_LEVEL} ref={mapRef}
            whenReady={(map) => {
                console.log(map);
                map.target.on("click", function (e) {
                  const { lat, lng } = e.latlng;
                  props.getWeatherFromCoordinates([lat, lng])
                });
              }}>
            <TileLayer
                url={'https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=gvRSbC5gEHRXVzZZ1FG1'}
                attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}
            />

            <Marker icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} position={props.results['coord']}>
                <Popup>
                    <h4>{props.results.weather[0].main} </h4>

                    <h4>Feels like {props.results.main.feels_like}°C</h4>
                </Popup>
            </Marker>
        </MapContainer>
        }
        {!pressed && <div className='ButtonContainer'></div>}
    </div>
);
}
export default Maps;