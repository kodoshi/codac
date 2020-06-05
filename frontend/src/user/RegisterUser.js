import React from "react";
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
      error: ""
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
      
    });
  }

  registertodb() {
   
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    }


  this.signup(user).then(data => {
    if (data.error) this.setState({error: data.error})
      else this.props.history.push("/signin"); 

  })
 
  
};

  signup = user => {

    return fetch("http://localhost:4242/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(function(response) {
      return response.json()
    }).catch((err) =>{
        console.log(err)
      
    });

  };

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
