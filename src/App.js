import React from 'react';
import { Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import VetProfilePage from "./components/pages/VetProfilePage";
import Home from "./components/pages/HomeForm";
import Soporte from "./components/pages/SoportePage";
import Terminos from "./components/pages/TerminosPage";
import Ad from "./components/pages/AdPage";

const App = () => 
<div className="ui container">
  <Route path="/" exact component={LoginPage} />
  <Route path="/login" exact component={LoginPage} />
  <Route path="/profile" exact component={VetProfilePage} />
  <Route path="/home" exact component={Home} />
  <Route path="/soporte" exact component={Soporte} />
  <Route path="/terminos" exact component={Terminos} />
  <Route path="/ad" exact component={Ad} />
</div>; 


export default App;
