import React from "react";
import Login from "./SignIn.js";
import Explore from "./Explore.js";
import { Container, Row, Col } from "react-bootstrap";

class Main extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Container>
          <Row className='row'>
            <Col  className='col'>
              <Login />
            </Col>
            <Col className="col">
              <Explore />
            </Col>
          </Row>
        </Container>
       
      </div>
    );
  }
}

export default Main;
