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
import Button from 'react-bootstrap/Button';

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

  toggleMenu() {
    const menu = document.getElementById('menu');
    if(menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
    } else {
      menu.classList.add('is-open');
    }
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
            <Col className="col bg-white border-right sidebar pt-1" id="menu">
              <div className="px-3">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <h1 className="checkit-signedIn text-info">CheckIt</h1>
                  <Button variant="outline-info" className="menu-btn" onClick={this.toggleMenu}><i className="fas fa-angle-left"></i></Button>
                </div>
                <h5 className="mt-2">Your Lists</h5>
                <Lists handleListClick={this.handleListClick} initialParentState={this.initialParentState} deletedListId={this.state.deletedListId} userId={this.state.user.id} ref="lists" />
              </div>
              <div className="border-top px-3">
                <h5 className="mt-3 text-muted">{this.state.user.name}</h5>
                <p className="mt-3 text-muted">{this.state.user.email}</p>
                <SignOut setUser={this.setUser} onLogout={this.onLogout} />
              </div>
            </Col>
            <Col className="col-12 col-md-7 col-lg-9 bg-light">
              <Navbar className="justify-content-between">
                <Button variant="info" className="menu-btn" onClick={this.toggleMenu}><i className="fas fa-bars"></i></Button>
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
