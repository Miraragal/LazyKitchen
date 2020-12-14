import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";



export default class OAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      disabled: '',
    };
  }

  componentDidMount() {
    const { socket, provider } = this.props;
      socket.on(provider, (user) => {
        this.popup.close();
        this.setState({ user });
      });
  }

  //Re-enable the login button if the user close popup without authenticating
  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  //Launches the popup by requesting the server and then pases along the socket id
  openPopup() {
    const { provider, socket } = this.props;
    const width = 600, height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${"http://localhost:3000"}/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }
  //Kicks off the processes of opening the popup on the server and also disables the login button if the user is already logged
  startAuth(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  }

  closeCard() {
    this.setState({ user: {} });
  }

  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    const { disabled } = this.state;

    return (
      <div>
      {name
        ? <div>              
            <img src={photo} alt={name} />
            <FontAwesomeIcon
              icon={faCircle}
              onClick={this.closeCard.bind(this)}
            />
            <h4>{name}</h4>
          </div>
        : <div>
            <button 
              onClick={this.startAuth.bind(this)} 
            >
              <FontAwesomeIcon
                icon={provider}
                size='xl'
                id='facebookButton'
              />
            </button>
          </div>
      }
    </div>
    )
  }
}
