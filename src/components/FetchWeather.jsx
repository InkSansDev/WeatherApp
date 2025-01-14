import React, { useEffect, useReducer, useRef, useState } from 'react'
import { FaSearch } from "react-icons/fa";

import clear_icon from '/images/sun.svg'
import cloud_icon from '/images/cloud-sun.svg'
import clouds_icon from '/images/cloud.svg'
import cloudy_icon from '/images/cloudy.svg'
import cloud_rain_icon from '/images/cloud-rain.svg'
import cloud_rainy_icon from '/images/cloud-sun-rain.svg'
import snow_icon from '/images/snowflake.svg'

export const FetchWeather = () => {
    
    const inputRef = useRef()
    const [weather, setWeather] = useState(false)
    
    const Icons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': clouds_icon,
        '03n': clouds_icon,
        '04d': cloudy_icon,
        '04n': cloudy_icon,
        '09d': cloud_rain_icon,
        '09n': cloud_rain_icon,
        '10d': cloud_rainy_icon,
        '10n': cloud_rainy_icon,
        '13d': snow_icon,
        '13n': snow_icon,
    }

    const FetchData = async (search) => {

        if(search === '') {

        }

        const API = import.meta.env.VITE_WEATHER_API
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API}`

        try {
            const response = await fetch(URL)
            const data = await response.json()
            const icon = Icons[data.weather[0].icon] || clear

            setWeather({
                humidity : data.main.humidity,
                windSpeed: (data.wind.speed).toFixed(1),
                temperature: (data.main.temp).toFixed(0),
                location: data.name,
                icon: icon
            })
        } catch(error) {
            console.log('error')
        }
    }

    useEffect(() => {
        FetchData('Finland')
    }, [])

  return (
    <div className='wrapper'>
        <div className='menu'>
        <div className='input'>
            <input type='text' placeholder='Search' ref={inputRef}></input>
            <div className='icond'>
            <FaSearch onClick={() => FetchData(inputRef.current.value)} className='icon'/>
            </div>
        </div>
        <img src={weather.icon} className='weather'></img>
        <p className='temp'>{weather.temperature}°C</p>
        <p className='loc'>{weather.location}</p>
        <div className='stats'>
            <div className='display'>
                <p className='st'>{weather.humidity}%</p>
                <h1 className='sp'>Humidity</h1>
            </div>
            <div className='display'>
                <p className='st'>{weather.windSpeed}m/s</p>
                <h1 className='sp'>Wind Speed</h1>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FetchWeather