import React, { Component } from "react";
import "./Scoreboard.css";
import Moment from "react-moment";
import "moment-timezone";
import { Spinner } from "reactstrap";

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rosters: {},
      scores: []
    };
  }
  async componentDidMount() {
    let olsen = [];
    let olsenObj = {};
    let massa = [];
    let massaObj = {};
    let corcoran = [];
    let corcoranObj = {};
    let lakeman = [];
    let lakemanObj = {};
    let ross = [];
    let rossObj = {};
    const res = await fetch("/api/april/scoreboard");
    const data = await res.json();
    data.forEach(async data => {
      if (data.team === "olsen") {
        olsenObj = {
          name: data.pickName,
          pickID: data.pickID,
          total: data.total,
          month: data.month
        };
        olsen.push(olsenObj);
      } else if (data.team === "corcoran") {
        corcoranObj = {
          name: data.pickName,
          pickID: data.pickID,
          total: data.total,
          month: data.month
        };
        corcoran.push(corcoranObj);
      } else if (data.team === "massa") {
        massaObj = {
          name: data.pickName,
          pickID: data.pickID,
          total: data.total,
          month: data.month
        };
        massa.push(massaObj);
      } else if (data.team === "ross") {
        rossObj = {
          name: data.pickName,
          pickID: data.pickID,
          total: data.total,
          month: data.month
        };
        ross.push(rossObj);
      } else {
        lakemanObj = {
          name: data.pickName,
          pickID: data.pickID,
          total: data.total,
          month: data.month
        };
        lakeman.push(lakemanObj);
      }
    });
    await this.setState({
      rosters: {
        corcoran: corcoran,
        olsen: olsen,
        lakeman: lakeman,
        ross: ross,
        massa: massa
      }
    });
    let pcObj = {};
    let pc = [];
    let mmObj = {};
    let mm = [];
    let toObj = {};
    let to = [];
    let rrObj = {};
    let rr = [];
    let jlObj = {};
    let jl = [];
    // Keep in Mind, we are searching 2019's Stats for the time being.
    let url =
      "https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id=";
    this.state.rosters.corcoran.forEach(async team => {
      try {
        const res = await fetch(url + team.pickID);
        const data = await res.json();
        pcObj = {
          name: team.name,
          hr: data.sport_hitting_tm.queryResults.row.hr
        };
        pc.push(pcObj);
        console.log(pc);
      } catch (error) {
        console.log("Swing and a miss: ", error);
      }
    });
    this.state.rosters.olsen.forEach(async team => {
      try {
        const res = await fetch(url + team.pickID);
        const data = await res.json();
        toObj = {
          name: team.name,
          hr: data.sport_hitting_tm.queryResults.row.hr
        };
        to.push(toObj);
      } catch (error) {
        console.log("Swing and a miss: ", error);
      }
    });
    this.state.rosters.massa.forEach(async team => {
      try {
        const res = await fetch(url + team.pickID);
        const data = await res.json();
        mmObj = {
          name: team.name,
          hr: data.sport_hitting_tm.queryResults.row.hr
        };
        mm.push(mmObj);
      } catch (error) {
        console.log("Swing and a miss: ", error);
      }
    });
    this.state.rosters.lakeman.forEach(async team => {
      try {
        const res = await fetch(url + team.pickID);
        const data = await res.json();
        jlObj = {
          name: team.name,
          hr: data.sport_hitting_tm.queryResults.row.hr
        };
        jl.push(jlObj);
      } catch (error) {
        console.log("Swing and a miss: ", error);
      }
    });
    this.state.rosters.ross.forEach(async team => {
      try {
        const res = await fetch(url + team.pickID);
        const data = await res.json();
        rrObj = {
          name: team.name,
          hr: data.sport_hitting_tm.queryResults.row.hr
        };
        rr.push(rrObj);
      } catch (error) {
        console.log("Swing and a miss: ", error);
      }
      await this.setState({
        scores: {
          pc,
          to,
          mm,
          jl,
          rr
        }
      });
    });
    setTimeout(
      function() {
        this.setState({
          isLoading: false
        });
      }.bind(this),
      1000
    );
    console.log("done");
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner
          style={{ width: "3rem", height: "3rem", alignSelf: "center" }}
          type="grow"
        />
      );
    }
    if (!this.state.scores.pc.length > 0) {
      return <div>We Failed</div>;
    }
    const corcoran = this.state.scores.pc.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr}
        </p>
      </div>
    ));
    const olsen = this.state.scores.to.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr}
        </p>
      </div>
    ));
    const ross = this.state.scores.rr.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr}
        </p>
      </div>
    ));
    const massa = this.state.scores.mm.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr}
        </p>
      </div>
    ));
    const lakeman = this.state.scores.jl.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr}
        </p>
      </div>
    ));
    console.log(this.state);
    return (
      <div className="container">
        <div className="title">
          <h2>Top Dong</h2>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p className="leaderboard">Leaderboard</p>
            <p>
              <Moment format="ll" />
            </p>
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
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h6>Corcoran</h6>
            {corcoran}
          </div>
          <div className="col-md-2">
            <h6>Olsen</h6>
            {olsen}
          </div>
          <div className="col-md-2">
            <h6>Massa</h6>
            {massa}
          </div>
          <div className="col-md-2">
            <h6>Ross</h6>
            {ross}
          </div>
          <div className="col-md-2">
            <h6>Lakeman</h6>
            {lakeman}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
