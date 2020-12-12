import React from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FormControl,
  FormGroup,
  InputGroup,
  FormLabel,
} from "react-bootstrap";
import OAuth from "./OAuth";
import io from "socket.io-client";

//SOCIALMEDIA LOGIN
const socket = io("http://localhost:3001");
const providers = ["facebook", "google"];

//VALIDATORS
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: "",
      password: "",
      authenticated: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  
  submitHandler(values) {
    console.log(`Hola! ${this.username}`);
    values.preventDefault();
   
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        {!authenticated ? (
          <FormGroup
            id="formLogin"
            onSubmit={(values) => this.submitHandler(values)}
          >
            <h1>Login</h1>
            <InputGroup>
              <InputGroup.Prepend>
                <FontAwesomeIcon icon={faUser} size="md" id="loginLabels" />{" "}
                <FormLabel for="username" id="loginLabels">
                  Username
                </FormLabel>
                <br />
                <InputGroup.Text></InputGroup.Text>
                <FormControl
                  type="email"
                  id="inputs"
                  // onChange={this.stateChange(input.email)}
                  placeholder="Type your emails as Username"
                />
              </InputGroup.Prepend>
              <br />
            </InputGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <FontAwesomeIcon icon={faLock} size="md" id="loginLabels" />{" "}
                <FormLabel for="username" id="loginLabels">
                  Password
                </FormLabel>
                <br />
                <InputGroup.Text></InputGroup.Text>
                <FormControl
                  type="text"
                  id="inputs"
                  placeholder="Type your password"
                  // onChange={this.stateChange(input.email)}
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(20),
                  }}
                />
              </InputGroup.Prepend>
              <small id="passwordHelp">Forgot password?</small>
            </InputGroup>
            <br />
            <Button type="submit" value="Login" size="lg" id="loginButton">
              LOGIN
            </Button>
            {/* OAUTH */}
            <p id="loginLabels">Or Sign up Using</p>
            {providers.map(provider => {
              <OAuth provider={provider} key={provider} socket={socket} />;
            })}
          </FormGroup>
        ) : (
          <h1>Welcome {this.user.name}</h1>
        )}
      </div>
    );
  }
}

export default Login;


// componentDidMount() {
  //   const requestLogin = {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //     body: JSON.stringify({ title: "React POST Request Example" }),
  //   };

  //   fetch('"/api/users/login"', requestLogin)
  //     .then((response) => {
  //       if (response.status === 200) return response.json();
  //       throw new Error("failed to authenticate user");
  //     })
  //     .then((data) =>
  //       this.setState({
  //         authenticated: true,
  //         user: data.user,
  //       })
  //     )
  //     .catch((error) => {
  //       this.setState({
  //         authenticated: false,
  //         error: "Failed to authenticate user",
  //       });
  //     });
  // }

  // signin = (email, password) => async (dispatch) => {
  //   const { userData } = await Axios.post("/api/users/login", {
  //     email,
  //     password,
  //   });
  //   fetch(userData)
  //     .then((response) => response.json())
  //     .then((user) => console.log("This is your user:", user))
  //     .catch((error) => console.log(error));
  // };

  // stateChange() {
  //   this.setState({
  //     email: input.email,
  //     password: input.password,
  //   });
  // }