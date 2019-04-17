import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut(e) {
    this.props.setUser(null);
  }

  render(){
    return (
      <div>
        <Button variant="outline-info" className="mt-1 mb-3" onClick={(e) => this.handleSignOut(e)}>Sign out</Button>
      </div>
    );
  }
};

export default SignOut;
