import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserEmail: "",
      newUserPw: ""
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleEmailChange(e) {
    this.setState({newUserEmail: e.target.value});
  }

  handlePwChange(e) {
    this.setState({newUserPw: e.target.value});
  }

  handleSignIn(e) {
    e.preventDefault();
    if(!this.state.newUserEmail){return};
    if(!this.state.newUserPw){return};
    fetch("http://chuckydarn-checkit.herokuapp.com/users/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.newUserEmail,
        password: this.state.newUserPw
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      this.props.setUser(body.user);
      this.props.onLogin(body.user.id);
    });
    this.setState({newUserEmail: ""});
    this.setState({newUserPw: ""});
  }

  render(){
    return (
      <div>
        <Container fluid className="app-frame bg-light">
          <Row className="h-100 align-items-center justify-content-center" noGutters>
            <Col className="col-4 text-center">
              <h1 className="checkit text-info">CheckIt</h1>
              <p className="mb-3 text-muted">Ch-Ch-Ch-Ch-CheckIt Out</p>

              <h3>Sign In</h3>

              <form onSubmit={(e) => this.handleSignIn(e)} className="form-signin">
                <FormControl type="email" value={this.state.newUserEmail} onChange={(e) => {this.handleEmailChange(e)}} placeholder="Enter email" className="mb-1" />
                <FormControl type="password" value={this.state.newUserPw} onChange={(e) => {this.handlePwChange(e)}} placeholder="Enter password" />

                <Button variant="info" type="submit" className="mt-3 mb-3">Sign in</Button>
              </form>
              <u onClick={() => {this.props.handleAccountClick()}}>I don't have an account yet</u>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default SignIn;
