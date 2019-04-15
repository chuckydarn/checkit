import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

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
    .then(() => {this.props.initialParentState(this.state.serverResponse[0])})
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

  handleDelete() {
    this.setState({serverResponse: this.state.serverResponse.filter(i => i.id !== this.props.deletedListId)});
  }

  render() {
    return (
      <div className="px-3">
        <ListGroup as="ul" className="mb-3">
          {this.state.serverResponse.map(list =>
            <ListGroup.Item action as="li" key={list.id} onClick={(e) => {this.props.handleListClick(list)}}>{list.name}</ListGroup.Item>
          )}
        </ListGroup>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <InputGroup>
            <FormControl type="text" value={this.state.newListName} onChange={(e) => {this.handleChange(e)}} placeholder="Enter New List" />
            <InputGroup.Append>
              <Button type="submit" variant="info">Create</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
      </div>
    );
  }
}

export default Lists;
