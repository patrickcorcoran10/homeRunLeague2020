import React, { Component } from "react";
import "./Scoreboard.css";
import Moment from "react-moment";
import "moment-timezone";

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <p>Top Dong</p>
      </div>
    );
  }
}
