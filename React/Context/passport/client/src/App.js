import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { IdentityContext } from "./IdentityContext";
import Nav from "./components/Nav"
import User from "./components/User"
import BlueBoxProps from "./components/BlueBoxProps";
import BlueBox from "./components/BlueBox";

class App extends Component {
  state = {
    user: {},
    username: "",
    password: "",
    user: {},
    loggedIn: false
  }

  componentDidMount() {
    // check for logged in user
    axios.get("/api/user")
      .then(response => {
        if (response.data) {
          console.log("USER FROM API", response.data)
          this.setState({
            user: response.data,
            userStateInfo: `${response.data.username} is logged in`
          })
        }
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  login = event => {
    event.preventDefault();
    axios.post("/api/user/login", { "username": this.state.username, "password": this.state.password })
      .then(response => {
        this.setState({
          user: response.data,
          loggedIn: true,
          username: "",
          password: "",
          errorMessage: ""
        })
      })
      .catch(error => {
        console.log("LOGIN ERROR")
        this.setState({
          user: {},
          logginId: false,
          errorMessage: "Error logging in"
        })
      })
  }

  logout = event => {
    event.preventDefault();
    axios.post("/api/user/logout")
      .then(response => {
        this.setState({
          errorMessage: "",
          user: {},
          loggedIn: false
        })
      })
  }

  render() {
    return (
      <IdentityContext.Provider value={{
        user: this.state.user,
        loggedIn: this.state.loggedIn,
        login: this.login,
        logout: this.logout
      }}>
        <div className="App">
          <Nav />
          <h1>React-Passport-Context {this.state.user.username}</h1>
         <h2>{this.state.errorMessage
            ? this.state.errorMessage
            : this.state.loggedIn
              ? `${this.state.user.username} is logged in`
              : "Logged Out"}</h2>
          <form style={{display: this.state.loggedIn ? "none" : "block"}}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange} /><br />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange} /><br />
                <input
                  type="submit"
                  name="submit"
                  value="Login"
                  onClick={this.login} />
              </form>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
        <BlueBoxProps username={this.state.user.username} />
        <BlueBox />
        </div>
      </IdentityContext.Provider>
    );
  }
}

export default App;
