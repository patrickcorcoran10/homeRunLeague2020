import React, { Component } from "react";
import superagent from "superagent";
import "./Admin.css";
import Moment from "react-moment";
import axios from "axios";
import {
  FormGroup,
  Button,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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
    let data = [];
    let url =
      "https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id=";
    try {
      const res = await fetch(url + this.state.pickID);
      data = await res.json();
    } catch (error) {
      console.log("Swing and a miss: ", error);
    }
    console.log(
      "We are gong to submit",
      this.state.pickName,
      "with",
      data.sport_hitting_tm.queryResults.row.hr
    );
    superagent
      .post("/api/draft")
      .send({
        team: this.state.team,
        pickID: this.state.pickID,
        pickName: this.state.pickName,
        month: this.state.month,
        total: parseInt(data.sport_hitting_tm.queryResults.row.hr),
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
    console.log(data);
    data.forEach(async data => {
      if (data.team === "olsen") {
        olsenObj = {
          name: data.pickName,
          id: data.id,
          pickID: data.pickID,
          month: data.month,
          total: data.total
        };
        olsen.push(olsenObj);
      } else if (data.team === "corcoran") {
        corcoranObj = {
          name: data.pickName,
          id: data.id,
          pickID: data.pickID,
          month: data.month,
          total: data.total
        };
        corcoran.push(corcoranObj);
      } else if (data.team === "massa") {
        massaObj = {
          name: data.pickName,
          id: data.id,
          pickID: data.pickID,
          month: data.month,
          total: data.total
        };
        massa.push(massaObj);
      } else if (data.team === "ross") {
        rossObj = {
          name: data.pickName,
          id: data.id,
          pickID: data.pickID,
          month: data.month,
          total: data.total
        };
        ross.push(rossObj);
      } else {
        lakemanObj = {
          name: data.pickName,
          id: data.id,
          total: data.total,
          month: data.month,
          pickID: data.pickID
        };
        lakeman.push(lakemanObj);
      }
    });

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
  async keepPlayer(e) {
    e.preventDefault();
    let playerObj = {};
    let keepPlayerID = e.target.value;
    console.log(keepPlayerID);
    let url =
      "https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id=";

    const res = await fetch(url + keepPlayerID);
    const data = await res.json();
    playerObj = {
      pickID: keepPlayerID,
      total: data.sport_hitting_tm.queryResults.row.hr,
      hr: data.sport_hitting_tm.queryResults.row.hr
    };
    console.log(playerObj.total);
    axios
      .put("/api/keep/" + playerObj.pickID, { total: playerObj.hr })
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
            <a href="/admin">Admin</a>
            <br />
            <a href="/login">Log In</a>
            <br />
            <a href="/register">Register</a>
            <br />
            <form>
              <input
                ref="player"
                onChange={
                  (this.acceptPlayerSearch = this.acceptPlayerSearch.bind(this))
                }
              ></input>
            </form>
            <Button
              color="success"
              onClick={(this.search = this.search.bind(this))}
            >
              Search
            </Button>{" "}
            <br></br>
            <FormGroup>
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
              <Input
                ref="month"
                type="select"
                name="selectMonth"
                id="selectMonth"
                onChange={(this.acceptMonth = this.acceptMonth.bind(this))}
              >
                <option value="">Select Month</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
              </Input>
            </FormGroup>
            <Button
              color="success"
              onClick={(this.submit = this.submit.bind(this))}
            >
              Submit
            </Button>{" "}
            <br />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h6>
              Rosters for <Moment format="LL" />
            </h6>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <h6>Corcoran</h6>
            {this.state.rosters.corcoran.map((el, index) => (
              <div key={index}>
                <UncontrolledDropdown>
                  <DropdownToggle caret>{el.name}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      value={el.id}
                      onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                    >
                      Cut Player
                    </DropdownItem>
                    <DropdownItem
                      value={el.pickID}
                      onClick={(this.keepPlayer = this.keepPlayer.bind(this))}
                    >
                      Keep Player
                    </DropdownItem>{" "}
                    <DropdownItem divider />
                    <DropdownItem
                      value={el.id}
                      onClick={
                        (this.deletePlayer = this.deletePlayer.bind(this))
                      }
                    >
                      Delete Player
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}
          </div>

          <div className="col-md-2">
            <h6>Olsen</h6>
            {this.state.rosters.olsen.map((el, index) => (
              <div key={index}>
                <UncontrolledDropdown>
                  <DropdownToggle caret>{el.name}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      value={el.id}
                      onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                    >
                      Cut Player
                    </DropdownItem>
                    <DropdownItem
                      value={el.pickID}
                      onClick={(this.keepPlayer = this.keepPlayer.bind(this))}
                    >
                      Keep Player
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      value={el.id}
                      onClick={
                        (this.deletePlayer = this.deletePlayer.bind(this))
                      }
                    >
                      Delete Player
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}{" "}
          </div>
          <div className="col-md-2">
            <h6>Massa</h6>
            {this.state.rosters.massa.map((el, index) => (
              <div key={index}>
                <UncontrolledDropdown>
                  <DropdownToggle caret>{el.name}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      value={el.id}
                      onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                    >
                      Cut Player
                    </DropdownItem>
                    <DropdownItem
                      value={el.pickID}
                      onClick={(this.keepPlayer = this.keepPlayer.bind(this))}
                    >
                      Keep Player
                    </DropdownItem>{" "}
                    <DropdownItem divider />
                    <DropdownItem
                      value={el.id}
                      onClick={
                        (this.deletePlayer = this.deletePlayer.bind(this))
                      }
                    >
                      Delete Player
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}{" "}
          </div>
          <div className="col-md-2">
            <h6>Ross</h6>
            {this.state.rosters.ross.map((el, index) => (
              <div key={index}>
                <UncontrolledDropdown>
                  <DropdownToggle caret>{el.name}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      value={el.id}
                      onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                    >
                      Cut Player
                    </DropdownItem>
                    <DropdownItem
                      value={el.pickID}
                      onClick={(this.keepPlayer = this.keepPlayer.bind(this))}
                    >
                      Keep Player
                    </DropdownItem>{" "}
                    <DropdownItem divider />
                    <DropdownItem
                      value={el.id}
                      onClick={
                        (this.deletePlayer = this.deletePlayer.bind(this))
                      }
                    >
                      Delete Player
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}{" "}
          </div>
          <div className="col-md-2">
            <h6>Lakeman</h6>
            {this.state.rosters.lakeman.map((el, index) => (
              <div key={index}>
                <UncontrolledDropdown>
                  <DropdownToggle caret>{el.name}</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      value={el.id}
                      onClick={(this.cutPlayer = this.cutPlayer.bind(this))}
                    >
                      Cut Player
                    </DropdownItem>
                    <DropdownItem
                      value={el.pickID}
                      onClick={(this.keepPlayer = this.keepPlayer.bind(this))}
                    >
                      Keep Player
                    </DropdownItem>{" "}
                    <DropdownItem divider />
                    <DropdownItem
                      value={el.id}
                      onClick={
                        (this.deletePlayer = this.deletePlayer.bind(this))
                      }
                    >
                      Delete Player
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ))}{" "}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    );
  }
}
