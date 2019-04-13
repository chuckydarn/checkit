import React, { Component } from 'react';
import Lists from './components/Lists';
import Options from './components/Options';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: "",
      activeListId: "",
      deletedListId: "",
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.initialParentState = this.initialParentState.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
  }

  initialParentState(list) {
    this.setState({
      activeList: list.name,
      activeListId: list.id,
      deletedListId: "",
    });
  }

  handleListClick(list) {
    this.setState({
      activeList: list.name,
      activeListId: list.id,
    });
  }

  handleListDelete(id) {
    this.setState({
      deletedListId: id
    });
    this.refs.lists.handleDelete();
    this.refs.lists.callServer();
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <Lists handleListClick={this.handleListClick} initialParentState={this.initialParentState} deletedListId={this.state.deletedListId} ref="lists" />
        </div>
        <div className="main">
          <h1>{this.state.activeList}</h1>
          <Options listId={this.state.activeListId} handleListDelete={this.handleListDelete}/>
        </div>
      </div>
    );
  }
}

export default App;
