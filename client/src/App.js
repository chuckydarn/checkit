import React, { Component } from 'react';
import Lists from './components/Lists';
import Options from './components/Options';
import Items from './components/Items';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: "",
      activeListId: "",
      deletedListId: "",
      deletedItems: false,
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.initialParentState = this.initialParentState.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
    this.handleItemsDelete = this.handleItemsDelete.bind(this);
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

  handleItemsDelete() {
    this.setState({
      deletedItems: true
    });
    this.refs.items.handleItemsDelete();
    this.setState({
      deletedItems: false
    });
  }

  render() {
    return (
      <div className="app">
        <Container fluid className="app-frame">
          <Row className="h-100" noGutters>
            <Col className="col-3 border-right">
              <Lists handleListClick={this.handleListClick} initialParentState={this.initialParentState} deletedListId={this.state.deletedListId} ref="lists" />
            </Col>
            <Col className="">
              <Navbar className="justify-content-between border-bottom">
                <Navbar.Text><h3>{this.state.activeList}</h3></Navbar.Text>
                <Options listId={this.state.activeListId} handleListDelete={this.handleListDelete} handleItemsDelete={this.handleItemsDelete}/>
              </Navbar>
              <Items listId={this.state.activeListId} ref="items" deleteItems={this.state.deleteItems}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
