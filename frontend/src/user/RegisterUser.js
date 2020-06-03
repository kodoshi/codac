import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      error: "",
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          <FontAwesomeIcon icon={faUser} /> Sign-up
        </h2>
        <h4> Please fill in all fields to create new user account </h4>

        <div className="form-group">
          <label className="text-muted">Username: </label>
          <input
            type="text"
            onChange={(event) => this.handleChange(event)}
            value={this.state.username}
            className="form-control"
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email: </label>
          <input
            type="email"
            onChange={(event) => this.handleChange(event)}
            value={this.state.email}
            className="form-control"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password: </label>
          <input
            type="password"
            onChange={(event) => this.handleChange(event)}
            value={this.state.password}
            className="form-control"
            name="password"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Confirm Password: </label>
          <input
            type="password"
            onChange={(event) => this.handleChange(event)}
            value={this.state.confirmpassword}
            className="form-control"
            name="confirmpassword"
            required
          />
        </div>
        <button
          className="btn btn-raised btn-primary"
          onClick={() => this.callserverRegister()}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default RegisterUser;
