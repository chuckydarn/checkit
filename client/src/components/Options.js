import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleListDelete = this.handleListDelete.bind(this);
  }

  handleListDelete(e) {
    if(!this.props.listId){return};
    fetch(`http://localhost:9000/lists/${this.props.listId}/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .then((res) => {
      if(res.status == 200){
        this.props.handleListDelete(this.props.listId);
      } else {
        console.log('nope');
      }
    });
  }

  render() {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="outline-info">
            Edit
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => {this.handleListDelete(e)}}>Delete List</Dropdown.Item>
            <Dropdown.Item>Delete Checked Items</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default Options;
