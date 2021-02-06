import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import VehicleStore from './stores/vehicle';
import Home from './components/Home';
import './index.css';

const vehicleStore = new VehicleStore();

const stores = {
  vehicleStore
};

ReactDOM.render((
  <Provider {...stores}>
    <Home />
  </Provider>
), document.getElementById('root'));
