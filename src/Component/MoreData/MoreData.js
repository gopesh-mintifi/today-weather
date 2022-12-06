import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {moreWeatherData} from '../../Redux';


const MoreData = (props) => {
    const APIkey = "ebd0d90e635611a55e2785c6c23da4b6";
    const arr = [1,1,1,2,2,3,3,4];
    // for(var i=0;i<=arr.length;i++){
    //     for(var j=0;j<=i;j++){
    //         console.log(j);
    //     }
    // }
    const city_name = props.location.state;
    console.log(props.location.state);
    const [fiveDay,setFiveDay]=useState([]);
    const navRef = React.createRef();
    console.log(fiveDay);
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${APIkey}`)
            .then(res =>{
        setFiveDay(res.data.list);
        
    });
    },[city_name])
    
    

    const handleNav = (direction) => {
        if (direction === 'left') {
            return (navRef ? (navRef.current.scrollLeft -= 200) : null)

        } else {

            return (navRef ? (navRef.current.scrollLeft += 200) : null)

        }
    }
    return(
        <div className="container-fluid moreData">
            <div className="row">
                <div className="col ">
                    <h1 className="text-center">Weather 5 days Data</h1>
                </div>
            </div> 
            <div className="row">
                            <div className="menu-container">
                                <div>
                                    <button className="btn btn-outline-primary mr-4" onClick={() => handleNav('left')}>Previus</button>
                                </div>
                                <div className='nav-items' ref={navRef}>
                                    {fiveDay.map((data, i) => 
                                        <div  className="border-secondary border-right" key={i}>
                                            <p>{data.dt_txt}</p>
                                            <p>Weather : {data.weather[0].main}</p>
                                            <p>&#x2601;{Math.round((data.main.temp) - 273.15)}<sup>°C</sup></p>

                                            <p>Wind: {Math.round((data.wind.speed) * 3.6)} km/h</p>

                                        </div>
                                    )}

                                </div>
                                <div>
                                    <button className="btn btn-outline-primary ml-4" onClick={() => handleNav('right')}>Next</button>
                                </div>
                            </div>
                            
            </div>
            <div className="row">
                <table className="table table-bordered">
                    <tr>
                        <th>
                             Time/Date           
                        </th>
                        {/* {fiveDay.map((datas ,j)=>
                            <td key={j}>{((new Date(datas.dt * 1000)).getHours().toString())} </td>
                            )} */}
                    </tr>
                    {fiveDay.map((data ,i)=>
                        <tr>
                            <td key={i}>{((new Date(data.dt * 1000)).getDate().toString())},{((new Date(data.dt * 1000)).getHours().toString())}</td> 
                            {/* {fiveDay.map((datas ,j)=>
                            <td key={i}>{((new Date(data.dt * 1000)).getHours().toString())} </td>
                            )} */}
                        </tr>
                    )}
                </table>

              </div>

                        
        </div>
        
        
    )
}
export default MoreData;