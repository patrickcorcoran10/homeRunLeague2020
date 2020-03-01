import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleEmail = e => {};
  handlePassword = e => {};
  handleSubmit = e => {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h5>Log In</h5>
            <form>
              <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required />{" "}
              </div>
              <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit">Log In</button>
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
