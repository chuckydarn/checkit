import React, { Component } from 'react';
import cookie from 'react-cookie';
import Lists from './components/Lists';
import Options from './components/Options';
import Items from './components/Items';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cookieId: null,
      signInForm: true,
      activeList: "",
      activeListId: "",
      deletedListId: "",
      deletedItems: false,
    };
    this.handleListClick = this.handleListClick.bind(this);
    this.initialParentState = this.initialParentState.bind(this);
    this.handleListDelete = this.handleListDelete.bind(this);
    this.handleItemsDelete = this.handleItemsDelete.bind(this);
    this.setUser = this.setUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }

  componentWillMount() {
    var cookieId = cookie.load('cookieId');
    this.getUser(cookieId);
  }

  onLogin(userId) {
    this.setState({cookieId: userId});
    cookie.save('cookieId', this.state.cookieId, {path: '/'});
  }

  onLogout() {
    cookie.remove('cookieId', {path: '/'});
  }

  getUser(id) {
    fetch(`http://chuckydarn-checkit.herokuapp.com/users/${id}`)
    .then(res => res.json())
    .then(body => this.setState({
      cookieId: id,
      user: body.user
    }))
    .catch(err => err);
  }

  setUser(user){
    this.setState({user: user});
  }

  handleAccountClick() {
    this.setState({
      signInForm: !this.state.signInForm
    })
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
    var app;
    if(!this.state.cookieId || !this.state.user){
      if(this.state.signInForm === true) {
        app = <SignIn setUser={this.setUser} handleAccountClick={this.handleAccountClick} onLogin={this.onLogin} />
      } else {
        app = <SignUp setUser={this.setUser} handleAccountClick={this.handleAccountClick} onLogin={this.onLogin} />
      }
    } else {
      app = <div className="app">
        <Container fluid className="app-frame">
          <Row className="h-100" noGutters>
            <Col className="col-3 border-right sidebar">
              <div>
                <Navbar>
                  <Navbar.Text>
                    <h1 className="checkit-signedIn text-info">CheckIt</h1>
                    <h5 className="mt-2">Your Lists</h5>
                  </Navbar.Text>
                </Navbar>
                <Lists handleListClick={this.handleListClick} initialParentState={this.initialParentState} deletedListId={this.state.deletedListId} userId={this.state.user.id} ref="lists" />
              </div>
              <div className="border-top px-3">
                <h5 className="mt-3 text-muted">{this.state.user.name}</h5>
                <p className="mt-3 text-muted">{this.state.user.email}</p>
                <SignOut setUser={this.setUser} onLogout={this.onLogout} />
              </div>
            </Col>
            <Col className="bg-light">
              <Navbar className="justify-content-between">
                <Navbar.Text><h3>{this.state.activeList}</h3></Navbar.Text>
                <Options listId={this.state.activeListId} handleListDelete={this.handleListDelete} handleItemsDelete={this.handleItemsDelete}/>
              </Navbar>
              <Items listId={this.state.activeListId} ref="items" deleteItems={this.state.deleteItems}/>
            </Col>
          </Row>
        </Container>
      </div>
    }

    return (
      <div className="w-100">{app}</div>
    );
  }
}

export default App;
