import React, { Component } from "react";
import superagent from "superagent";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleName = e => {
    console.log("Name:", e.target.value);
    this.setState({
      name: e.target.value
    });
  };
  handleEmail = e => {
    console.log("Email: ", e.target.value);
    this.setState({
      email: e.target.value
    });
  };
  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    // let data = {};
    console.log(this.state);
    // data = this.state;
    superagent
      .post("/api/register")
      .send({
        // name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .end((err, res) => {
        console.log(res);
        // window.location.replace(res);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h5>Register</h5>
            <form>
              <div>
                <label>Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  onChange={(this.handleName = this.handleName.bind(this))}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  id="email"
                  name="email"
                  required
                  onChange={(this.handleEmail = this.handleEmail.bind(this))}
                />
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
                Register
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
