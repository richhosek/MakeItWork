import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  // Creating a "state hook" for the username
  const [username, setUsername] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("black");

  const showState = () => {
    alert( `Welcome ${username}`);
  }

  // Creating an "effect hook" instead of ComponentDidMount
  useEffect(() => {
      if (username.includes("ich")){
        setBackgroundColor("red");
      } else {
        setBackgroundColor("black");
      }
  })

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
         />
         <input
          type="button"
          value="Submit"
           onClick={(event) => {
             event.preventDefault();
             showState();
           }}
          />
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
  );
}

export default App;
