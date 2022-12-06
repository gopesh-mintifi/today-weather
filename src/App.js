import './App.css';
import {Provider} from 'react-redux';
import React from 'react';
import {Routes,Route,BrowserRouter} from 'react-router-dom';

import store from './Redux/store';
import Home from './Component/Home/Home';
import MoreData from './Component/MoreData/MoreData';
function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/weather-today" element={<Home/>} />
      <Route path="/weather-today/home" element={<Home/>} />
      <Route path='/weather-today/moredata' element={<MoreData/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;