import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import MyMap from './components/Map'
import Items from './Itemstobring'
import axios from 'axios';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [background, setBackground] = useState("Results")

  // check for background
  function updateBackground() {
    let backgroundChanger = "Results";
    if (results?.weather) {
      if (results.weather[0].main === "Clouds") {
        backgroundChanger = "clouds"
      } else if (results.weather[0].main === "Thunderstorm") {
        backgroundChanger = "thunderstorm"
      } else if (results.weather[0].main === "Drizzle") {
        backgroundChanger = "drizzle"
      } else if (results.weather[0].main === "Rain") {
        backgroundChanger = "rain"
      } else if (results.weather[0].main === "Snow") {
        backgroundChanger = "snow"
      } else {
        backgroundChanger = "Results"
      }
    }
    setBackground(backgroundChanger);
  }
  // fetch current location if geolocation permission granted
  async function fetchCurrentLocation(lat, long) {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_APIKEY}&units=metric`)
    if (res.status !== 200) {
      setIsLoaded(false);
    }
    else {
      setIsLoaded(true);
      await setResults(res.data);
      await setCity(res.data.name);
    }
    updateBackground();
  }
  function permissionGranted(position) {
    fetchCurrentLocation(position.coords.latitude, position.coords.longitude)
  }
  // if geolocation permission deined
  async function permissionDenied() {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`);
    if (res.status !== 200) {
      setIsLoaded(false);
    }
    else {
      setIsLoaded(true);
      await setResults(res.data);
    }
    updateBackground();
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(permissionGranted, permissionDenied);
    } else {
      window.alert("Geolocation is not supported by this browser.");
    }
  }, [])
  useEffect(() => {
    permissionDenied();
  }, [city])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className={`${results?.weather[0]?.main !== "Clear" && "weather"} ${background}`}>
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
      {isLoaded && results && <>
        <Items ok={results.weather[0].main} />
        <MyMap location={results.coord} city={results.name} country={results.sys.country} weather={results.weather[0].main} feels_like={results.main.feels_like} />

      </>}

    </>
  }
}

export default App;
