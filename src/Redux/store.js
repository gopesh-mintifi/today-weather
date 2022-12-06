 import {createStore,applyMiddleware} from 'redux';
 import {Reducers} from './weather/Reducers';
 import logger from 'redux-logger';
 const store = createStore(Reducers,applyMiddleware(logger));

 export default store;