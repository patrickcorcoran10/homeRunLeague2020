import React, { useState } from "react";
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

const Tabs = props => {
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
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
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
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;
