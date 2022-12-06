import {WEATHER_LIST,FOUR_DAY_DATA,MORE_WEATHER_DATA} from './actionType';

export const weatherList = (weatherData) =>{
    return{
        type:WEATHER_LIST,
        payload:weatherData
    }
}
export const fourDayData = (weatherData) =>{
    return{
        type:FOUR_DAY_DATA,
        payload:weatherData
    }
}
export const moreWeatherData = (weatherData) =>{
    return{
        type:MORE_WEATHER_DATA,
        payload:weatherData
    }
}