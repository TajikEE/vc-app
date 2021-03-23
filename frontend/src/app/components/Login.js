import React, { Component } from "react";
import { Container } from "reactstrap";
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { Button } from "react-bootstrap";
import AuthenticationService from "../services/AuthenticationService";
import { Link } from "react-router-dom";

import "../../App.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  changeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({ [name]: val });
  };

  doLogin = async (event) => {
    event.preventDefault();

    AuthenticationService.login(this.state.email, this.state.password).then(
      () => {
        this.props.history.push("/welcome");
      },
      (error) => {
        console.log("Login fail: error = { " + error.toString() + " }");
        this.setState({
          error:
            "Can not signin successfully ! Please check email/password again",
        });
      }
    );
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row style={{ marginTop: "20px" }}>
            <Col sm="12" md={{ size: 3, offset: 4 }}>
              <Link to="/signup">Go to signup page</Link>

              <Form onSubmit={this.doLogin}>
                <FormGroup>
                  <Label for="email">
                    <strong>Email</strong>
                  </Label>
                  <Input
                    autoFocus
                    type="text"
                    name="email"
                    id="email"
                    value={this.state.email}
                    placeholder="Enter Email"
                    autoComplete="email"
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">
                    <strong>Password</strong>
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    placeholder="Enter Password"
                    autoComplete="password"
                    onChange={this.changeHandler}
                  />
                </FormGroup>

                <Button type="submit" variant="primary" size="lg" block>
                  Login
                </Button>
                {this.state.error && (
                  <Alert color="danger">{this.state.error}</Alert>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
