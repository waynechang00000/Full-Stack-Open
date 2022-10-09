const austinLoc = [30.3, -97.7];
const fetch = require('node-fetch');
const { API_KEY } = require("./util/config")
let baseTime = 1609372800
let counter = 368
let url = 
  `https://api.openweathermap.org/data/3.0/onecall/timemachine?units=imperial&lat=${austinLoc[0]}&lon=${austinLoc[1]}&dt=${baseTime}&appid=${API_KEY}`


// populate data from approximately 2021/1/1 to date

const testGet = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/weathers")
    if (!res.ok) {
      throw new Error(`Error! ${res.status}`)
    }
    console.log("testGet done")
  } catch (err) {
    console.log(err)
  }
}

const getData = async () => {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}, ${url}`);
    }
    const data = await res.json();
    // console.log(data)
    console.log("GET done")
    return data
  } catch (err) {
    console.log("GET error", err);
  }
}

const postData = async () => {
  const date = new Date(baseTime*1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const info = await getData()
  console.log(info)

  const req = {
    "year": year,
    "month": month,
    "day": day,
    "temp": info.data[0].temp,
    "humidity": info.data[0].humidity,
    "description": info.data[0].weather[0].description,
    "icon": info.data[0].weather[0].icon
  }
  console.log(req)

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  }
  console.log(config.body)

  try {
    await testGet()
    const res = await fetch("http://localhost:3001/api/weathers", config)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.statusText}`);
    }    
    console.log("POST done")
    baseTime += 3600 * 24
    // postData()
  } catch (e) {
    console.log("POST fail", e)
    // return
  }
}

while (counter < 370) {
  postData()
  baseTime += 3600 * 24
  counter += 1
}

// postData()
