import React from "react";
import Main from "./components/Main.js"; 
import { BrowserRouter } from "react-router-dom";
import './index.css';

class  App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );

  }
}

export default App;
