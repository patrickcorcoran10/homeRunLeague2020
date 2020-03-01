import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleName = e => {};
  handleEmail = e => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    });
  };
  handlePassword = e => {};

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h5>Register</h5>
            <form>
              <div>
                <label for="name">Name</label>
                <input for="name" id="name" name="name" required />
              </div>
              <div>
                <label for="email">Email</label>
                <input for="email" id="email" name="email" required />
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit">Register</button>
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
