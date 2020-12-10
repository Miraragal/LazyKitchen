import React from "react";
import Login from './SignIn.js';
import  Explore from './Explore.js';

class Main extends React.Component {
  render() {
    return (
      <div className="container-fluid">
          <div className='row'>
              <div className='col'>
                <Login />
                <Explore /> 
              </div>
          </div>
     
      </div>
    );
  }
}

export default Main;
