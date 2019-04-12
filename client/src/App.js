import React, { Component } from 'react';
import Lists from './components/Lists';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <Lists />
        </div>
        <div className="main">
          <header>
            <h1>Welcome to CheckIt</h1>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
