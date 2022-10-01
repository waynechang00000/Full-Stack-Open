import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
// import Input from "../components/input.js";
// import env from "react-dotenv";

function App() {
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState([]);
  const [display, setDisplay] = useState("");
  const [noresult, setNoresult] = useState(false);
  const [icon, setIcon] = useState("")

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then(res => {
        console.log(res.data[0].latlng)
        setLocation(res.data[0].latlng)
        setNoresult(false)
      })
      .catch(err => {
        console.log(err)
        setNoresult(true)
      })
  }, [country]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${location[0]}&lon=${location[1]}&exclude=hourly,daily,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}`
        )
      .then(res => {
        console.log(res.data)
        setDisplay(JSON.stringify(res.data))
        console.log(JSON.parse(display).current.weather[0].icon)
        setIcon(`http://openweathermap.org/img/wn/${res.data.current.weather[0].icon}@2x.png`)
      })
      .catch(err => {
        console.log(err)
      })
  }, [location]);

  return (
    <div>
      <input value={country} name="country" type="text" 
        onChange={e => setCountry(e.target.value)} />
      <br></br>
      <div>
        {noresult 
          ? "Please enter a country." 
          : <img src={icon} alt="icon"></img>}
      </div>
    </div>
  );
}

export default App;

// TODO
// weather icon, 
