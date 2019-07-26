import React from 'react';
import logo from './logo.svg';
import './App.css';

const IdentityContext = React.createContext("rich");

class App extends React.Component {
  render() {
    return (
      <IdentityContext.Provider id="me">
        <div className="App">
          <header className="App-header">
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
          </header>
        </div>
      </IdentityContext.Provider>
    );
  }
}

export default App;
