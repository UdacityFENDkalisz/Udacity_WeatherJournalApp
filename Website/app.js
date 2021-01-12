/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=ad22b3914250b9b2132401055a08e508&units=imperial';

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e){
  const zipCode = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;
  getInfo(baseURL, zipCode, apiKey)
  .then(
    function(data){
    console.log(data);
    postData('/add', {
        "temperature": data.main.temp, 
        "date": newDate, 
        "userResponse": userResponse,
        "city": data.name,
        "country": data.sys.country,
        "icon": `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        "windspeed": `${data.wind.speed} mi/h`, 
        "maxTemp": `${Math.round(data.main.temp_max)} °F`,
        "minTemp": `${Math.round(data.main.temp_min)} °F`,
        "humidity": `${Math.round(data.main.humidity)} %`,
        "temp": `${Math.round(data.main.temp)} °F`,
        "cloudPer": `${data.clouds.all} %`,
        "cloudiness": data.weather[0].description,
        "sunrise": formatUnixTime(data.sys.sunrise),
        "sunset": formatUnixTime(data.sys.sunset),
    });
  })
      .then(function(){
        updateUI()
      })
    }

// Format Sunset and Sunrise Time 
const formatUnixTime = (unixTime) => {
    const time = new Date(unixTime * 1000);
    return `${time.toUTCString().slice(17, 25)} GMT`;
}


const getInfo = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}


const postData = async (url = '', data = {})=>{
      console.log(data);
      const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data)
    });

      try {
        const newData = await res.json();
        console.log(newData);
        return newData;
      }catch(error) {
          console.log("error", error);
      }
  }

  const updateUI = async () => {
    const res = await fetch('/retrieve');
    try{
      const lastEntry = await res.json();
      document.getElementById('icon').innerHTML = `<img class="icon" src="${lastEntry.icon}" alt="Weather icon">`;;
      document.getElementById('city').innerHTML = "Weather in " + lastEntry.city + ", " + lastEntry.country;
      document.getElementById('date').innerHTML = "Date: " + lastEntry.date;
      document.getElementById('temp').innerHTML = "Temperature: " + lastEntry.temperature +"°F";
      document.getElementById('content').innerHTML = "Feelings: " + lastEntry.userResponse;

    }catch(error){
        console.log("error", error);
    }
  }
