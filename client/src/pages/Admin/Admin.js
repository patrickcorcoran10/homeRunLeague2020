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
        window.location.reload();
      });
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
    const res = await fetch("/api/april/draft-roster");
    const data = await res.json();
    data.forEach(async data => {
      if (data.team === "olsen") {
        olsenObj = {
          name: data.pickName,
          id: data.id
        };
        olsen.push(olsenObj);
      } else if (data.team === "corcoran") {
        corcoranObj = {
          name: data.pickName,
          id: data.id
        };
        corcoran.push(corcoranObj);
      } else if (data.team === "massa") {
        massaObj = {
          name: data.pickName,
          id: data.id
        };
        massa.push(massaObj);
      } else if (data.team === "ross") {
        rossObj = {
          name: data.pickName,
          id: data.id
        };
        ross.push(rossObj);
      } else {
        lakemanObj = {
          name: data.pickName,
          id: data.id
        };
        lakeman.push(lakemanObj);
      }
    });
    console.log(corcoran);

    this.setState({
      rosters: {
        corcoran: corcoran,
        olsen: olsen,
        lakeman: lakeman,
        ross: ross,
        massa: massa
      }
    });
  }
  async deletePlayer(e) {
    //   Currently Not Working
    e.preventDefault();
    let deleteID = e.target.value;
    console.log("Now we delete", e.target.value);
    await fetch("/api/delete" + deleteID, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }
  async cutPlayer(e) {
    e.preventDefault();
    let cutID = e.target.value;
    fetch("/api/cut-player" + cutID, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }

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
            {this.state.rosters.corcoran.map((el, index) => (
              <div key={index}>
                <p>
                  <button
                    value={el.id}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    Cut
                    {/* <FaCut /> */}
                  </button>
                  {el.name}
                  <button
                    value={el.id}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    Delete
                    {/* <MdCancel /> */}
                  </button>
                </p>
              </div>
            ))}
          </div>

          <div className="col-md-2">
            <h6>Olsen</h6>
            {this.state.rosters.olsen.map((el, index) => (
              <div key={index}>
                <p>
                  <button
                    value={el.id}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    Cut
                    {/* <FaCut /> */}
                  </button>
                  {el.name}
                  <button
                    value={el.id}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    Delete
                    {/* <MdCancel /> */}
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-2">
            <h6>Massa</h6>
            {this.state.rosters.massa.map((el, index) => (
              <div key={index}>
                <p>
                  <button
                    value={el.id}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    Cut
                    {/* <FaCut /> */}
                  </button>
                  {el.name}
                  <button
                    value={el.id}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    Delete
                    {/* <MdCancel /> */}
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-2">
            <h6>Ross</h6>
            {this.state.rosters.ross.map((el, index) => (
              <div key={index}>
                <p>
                  <button
                    value={el.id}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    Cut
                    {/* <FaCut /> */}
                  </button>
                  {el.name}
                  <button
                    value={el.id}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    Delete
                    {/* <MdCancel /> */}
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div className="col-md-2">
            <h6>Lakeman</h6>
            {this.state.rosters.lakeman.map((el, index) => (
              <div key={index}>
                <p>
                  <button
                    value={el.id}
                    onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                  >
                    Cut
                    {/* <FaCut /> */}
                  </button>
                  {el.name}
                  <button
                    value={el.id}
                    onClick={(this.deletePlayer = this.deletePlayer.bind(this))}
                  >
                    Delete
                    {/* <MdCancel /> */}
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
