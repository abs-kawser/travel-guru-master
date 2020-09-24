import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Componets/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Booking from './Componets/Booking/Booking';
import Search from './Componets/Search/Search';
import PrivateRoute from './Componets/PrivateRoute/PrivateRoute';
import Login from './Componets/Login/Login';
import Nomatch from './Componets/Nomatch/Nomatch';

export const userContext = createContext();

function App() {
    
  const [isSignedIn,setSignedIn] = useState({destination:""})
   
    
  return (
     
    
     <userContext.Provider value={[isSignedIn,setSignedIn]}> 
        <Router>
          <Switch>
              <Route path="/home">
                  <Home></Home>
              </Route>
              <Route exact path="/">
                  <Home></Home> 
              </Route>
              <Route path="/booking/:placeName">
                  <Booking></Booking>
              </Route>
             <Route path="/login">
                    <Login></Login>
             </Route>
              <PrivateRoute path="/search">
                  <Search></Search>
              </PrivateRoute>
              <Route path="*">
                  <Nomatch></Nomatch>
              </Route>
          </Switch>
      </Router>
     </userContext.Provider>
    
  );
}

export default App;
