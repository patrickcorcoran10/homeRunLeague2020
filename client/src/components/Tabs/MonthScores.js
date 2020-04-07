import React, { Component, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";

export default class MonthScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [activeTab, setActiveTab],
      rosters: {},
      scores: {}
    };
  }

  toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
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
          hr: data.sport_hitting_tm.queryResults.row.hr,
          total: team.total
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
          hr: data.sport_hitting_tm.queryResults.row.hr,
          total: team.total
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
          hr: data.sport_hitting_tm.queryResults.row.hr,
          total: team.total
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
          hr: data.sport_hitting_tm.queryResults.row.hr,
          total: team.total
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
          hr: data.sport_hitting_tm.queryResults.row.hr,
          total: team.total
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

  //     const toggle = tab => {
  //       if (activeTab !== tab) setActiveTab(tab);
  //     };
  render() {
    // const [activeTab, setActiveTab] = useState("1");

    let corcoran = this.state.scores.pc.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr - el.total}
        </p>
      </div>
    ));
    let olsen = this.state.scores.to.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr - el.total}
        </p>
      </div>
    ));
    let ross = this.state.scores.rr.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr - el.total}
        </p>
      </div>
    ));
    let massa = this.state.scores.mm.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr - el.total}
        </p>
      </div>
    ));
    let lakeman = this.state.scores.jl.map((el, index) => (
      <div key={index}>
        <p>
          {el.name} | {el.hr - el.total}
        </p>
      </div>
    ));
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              //   onClick={() => {
              //     toggle("1");
              //   }}
              onClick={(this.toggle = this.toggle.bind(this))}
            >
              Tab1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              //   onClick={() => {
              //     toggle("2");
              //   }}
              onClick={(this.toggle = this.toggle.bind(this))}
            >
              Moar Tabs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
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
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
