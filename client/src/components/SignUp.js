import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserName: "",
      newUserEmail: "",
      newUserPw: ""
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleNameChange(e) {
    this.setState({newUserName: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({newUserEmail: e.target.value});
  }

  handlePwChange(e) {
    this.setState({newUserPw: e.target.value});
  }

  handleSignUp(e) {
    e.preventDefault();
    if(!this.state.newUserName){return};
    if(!this.state.newUserEmail){return};
    if(!this.state.newUserPw){return};
    fetch("http://chuckydarn-checkit.herokuapp.com/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newUserName,
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
    this.setState({newUserName: ""});
    this.setState({newUserEmail: ""});
    this.setState({newUserPw: ""});
  }

  render(){
    return (
      <div>
        <Container fluid className="app-frame bg-light">
          <Row className="h-100 align-items-center justify-content-center" noGutters>
            <Col className="col-4 text-center">
              <Card>
                <Card.Body>
                  <h1 className="checkit text-info mb-0">CheckIt</h1>
                  <p className="mb-3 text-muted">Ch-Ch-Ch-Ch-CheckIt Out</p>

                  <h3 className="mb-3">Sign Up</h3>

                  <form onSubmit={(e) => this.handleSignUp(e)} className="form-signin">
                    <FormControl type="test" value={this.state.newUserName} onChange={(e) => {this.handleNameChange(e)}} placeholder="Enter name" className="mb-1" />
                    <FormControl type="email" value={this.state.newUserEmail} onChange={(e) => {this.handleEmailChange(e)}} placeholder="Enter email" className="mb-1" />
                    <FormControl type="password" value={this.state.newUserPw} onChange={(e) => {this.handlePwChange(e)}} placeholder="Enter password" />

                    <Button variant="info" type="submit" className="mt-3 mb-3">Sign up</Button>
                  </form>
                  <a href="javascript:;" onClick={() => {this.props.handleAccountClick()}}>I already have an account</a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default SignUp;
