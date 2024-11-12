import React,{useState} from 'react'
import './Weather.css'
import { FaSearch } from 'react-icons/fa'

const Weather = () => {
    const [city,setCity]=useState("");
    const [weather , setWeather] = useState();
    const [error , setError] = useState();
    const API_KEY = "108d3779bf5c7a00803b52311109dc9e";
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  function handleOnChange(event){
    setCity(event.target.value);

  }
  async function fetchData() {
    try{
    let response =await fetch(url);
    let output = await response.json();
    if(response.ok){
      setWeather(output);
        setError('');
         setTimeout(setCity(''), 7000);
    }else
    {
      setError('No data found :(  Please enter a valid city name ');
        setWeather('');
    }
    }
    catch(error){

    }
  }
  return (
    <div className='container'>
     <div className="city">
        <input type="text" value={city} onChange={handleOnChange} placeholder='Enter any city name '/>
        <button onClick={()=>fetchData()}>
            <FaSearch ></FaSearch>
        </button>
     </div>
     {
      error && <p className='error-message'>{error}</p>
     }
         weather && weather.weather &&
      <div className="content">
         <div className="weather-image">
          <img src={ `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <h2>{weather.weather[0].description}</h2>
        </div>
         <div className='weather-temp'>
                    <h2>{weather.main.temp}<span>&deg;C</span></h2>
                </div>

                <div className='weather-city'>
                    <div className='location'>
                        <MdLocationOn></MdLocationOn>
                    </div>
                    <p>{weather.name},<span>{weather.sys.country}</span></p>
                </div>

                <div className='weather-stats'>
                    <div className='wind'>
                        <div className='wind-icon'>
                            <FaWind></FaWind>
                        </div>
                        <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                        <h3 className='wind-heading'>Wind Speed</h3>
                    </div>    
                    <div className='humidity'>
                        <div className='humidity-icon'>
                            <WiHumidity></WiHumidity>
                        </div>
                        <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                        <h3 className='humidity-heading'>Humidity</h3>
                    </div>
                </div>
                
            </div>
        }

    </div>
  )
}

export default Weather
