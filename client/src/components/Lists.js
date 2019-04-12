import React, { Component } from 'react';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverResponse: [],
      newListName: "",
    };
    this.callServer = this.callServer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callServer() {
    fetch("http://localhost:9000/lists")
    .then(res => res.json())
    .then(json => this.setState({ serverResponse: json.lists }))
    .catch(err => err);
  }

  componentDidMount() {
    this.callServer();
  }

  handleChange(e) {
    this.setState({newListName: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.newListName){return};
    fetch("http://localhost:9000/lists/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newListName
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      this.setState({ serverResponse: [...this.state.serverResponse, body.list] });
    });
    this.setState({newListName: ""});
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.serverResponse.map(list =>
            <li key={list.id}>{list.name}</li>
          )}
          <li>New List</li>
        </ul>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label>List Name</label>
            <input type="text" value={this.state.newListName} onChange={(e) => {this.handleChange(e)}} placeholder="Enter New List" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Lists;
