import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
      if(res.status === 200){
        this.props.handleListDelete(this.props.listId);
      } else {
        console.log('err');
      }
    });
  }

  handleItemsDelete(e) {
    this.props.handleItemsDelete();
  }

  render() {
    return (
      <div>
        <DropdownButton variant="outline-info" alignRight title="Edit" button>
          <Dropdown.Item onClick={(e) => {this.handleListDelete(e)}}>Delete List</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {this.handleItemsDelete(e)}}>Delete Checked Items</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default Options;
