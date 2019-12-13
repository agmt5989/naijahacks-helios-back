import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'

import Landingpage from './components/Landingpage'
import Signup from './components/Signup';
import Login from './components/Login';
import Whatdoyoustudy from './components/Whatdoyoustudy';
import Whatdoyoustudy2 from './components/Whatdoyoustudy2';
import Navbar from './components/Navbar';
import Invalid from './components/Invalid';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Route exact path="/" component={Landingpage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/whatdoyoustudy" component={Whatdoyoustudy} />
          <Route path="/whatdoyoustudy2" component={Whatdoyoustudy2} />
          <Route path="*" component={Invalid} />
          {/* <Landingpage /> */}
          {/* <Signup /> */}
          {/* <Login /> */}
          {/* <Whatdoyoustudy /> */}
          {/* <Whatdoyoustudy2 /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
