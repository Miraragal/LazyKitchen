import React from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoodreadsG, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormControl,
  FormGroup,
  InputGroup,
  FormLabel,
} from "react-bootstrap";

class Login extends React.Component {
  render() {
    return (
      <div id="formLogin">
        <FormGroup>
          <h1>Login</h1>
          <InputGroup>
            <InputGroup.Prepend>
              <FontAwesomeIcon icon={faUser} size="md" id="loginLabels" />
              <FormLabel for="username" id="loginLabels">
                Username
              </FormLabel>
              <br />
              <InputGroup.Text>
              </InputGroup.Text>
              <FormControl
                type="email"
                id="inputs"
                placeholder="Type your username"
              />
            </InputGroup.Prepend>
            <br />
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
                <FontAwesomeIcon icon={faLock} size="md" id="loginLabels" />
              <FormLabel for="username" id="loginLabels">
                Password
              </FormLabel>
              <br />
              <InputGroup.Text >
              </InputGroup.Text>
              <FormControl
                type="text"
                id="inputs"
                placeholder="Type your password"
              />
            </InputGroup.Prepend>
            <small id="passwordHelp">
              Forgot password?
            </small>
          </InputGroup>
          <br/>
          <Button type="submit" value="Login" size="lg" id="loginButton">
            LOGIN
          </Button>
          <p id="loginLabels">Or Sign up Using</p>
          <FontAwesomeIcon icon={faFacebook} size='lg' id="facebookButton" />
          <FontAwesomeIcon icon={faGoogle} size='lg' id="facebookButton" />
        </FormGroup>
      </div>
    );
  }
}

export default Login;
