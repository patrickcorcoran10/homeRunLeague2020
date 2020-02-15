import React, { Component } from "react";
import { FormGroup, Label, Input, Table } from "reactstrap";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        playerA: this.res
      },
      retrieved: [],
      pick: {}
    };
  }
  acceptPlayer = e => {
    console.log(e.target.value);
    this.setState({
      inputs: {
        playerA: this.refs.player.value
      }
    });
  };
  async search(e) {
    console.log("now we search the api", this.state.inputs.playerA);
    let url =
      "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='";
    try {
      const res = await fetch(url + this.state.inputs.playerA + "%25'");
      const data = await res.json();
      console.log(data.search_player_all.queryResults.row);
      this.setState({
        retrieved: data.search_player_all.queryResults.row
      });
    } catch (error) {
      console.log("Swing and a miss: ", error);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <p>This is the Drafting Page</p>
            <form>
              <p>Player Name: </p>
              <input ref="player" onChange={this.acceptPlayer}></input>
            </form>
            <button onClick={this.search.bind(this)}>Search</button>
            <br></br>
            <Table className="display">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Position</th>
                  <th>Pin</th>
                </tr>
              </thead>
              <tbody>
                {this.state.retrieved.map((el, index) => (
                  <tr key={index}>
                    <td>{el.name_display_first_last}</td>
                    <td>{el.team_abbrev}</td>
                    <td>{el.position}</td>
                    <td>{el.player_id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <FormGroup>
              <Label for="dongPlayer">Dong Player</Label>
              <Input
                ref="dongPlayer"
                type="select"
                name="selectDongPlayer"
                id="dongPlayerSelect"
              >
                <option>Select Dong Player</option>
                <option>Olsen</option>
                <option>Corcoran</option>
                <option>Ross</option>
                <option>Lakeman</option>
                <option>Massa</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="month">Month</Label>
              <Input
                ref="month"
                type="select"
                name="selectMonth"
                id="selectMonth"
              >
                <option>Select Month</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
              </Input>
            </FormGroup>
            <button>Submit</button>
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
