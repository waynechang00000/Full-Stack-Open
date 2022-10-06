const cron = require('node-cron');
const austinLoc = [30.3, -97.7];
const fetch = require('node-fetch');
const { API_KEY } = require("./util/config")
const url = 
  `https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat=${austinLoc[0]}&lon=${austinLoc[1]}&exclude=hourly,current,minutely,alerts&appid=${API_KEY}`

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

// testGet()

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
  const data = await getData()
  // console.log(data)
  const req = {
    "max": data.daily[0].temp.max,
    "min": data.daily[0].temp.min,
    "humidity": data.daily[0].humidity,
    "description": data.daily[0].weather[0].description,
    "icon": data.daily[0].weather[0].icon
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
      // throw new Error(res.json())
    }    
    console.log("POST done")
  } catch (e) {
    console.log("POST fail", e)
  }

}

// postData()

cron.schedule('* * * * *', async function() {
  await postData()
  console.log('running a task every minute');
});
