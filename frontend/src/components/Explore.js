import React from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import recipe from '../images/recipeGif.gif'
import {
    ResponsiveEmbed,
    Button,
} from "react-bootstrap";

class Explore extends React.Component {
  render() {
    return (
      <div id="formLogin">
         {/* <div style={{ width: 660, height: "auto" }}> */}
          <ResponsiveEmbed aspectRatio="16by9">
            <embed type="video/mp4" src={recipe} />
          </ResponsiveEmbed> 
          <Button type="submit" value="Explore" size="lg" id="loginButton">
            EXPLORE
          </Button>
     
      </div>
    );
  }
}

export default Explore;
