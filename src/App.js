import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
import Maps from "./Map/Map";
import Items from './Itemstobring'
import MyMap from './components/Map'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  var key = process.env.REACT_APP_APIKEY;
  console.log(key)
  const getWeatherFromCoordinates = (coordinates) => {
    fetch(
      'https://api.openweathermap.org/geo/1.0/reverse?lat=' + coordinates[0] + '&lon=' + coordinates[1] + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          result = JSON.stringify(result)
          if (result !== '[]') {
            result = result.split(',')[0]
            result = result.split(':')[1]
            result = result.split('"')[1]
            console.log('hello' + result)
            setCity(result)
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + result + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
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
          }

        },
        (error) => {
          console.log('error')
          setIsLoaded(true);
          setError(error);
        }
      )
  }
  useEffect(() => {
    console.log('hey' + city)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
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
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
      {isLoaded && results && <>
        <Items ok = {results.weather[0].main}    /> 
        {isLoaded && results && <Maps city={city} results={results} getWeatherFromCoordinates={getWeatherFromCoordinates}></Maps>}

      </>}

    </>
  }
}

export default App;
