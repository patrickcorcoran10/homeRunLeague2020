import React, { Component } from "react";
import "./Scoreboard.css";
import Momentjs from "moment";
import Moment from "react-moment";
import "moment-timezone";
import { Spinner } from "reactstrap";
// import Tabs from "../../components/Tabs/Tabs";
// import MonthScores from "../../components/Tabs/MonthScores";

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rosters: {},
      scores: {}
    };
  }

  async componentDidMount() {
    console.log(
      Momentjs()
        .format("MMMM")
        .toLowerCase()
    );
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
    let month = Momentjs()
      .format("MMMM")
      .toLowerCase();
    if (month === "march" || "april") {
      month = "april";
    } else {
      console.log("we screwed up somehow");
    }
    const res = await fetch("/api/" + month + "/scoreboard");
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
          hrDisplayScore:
            data.sport_hitting_tm.queryResults.row.hr - team.total,
          hrToDate: data.sport_hitting_tm.queryResults.row.hr,
          totalStartOfMonth: team.total,
          month: team.month
        };
        pc.push(pcObj);
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
          hrDisplayScore:
            data.sport_hitting_tm.queryResults.row.hr - team.total,
          hrToDate: data.sport_hitting_tm.queryResults.row.hr,
          totalStartOfMonth: team.total,
          month: team.month
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
          hrDisplayScore:
            data.sport_hitting_tm.queryResults.row.hr - team.total,
          hrToDate: data.sport_hitting_tm.queryResults.row.hr,
          totalStartOfMonth: team.total,
          month: team.month
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
          hrDisplayScore:
            data.sport_hitting_tm.queryResults.row.hr - team.total,
          hrToDate: data.sport_hitting_tm.queryResults.row.hr,
          totalStartOfMonth: team.total,
          month: team.month
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
          hrDisplayScore:
            data.sport_hitting_tm.queryResults.row.hr - team.total,
          hrToDate: data.sport_hitting_tm.queryResults.row.hr,
          totalStartOfMonth: team.total,
          month: team.month
        };
        rr.push(rrObj);
      } catch (error) {
        console.log("Swing and a miss: ", error);
      }
    });
    await this.setState({
      scores: {
        pc,
        to,
        mm,
        jl,
        rr
      }
    });

    setTimeout(
      function() {
        this.setState({
          isLoading: false
        });
      }.bind(this),
      1000
    );
    // -------------------------------------------
    class CreatePlayer {
      constructor(name, pickID, total, month) {
        this.name = name;
        this.pickID = pickID;
        this.total = total;
        this.month = month;
      }
    }
    class CreateTeam {
      constructor(team) {
        this.team = team;
      }
    }

    let roster = [];
    let team = [];
    let homeRunTeam = {};
    let guy = {
      name: "patty the catcher",
      playerID: "123456",
      hr: 55,
      month: "May"
    };

    for (let i = 0; i < 4; i++) {
      roster[i] = new CreatePlayer(guy.name, guy.playerID, guy.hr, guy.month);
      team.push(roster[i]);
      homeRunTeam = new CreateTeam(team);
    }
    // console.log("Class Roster Array: ", roster);
    // console.log("Class Team Creation Array: ", team);
    console.log(homeRunTeam);
    for (let i = 0; i < homeRunTeam.team.length; i++) {
      console.log(homeRunTeam.team[i].name);
    }
    // ------------------------------------------------
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-5"></div>
            <div className="col-md-2">
              {" "}
              <Spinner
                style={{ width: "3rem", height: "3rem", paddingTop: "4rem" }}
                type="grow"
              />
            </div>
            <div className="col-md-5"></div>
          </div>
        </div>
      );
    }
    let month = Momentjs()
      .format("MMMM")
      .toLowerCase();
    console.log(month);
    if (month === "march" || "april") {
      console.log("we got the month");
    } else {
      console.log("we screwed up somehow");
    }

    let corcoran = this.state.scores.pc.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hrDisplayScore}
        </p>
      </div>
    ));
    let olsen = this.state.scores.to.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hrDisplayScore}
        </p>
      </div>
    ));
    let ross = this.state.scores.rr.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hrDisplayScore}
        </p>
      </div>
    ));
    let massa = this.state.scores.mm.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hrDisplayScore}
        </p>
      </div>
    ));
    let lakeman = this.state.scores.jl.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hrDisplayScore}
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
                  <th>Aug.</th>
                  <th>Sept.</th>
                  <th id="totals">TOTALS</th>
                </tr>
                <tr className="lakeman">
                  <td>Lakeman</td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="totals"></td>
                </tr>
                <tr className="olsen">
                  <td>Olsen</td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="totals"></td>
                </tr>
                <tr className="ross">
                  <td>Ross</td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="totals"></td>
                </tr>
                <tr className="corcoran">
                  <td>Corcoran</td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="totals"></td>
                </tr>
                <tr className="massa">
                  <td>Massa</td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="number"></td>
                  <td id="totals"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            {/* <Tabs /> */}
            {/* <MonthScores /> */}
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
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}
