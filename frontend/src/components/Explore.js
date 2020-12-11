import React from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faRProject } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cooking from "../images/cooking.gif";
import { ResponsiveEmbed, Button, Container, Col, Row } from "react-bootstrap";

class Explore extends React.Component {
  render() {
    return (
      <div id="formLogin">
        <img type="video/mp4" src={cooking} />
        <Button type="submit"  value="Explore" size="lg" id="loginButton">
         <a href='https://www.allrecipes.com/'>EXPLORE</a> 
        </Button>
      </div>
    );
  }
}

export default Explore;
