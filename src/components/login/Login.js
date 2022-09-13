import React, { Component } from "react";
//import { Row, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import {
  isEmail,
  isEmpty,
  isLength,
  isContainWhiteSpace,
} from "../../shared/validator";
import "./login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Background from "../../assets/images/login_background.jpg";
import Card from "react-bootstrap/Card";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}, //Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false,
    };
  }

  handleInputChange = (event) => {
    console.log("CheckIng");
    const target = event.target;
    const value = event.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData,
    });
  };

  validateLoginForm = (e) => {
    let errors = {};
    const { formData } = this.state;

    if (isEmpty(formData.email)) {
      errors.email = "Email can't be blank";
    } else if (!isEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (isEmpty(formData.password)) {
      errors.password = "Password can't be blank";
    } else if (isContainWhiteSpace(formData.password)) {
      errors.password = "Password should not contain white space";
    } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
      errors.password = "Password's length must between 6 to 16";
    }

    if (isEmpty(errors)) {
      return true;
    } else {
      return errors;
    }
  };

  login = (e) => {
    e.preventDefault();

    let errors = this.validateLoginForm();

    if (errors === true) {
      alert("You are successfully signed in!");
      window.location.reload();
    } else {
      this.setState({
        errors: errors,
        formSubmitted: true,
      });
    }
  };

  render() {
    const { errors, formSubmitted } = this.state;

    return (
      <div className="Login">
        {/* <Card className="login-card"> */}
        <div className="card">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>

        {/* </Card> */}
      </div>
    );
  }
}

{
  /* <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validator={formSubmitted?(errors.email?'error':'success'):null }>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                            {errors.email && 
                                <Alert>{errors.email}</Alert>
                            }
                        </FormGroup>
                        <FormGroup controlId="password" validator={formSubmitted?Button(errors.password?'error':'success'):null}>
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                            {errors.password && 
                                <Alert>{errors.password}</Alert>
                            }
                        </FormGroup>
                        <Button type="submit" bsstyle="primary">Sign-In</Button>
                    </form>
                </Row> */
}

export default Login;
