import { fourDayData } from './action';
import {WEATHER_LIST,FOUR_DAY_DATA,MORE_WEATHER_DATA} from './actionType';

const initialState={
    allWeatherData :[],
    fourDayData:[''],
    moreWeatherData:['']
}

export const Reducers =(state = initialState,action)=>{
    switch(action.type){
        case WEATHER_LIST : return{
            ...state,
            allWeatherData:[action.payload]
        }
        case FOUR_DAY_DATA : return{
            ...state,
            fourDayData:[...state.fourDayData, action.payload]

        }
        case MORE_WEATHER_DATA : return{
            ...state,
            moreWeatherData:[...state.moreWeatherData, action.payload]

        }
        default : return state;
    }
}