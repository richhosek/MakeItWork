import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MeContext } from './MeContext';
import Me from './Me';

class App extends React.Component {
  

  render() {
    return (
      <MeContext.Provider value={{
        name: "Rich",
        favoriteFood: "Cheese"
      }}>
        <div className="App">
          <header className="App-header" style={{ backgroundColor: "red" }}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
          </a>
          <Me />
          </header>
        </div>
      </MeContext.Provider>
    );
  }
}
export default App;
