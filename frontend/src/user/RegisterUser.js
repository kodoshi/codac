import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
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

  registertodb() {
    //clickSubmit = (event) => {
    //event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    };

<<<<<<< HEAD
registertodb() {
  const {name, email, password} = this.state
  const user = {
    name, email, password
  };

  this.signup(user)
  .then(data => {
    
    if (data.error) 
      this.setState({error: data.error});
    else 
      this.setState({error: "", name: "", email: "", password: "" });
      
  });
  
};

signup = user => {
=======
    this.signup(user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else this.setState({ error: "", name: "", email: "", password: "" });
    });
  }
>>>>>>> e132c1c74dae3c8c46798ec326c5f53bc5ee09d8

  signup = (user) => {
    return axios
      .post("http://localhost:4242/signup", this.state)
      .then((response) => {
        this.props.history.push("/signin");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          <FontAwesomeIcon icon={faUser} /> Sign-up
        </h2>
        <h4> Please fill in all fields to create new user account </h4>

        <div
          className="alert alert-primary"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {" "}
          {this.state.error}
        </div>
        <div className="form-group">
          <label className="text-muted">Username: </label>
          <input
            type="text"
            onChange={(event) => this.handleChange(event)}
            value={this.state.name}
            className="form-control"
            name="name"
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
        {/* 
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Submit
        </button>
*/}
        <button
          className="btn btn-raised btn-primary"
          onClick={() => this.registertodb()}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default withRouter(RegisterUser);
