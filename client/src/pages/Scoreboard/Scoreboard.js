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
        <div className="title">
          <p>Top Dong</p>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p className="leaderboard">Leaderboard</p>
            <table>
              <tbody>
                <tr>
                  <th>Call Sign</th>
                  <th>April</th>
                  <th>May</th>
                  <th>June</th>
                  <th>July</th>
                  <th>August</th>
                  <th>September</th>
                  <th>Totals</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p>
              <Moment format="ll" />
            </p>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}
