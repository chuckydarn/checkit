import React, { Component } from 'react';

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
      <div className="options">
        <ul>
          <li>
            Options
            <div className="sub-options">
              <ul>
                <li onClick={(e) => {this.handleListDelete(e)}}>Delete List</li>
                <li>Delete Checked Items</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Options;
