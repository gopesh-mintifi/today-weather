import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useHistory } from "react-router-dom";
import {weatherList,fourDayData} from '../../Redux';

import '../../Style/style.scss';
import moment from 'moment';


function Home() {
    const APIkey = "ebd0d90e635611a55e2785c6c23da4b6";
    // let history = useHistory();
    
    const [city, setCity] = useState(['']);
    const [moreData,setMoreData] = useState(false);
    const [temperature,setTemperature] = useState(false);
    const [wind,setWind]=useState(false);

    const navRef = React.createRef();
    const [weather, setWeather] = useState({
        temp: '',
        cityName: '',
        date: '',
        main_weather: '',
        wide: '',
        humidity: '',
        sunrise: '',
        sunset: '',
        latitude:null,
        longitude:null,
        hourly_dt: [],
        daily_dt:[],
    });

     useEffect(()=>{
         
        if(weather.latitude!==null){
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.latitude}&lon=${weather.longitude}&exclude=current&daily&appid=${APIkey}`)
                .then(res => {
                    
                    console.log("let:: : ", res.data);
                   
                    setWeather(prevState => ({
                        ...prevState,
                        hourly_dt: res.data.hourly,
                        daily_dt:res.data.daily
                        })
                    );
                    setMoreData(true);
                })
                .catch(error => {
                    alert("wrong latitude longitude")
                    console.log(error)
                })
                setTemperature(true);
        }
     },[weather.longitude,weather.latitude]);

    const onSubmitWeather = (city) => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
            .then(res => {
                console.log(res.data);
                
                setWeather(prevState => ({
                    ...prevState,
                    temp: res.data.main.temp,
                    cityName: res.data.name,
                    date: new Date(res.data.dt * 1000),
                    main_weather: res.data.weather[0].main,
                    wind: res.data.wind.speed,
                    humidity: res.data.main.humidity,
                    sunrise: new Date(res.data.sys.sunrise * 1000),
                    sunset: new Date(res.data.sys.sunset * 1000),
                    longitude: res.data.coord.lon,
                    latitude: res.data.coord.lat,
                }));
         
            })
            .catch(error => {
                alert("wrong area enter")
                console.log(error)
            })
    }

    const handleNav = (direction) => {
        if (direction === 'left') {
            return (navRef ? (navRef.current.scrollLeft -= 200) : null)

        } else {

            return (navRef ? (navRef.current.scrollLeft += 200) : null)

        }
    }


    const getTemperature=(value)=>{
        setTemperature(value);
        setWind(false);
    }

    const getWind=(value)=>{
        setWind(value);
        setTemperature(false);
    }

    const getNextPage=()=>{
        // history.push('/moredata',weather.cityName);
    }
    return (
        

        <div className="container-fluid home">
            <div className="row weather_name justify-content-md-center">
                <h1>Today Weather</h1>  
            </div>
            <div className="row justify-content-md-center">
                <div className="input-group mb-3 w-50 p-2">
                    <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City Name" />
                    <div className="input-group-append">
                        <button className="btn btn-info" onClick={(e) => onSubmitWeather(city)}>Submit</button>
                    </div>
                </div>
            </div>
            {weather.temp ?
                <div className="row Weather-Detail ">
                    <div className="container-fluid border border-secondary mx-auto weatherBox p-4 bg-dark text-light">
                       
                        <div className="row">
                            <div className="col-md-2">
                                <h1>&#x2601;{Math.round((weather.temp) - 273.15)}<sup>°C</sup></h1>
                            </div>
                            <div className="col-md-10">
                                <div>Wind: {Math.round((weather.wind) * 3.6)} km/h</div>
                                <div>Humidity: {Math.round((weather.humidity))}%</div>
                                <div>Sunrise: {moment(weather.sunrise).format("hh:mm A")}</div>
                                <div>Sunset: {moment(weather.sunset).format("hh:mm A")}</div>
                            </div>
                        </div>

                        <div class="topnav d-flex">
                            <div onClick={(e) => getTemperature(true)} className={"listSection " + (temperature ? "active":"")} >Temperature</div>
                            <div className="listPipe">|</div>
                            <div onClick={(e) => getWind(true)} className={"listSection " + (wind ? "active":"")}>Wind</div>
                        </div>

                      <div className="d-flex">
                      {weather.daily_dt.map((data,i)=>
                        <div className='timeDiv'>
                            <div>{moment(data.dt * 86400).format("hh A")}</div>
                            <div>{moment(data.dt * 86400).format("ddd")}</div>
                            <div><span style={{fontSize:"50px"}}>&#127765;</span></div>
                            <div className='d-flex'>
                                <div key={i}>{Math.round((data.temp.max) - 273.15)}<sup>°</sup></div>
                                <div key={i} style={{color:"gray", margin:"0px 5px"}}>{Math.round((data.temp.min) - 273.15)}<sup>°</sup></div>
                            </div>
                        </div>
                    )}


                      </div>


                        {/* <div >
                            <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Date / Temp</th>
                                    {weather.daily_dt.map((data,i)=><th key={i}>{(new Date(data.dt * 1000)).getDate().toString() + '-' + (new Date(data.dt * 1000).getMonth() + 1) + '-' + (new Date(data.dt * 1000).getFullYear())}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Low Temp</th>
                                    {weather.daily_dt.map((data,i)=><td key={i}>{Math.round((data.temp.min) - 273.15)}<sup>°C</sup></td>)}
                                </tr>
                                <tr>
                                    <th scope="row">High Temp</th>
                                    {weather.daily_dt.map((data,i)=><td key={i}>{Math.round((data.temp.max) - 273.15)}<sup>°C</sup></td>)}
                                </tr>
                                <tr>
                                    <th scope="row">Humidity</th>
                                    {weather.daily_dt.map((data,i)=><td key={i}>{data.humidity}%</td>)}
                                </tr>
                            </tbody>
                            </table>
                        </div> */}



                    </div>
                </div>
                : ""}
            </div>
        
    
        );
}

export default Home;
