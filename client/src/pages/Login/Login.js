import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleEmail = e => {
    console.log("Email: ", e.target.value);
    this.setState({
      email: e.target.value
    });
  };
  handlePassword = e => {
    console.log("Password: ", e.target.value);
    this.setState({
      password: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        sessionStorage.setItem("jwt", res.data.token);
        this.props.history.push("/admin");
        console.log(res.data.token);
      })
      .catch(error => {
        alert(
          "Sorry!  Invalid email & password combination.  Please try again."
        );
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h5>Log In</h5>
            <form>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={(this.handleEmail = this.handleEmail.bind(this))}
                />{" "}
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={
                    (this.handlePassword = this.handlePassword.bind(this))
                  }
                />
              </div>
              <button
                type="submit"
                onClick={(this.handleSubmit = this.handleSubmit.bind(this))}
              >
                Log In
              </button>
            </form>
            <a href="/">Go To Scoreboard</a>
            <br />
            <a href="/admin">Admin</a>
            <br />
            <a href="/login">Log In</a>
            <br />
            <a href="/register">Register</a>
            <br />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}
