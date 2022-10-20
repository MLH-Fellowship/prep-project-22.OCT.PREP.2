import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import MyMap from './components/Map'
import Items from './Itemstobring'


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);


  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + "668f62d8d19a113b9ef1570c0656e8ff")
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])
  let backgroundChanger = "Results";
  if (results?.weather ){
      if(results.weather[0].main === "Clouds"){
          backgroundChanger = "clouds"
      } else if(results.weather[0].main === "Thunderstorm"){
          backgroundChanger = "thunderstorm"
      } else if(results.weather[0].main === "Drizzle"){
          backgroundChanger = "drizzle"
      } else if(results.weather[0].main === "Rain"){
          backgroundChanger = "rain"
      } else if(results.weather[0].main === "Snow"){
          backgroundChanger = "snow"
      } else{
          backgroundChanger = "Results"
      }
  }
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
        <div className={`${results?.weather[0]?.main !== "Clear" && "weather"} ${backgroundChanger}`}>
          {!isLoaded && <h2>Loading...</h2>}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
      {isLoaded && results && <>
        <Items ok = {results.weather[0].main}    /> 
        <MyMap location={results.coord} city={results.name} country={results.sys.country} weather={results.weather[0].main} feels_like={results.main.feels_like}/>

      </>}

    </>
  }
}

export default App;
