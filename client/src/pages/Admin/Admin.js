import React, { Component } from "react";
import { FormGroup, Label, Input, Table } from "reactstrap";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        playerA: this.res
      },
      retrievedArray: [],
      month: "",
      dongPlayer: "",
      pick: ""
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
      dongPlayer: e.target.value
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
    console.log("Player Name: ", e.target.value);
  };
  submit = e => {
    e.preventDefault();
    console.log("We are gong to submit our pick now.");
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p>This is the Drafting Page</p>
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
                id="exampleSelect"
                onChange={(this.handlePick = this.handlePick.bind(this))}
              >
                <option>Player Select</option>
                {this.state.retrievedArray.map((el, index) => (
                  <option value={el.player_id} key={index}>
                    {el.name_display_first_last}
                    {"("}
                    {el.position}
                    {")"} - {el.team_abbrev}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="dongPlayer">Dong Player</Label>
              <Input
                ref="dongPlayer"
                type="select"
                name="selectDongPlayer"
                id="dongPlayerSelect"
                onChange={
                  (this.acceptDongPlayer = this.acceptDongPlayer.bind(this))
                }
              >
                <option>Select Dong Player</option>
                <option value="olsen">Olsen</option>
                <option value="corcoran">Corcoran</option>
                <option value="ross">Ross</option>
                <option value="lakeman">Lakeman</option>
                <option value="massa">Massa</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="month">Month</Label>
              <Input
                ref="month"
                type="select"
                name="selectMonth"
                id="selectMonth"
                onChange={(this.acceptMonth = this.acceptMonth.bind(this))}
              >
                <option>Select Month</option>
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
            <p>Current Rosters</p>
            <Table></Table>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}
