import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from "react-router-dom";

export default function App (){
  const routerRef = React.createRef();

  return (
    <Router ref={routerRef}>
        <div className="App">
            <Navbar/>
        </div>
    </Router>
  )
}