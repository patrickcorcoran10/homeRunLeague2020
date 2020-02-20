import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import superagent from "superagent";
import "./Admin.css";
import { FaCut } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        playerA: ""
      },
      retrievedArray: [],
      month: "",
      team: "",
      pickName: "",
      pickID: "",
      rosters: {
        corcoran: [],
        olsen: [],
        massa: [],
        lakeman: [],
        ross: []
      }
    };
  }

  acceptPlayerSearch = e => {
    console.log(e.target.value);
    this.setState({
      inputs: {
        playerA: this.refs.player.value
      }
    });
  };
  acceptDongPlayer = e => {
    this.setState({
      team: e.target.value
    });
    console.log("Our donger is ", e.target.value);
  };
  async search(e) {
    let url =
      "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='";
    try {
      const res = await fetch(url + this.state.inputs.playerA + "%25'");
      const data = await res.json();
      let array = [];
      console.log(data.search_player_all.queryResults.row);
      if (data.search_player_all.queryResults.row.length > 0) {
        this.setState({
          retrievedArray: data.search_player_all.queryResults.row
        });
      } else {
        array.push(data.search_player_all.queryResults.row);
        console.log(array[0]);

        this.setState({
          retrievedArray: array
        });
      }
    } catch (error) {
      alert("Strike!");
      console.log("Swing and a miss: ", error);
    }
  }
  acceptMonth = e => {
    this.setState({
      month: e.target.value
    });
    console.log("Our month is ", e.target.value);
  };
  handlePick = e => {
    let array = e.target.value.split("|");
    console.log(array);
    this.setState({
      pickName: array[0],
      pickID: array[1]
    });
  };
  async submit(e) {
    e.preventDefault();
    console.log("We are gong to submit our pick now.");
    superagent
      .post("/api/draft")
      .send({
        team: this.state.team,
        pickID: this.state.pickID,
        pickName: this.state.pickName,
        month: this.state.month,
        total: 0,
        cut: false
      })
      .end((err, res) => {
        console.log(res);
      });
    console.log("We have submitted and now we reset the form.");
    this.refs.team.value = "";
    this.refs.month.value = "";
    this.refs.pick.value = "";
    this.setState({
      inputs: {
        playerA: ""
      },
      retrievedArray: [],
      month: "",
      team: "",
      pickID: "",
      pickName: ""
    });
    window.location.reload();
  }

  async componentDidMount() {
    let olsen = [];
    let olsenIDs = [];
    let massa = [];
    let massaIDs = [];
    let corcoran = [];
    let corcoranIDs = [];
    let lakeman = [];
    let lakemanIDs = [];
    let ross = [];
    let rossIDs = [];
    const res = await fetch("/api/april/draft-roster");
    const data = await res.json();
    data.forEach(async data => {
      if (data.team === "olsen") {
        olsen.push(data.pickName);
        olsenIDs.push(data.id);
      } else if (data.team === "corcoran") {
        corcoran.push(data.pickName);
        corcoranIDs.push(data.id);
      } else if (data.team === "massa") {
        massa.push(data.pickName);
        massaIDs.push(data.id);
      } else if (data.team === "ross") {
        ross.push(data.pickName);
        rossIDs.push(data.id);
      } else {
        lakeman.push(data.pickName);
        lakemanIDs.push(data.id);
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
  }
  deletePlayer = e => {
    console.log("Now we delete", e.target.value);
  };
  cutPlayer = e => {
    console.log("Now we are cutting a Player", this.refs.value);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <a href="/">Go To Scoreboard</a>
            <br />
            <form>
              <p>Player Name: </p>
              <input
                ref="player"
                onChange={
                  (this.acceptPlayerSearch = this.acceptPlayerSearch.bind(this))
                }
              ></input>
            </form>
            <button onClick={(this.search = this.search.bind(this))}>
              Search
            </button>
            <br></br>
            <FormGroup>
              <Label>Pick</Label>
              <Input
                type="select"
                name="select"
                ref="pick"
                onChange={(this.handlePick = this.handlePick.bind(this))}
              >
                <option>Player Select</option>
                {this.state.retrievedArray.map((el, index) => (
                  <option
                    value={el.name_display_first_last + "|" + el.player_id}
                    key={index}
                    multiple
                  >
                    {el.name_display_first_last}
                    {"("}
                    {el.position}
                    {")"} - {el.team_abbrev}
                  </option>
                ))}
              </Input>

              <Label for="team">Dong Player</Label>
              <Input
                ref="team"
                type="select"
                name="selectPlayer"
                id="PlayerSelect"
                onChange={
                  (this.acceptDongPlayer = this.acceptDongPlayer.bind(this))
                }
              >
                <option value="">Select Dong Player</option>
                <option value="olsen">Olsen</option>
                <option value="corcoran">Corcoran</option>
                <option value="ross">Ross</option>
                <option value="lakeman">Lakeman</option>
                <option value="massa">Massa</option>
              </Input>

              <Label for="month">Month</Label>
              <Input
                ref="month"
                type="select"
                name="selectMonth"
                id="selectMonth"
                onChange={(this.acceptMonth = this.acceptMonth.bind(this))}
              >
                <option value="">Select Month</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
              </Input>
            </FormGroup>
            <button onClick={(this.submit = this.submit.bind(this))}>
              Submit
            </button>
            <br />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h6>Corcoran</h6>
            {this.state.rosters.corcoran.map((name, index) => (
              <div key={index}>
                <p>
                  <button
                    value={name}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    <FaCut />
                  </button>
                  {name}
                  <button
                    value={name}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    <MdCancel />
                  </button>
                </p>
              </div>
            ))}
          </div>

          <div className="col-md-2">
            <h6>Olsen</h6>
            {this.state.rosters.olsen.map((name, index) => (
              <div key={index}>
                <p>
                  <button
                    value={name}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    <FaCut />
                  </button>
                  {name}
                  <button
                    value={name}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    <MdCancel />
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-2">
            <h6>Massa</h6>
            {this.state.rosters.massa.map((name, index) => (
              <div key={index}>
                <p>
                  <button
                    value={name}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    <FaCut />
                  </button>
                  {name}
                  <button
                    value={name}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    <MdCancel />
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-2">
            <h6>Ross</h6>
            {this.state.rosters.ross.map((name, index) => (
              <div key={index}>
                <p>
                  <button
                    value={name}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    <FaCut />
                  </button>
                  {name}
                  <button
                    value={name}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    <MdCancel />
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-2">
            <h6>Lakeman</h6>
            {this.state.rosters.lakeman.map((name, index) => (
              <div key={index}>
                <p>
                  <button
                    value={name}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    <FaCut />
                  </button>
                  {name}
                  <button
                    value={name}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    <MdCancel />
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
