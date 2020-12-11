import React from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faRProject } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import recipe from "../images/recipe.gif";
import { ResponsiveEmbed, Button, Container, Col, Row } from "react-bootstrap";

class Explore extends React.Component {
  render() {
    return (
      <div id="formLogin">
        <img type="video/mp4" src={recipe} />
        <Button type="submit" value="Explore" size="lg" id="loginButton">
          EXPLORE
        </Button>
      </div>
    );
  }
}

export default Explore;
