import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Test from './Components/Test.jsx'
import Venta from './Components/Venta.jsx'
import OrdenesDeVenta from './Components/OrdenesDeVenta.jsx'

class App extends Component {

  render() {
    return (
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Test} />
          <Route path="/venta" component={Venta} />
          <Route path="/ordenesVenta" component={OrdenesDeVenta}/>
      </Switch>
  </BrowserRouter>
    );
  }
}

export default App;

