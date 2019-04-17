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
  }

  callServer() {
    fetch("http://chuckydarn-checkit.herokuapp.com/items")
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
    fetch("http://chuckydarn-checkit.herokuapp.com/items/create", {
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
        fetch(`http://chuckydarn-checkit.herokuapp.com/${id}/check`, {
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
    fetch(`http://chuckydarn-checkit.herokuapp.com/items/destroy`, {
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

  handleUpdateChange(e, id) {
    this.setState({updateItemName: e.target.value});
    document.addEventListener('click', (e) => {
      if(e.target.closest('.update-form')) return;
      this.handleUpdateSubmit(e, id);
    })
  }

  handleUpdateSubmit(e, id) {
    e.preventDefault();
    if(!this.state.updateItemName){return};
    this.state.serverResponse.map((item, i) => {
      if(this.state.serverResponse[i].id === id) {
        fetch(`http://chuckydarn-checkit.herokuapp.com/items/${id}/update`, {
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
    this.setState({updateItemName: ""});
    document.getElementById(id).blur();
  }

  render() {
    return (
      <div>
        <div className="px-3 mb-3">
          <ListGroup>
            {this.state.serverResponse.filter(item => item.listId === this.props.listId).map(item =>
              <ListGroup.Item key={item.id}>
                <div className="list-item" >
                  <Form.Check type="checkbox" checked={item.isChecked} onChange={(e, id) => {this.handleChecked(e, item.id)}} />
                  <div className="update-form">
                    <form onSubmit={(e, id) => this.handleUpdateSubmit(e, item.id)} className="form">
                      <InputGroup>
                        <FormControl type="text" plaintext defaultValue={item.body} onChange={(e, id) => {this.handleUpdateChange(e, item.id)}} placeholder="Edit Item" id={item.id}/>
                      </InputGroup>
                    </form>
                  </div>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>

        <div className="px-3">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <InputGroup>
              <FormControl type="text" value={this.state.newItemName} onChange={(e) => {this.handleChange(e)}} placeholder="Enter New Item" />
              <InputGroup.Append>
                <Button type="submit" variant="info">Add</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
        </div>

      </div>
    );
  }
}

export default Items;
