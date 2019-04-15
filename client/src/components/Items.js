import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import update from 'react-addons-update';
import '../App.css';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverResponse: [],
      newItemName: "",
      newUpdateName: ""
    };
    this.callServer = this.callServer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  callServer() {
    fetch("http://localhost:9000/items")
    .then(res => res.json())
    .then(json => this.setState({ serverResponse: json.items }))
    .catch(err => err);
  }

  componentDidMount() {
    this.callServer();
  }

  handleChange(e) {
    this.setState({newItemName: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.newItemName){return};
    fetch("http://localhost:9000/items/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        body: this.state.newItemName,
        listId: this.props.listId
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      this.setState({ serverResponse: [...this.state.serverResponse, body.item] });
    });
    this.setState({newItemName: ""});
  }

  handleChecked(e, id) {
    this.state.serverResponse.map((item, i) => {
      if(this.state.serverResponse[i].id === id) {
        let currentCheckedState = this.state.serverResponse[i].isChecked;
        let newCheckedState = currentCheckedState ? false : true;
        fetch(`http://localhost:9000/items/${id}/check`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            isChecked: newCheckedState
          })
        })
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          this.setState({
            serverResponse: update(this.state.serverResponse, {[i]: {isChecked: {$set: newCheckedState}}})
          })
        });
      }
    })
  }

  handleItemsDelete(e) {
    let checkedItems= [];
    this.state.serverResponse.map((item, i) => {
      if(this.state.serverResponse[i].isChecked === true && this.state.serverResponse[i].listId === this.props.listId) {
        checkedItems.push(this.state.serverResponse[i].id);
      }
    });
    fetch(`http://localhost:9000/items/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: checkedItems
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      for(let j=0; j<=checkedItems.length; j++){
        this.setState({serverResponse: this.state.serverResponse.filter(i => i.id !== checkedItems[j])});
      }
    })
  }

  handleClick(id) {
    var element = document.getElementById(`${id}`);
    element.addEventListener('click', (e) => {
      element.classList.add("editing");
      e.stopPropagation();
    })
    document.addEventListener('click', (e) => {
      if(e.target.closest('.form')) return;
      element.classList.remove('editing');
    })

  }

  handleUpdateChange(e) {
    this.setState({updateItemName: e.target.value});
  }

  handleUpdateSubmit(e, id) {
    e.preventDefault();
    if(!this.state.updateItemName){return};
    this.state.serverResponse.map((item, i) => {
      if(this.state.serverResponse[i].id === id) {
        fetch(`http://localhost:9000/items/${id}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            body: this.state.updateItemName
          })
        })
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          this.setState({
            serverResponse: update(this.state.serverResponse, {[i]: {body: {$set: body.item.body}}})
          })
        });
      }
    })
    var element = document.getElementById(`${id}`);
    element.classList.remove('editing');
    this.setState({updateItemName: ""});
  }

  render() {
    return (
      <div>
      <ListGroup>
      {this.state.serverResponse.filter(item => item.listId === this.props.listId).map(item =>
        <ListGroup.Item key={item.id}>
          <div className="list-item" id={item.id}>
            <Form.Check type="checkbox" checked={item.isChecked} onChange={(e, id) => {this.handleChecked(e, item.id)}} />
            <div onClick={(id) => this.handleClick(item.id)} >{item.body}</div>
          </div>
          <form onSubmit={(e, id) => this.handleUpdateSubmit(e, item.id)} className="form">
            <InputGroup>
              <FormControl type="text" value={this.state.updateItemName} onChange={(e) => {this.handleUpdateChange(e)}} placeholder="Edit Item" />
              <InputGroup.Append>
                <Button type="submit" variant="info">Update</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
        </ListGroup.Item>
      )}
      </ListGroup>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <InputGroup>
          <FormControl type="text" value={this.state.newItemName} onChange={(e) => {this.handleChange(e)}} placeholder="Enter New Item" />
          <InputGroup.Append>
            <Button type="submit" variant="info">Add</Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
      </div>
    );
  }
}

export default Items;
