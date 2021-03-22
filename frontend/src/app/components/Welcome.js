import React, { Component } from "react";
import {
  NavLink,
  Container,
  Button,
} from "reactstrap";

import { withRouter } from "react-router-dom";

import AuthenticationService from "../services/AuthenticationService";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  componentDidMount() {
    const user = AuthenticationService.getCurrentUser();

    if (user) {
      this.setState({
        login: true,
        username: user.username,
      });
    }
  }

  signOut = () => {
    AuthenticationService.signOut();
    this.props.history.push("/login");
    window.location.reload();
  };

  render() {
    return (
      <Container>
        {this.state.login ? (
          <div>
            <div>Yay, you are logged in!</div>

            <Button variant="primary" size="lg" block onClick={this.signOut}>
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <p>Must login to see this page!</p>
            <NavLink href="/login">Login</NavLink>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(AppNavbar);
