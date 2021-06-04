import React, { Component } from 'react';
import Route from 'react-router-dom/Route'
import { BrowserRouter } from 'react-router-dom'
import Nav from "./components/Navbar"

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Nav />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
