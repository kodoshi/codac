import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/fontawesome-free-solid";
import profileimg from "../images/icon.jpg";
import { withRouter } from "react-router";
import { update, readuserdata, updateUser } from "./apiUsers.js";

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      id: "",
      about: "",
      error: "",
      fileSize: 0,
    };
  }

  /**
   * When the page will be loaded and we are on the Edit profile page all the user data will be read and set to the state
   * if there is an error we will be redirect to the user profile
   */
  componentDidMount() {
    //user Form Data Browser API
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    const tokenkey = isAuthenticated().token;
    readuserdata(userId, tokenkey).then((data) => {
      if (data.error) {
        this.props.history.push(`../${this.state.id}`);
      } else
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
        });
    });
  }

  /**
   * Validation of the edit profile page
   * validate name, email and password
   */
  validate() {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 10000) {
      this.setState({ error: "Filesize should be less than 100kb " });
      return false;
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required" });
      return false;
    }
    if (!/.+@.+\..+/.test(email)) {
      this.setState({ error: "Email should be in the right format" });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({ error: "Password must contain at least 6 characters" });
      return false;
    }
    return true;
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });

    //if the name is 'photo' take event.target.files the first []
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    //get the fileSize and save it to the state if the size is not defined get the default value of fileSize
    const fileSize = name === "photo" ? event.target.files[0].size : 0;

    //save the values on the userData
    this.userData.set(name, value);

    this.setState({ [name]: value, fileSize });
  };

  /**
   * validate name, email and password if they are correct go ti next step (u can use the current password || new one)
   * handle server response from update method and if there is an error set it to the state
   * if there is no error do the update and redirect to user profile page
   */
  editprofile() {
    if (this.validate()) {
      const userId = this.props.match.params.userId;
      const tokenkey = isAuthenticated().token;
      //this.userData --> send the userData to the backend
      update(userId, tokenkey, this.userData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else if (isAuthenticated().user.role === "admin") {
          this.props.history.push(`../${this.state.id}`);
        } else
          updateUser(data, () => {
            //console.log(data)
            this.props.history.push(`../${this.state.id}`);
          });
      });
    }
  }

  render() {
    //show the image on the edit user profile after upload, if no image show the default imgage
    const photoUrl = this.state.id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          this.state.id
        }?${new Date().getTime()}`
      : profileimg;
    return (
      <div className="edit">
        <div className="container cont">
          <h2 className="mt-5 mb-5 text-center font1">
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </h2>
          <img
            src={photoUrl}
            alt={this.state.name}
            className="card-img-top"
            style={{ width: "20%" }}
            onError={(index) => (index.target.src = `${profileimg}`)}
          />

          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.error}
          </div>
          <div className="form-group">
            <label className="text-light font">Profile Photo: </label>
            <input
              type="file"
              onChange={this.handleChange("photo")}
              accept="image/*"
              className="form-control bg-light"
            />
          </div>

          <div className="form-group">
            <label className="text-light font">Username: </label>
            <input
              type="text"
              onChange={this.handleChange("name")}
              value={this.state.name}
              className="form-control bg-light"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-light font">About me: </label>
            <textarea
              type="text"
              onChange={this.handleChange("about")}
              value={this.state.about}
              className="form-control bg-light"
              name="about"
              maxLength="300"
              required
            />
          </div>

          <div className="form-group ">
            <label className="text-light font">Email: </label>
            <input
              type="email"
              onChange={this.handleChange("email")}
              value={this.state.email}
              className="form-control bg-light"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-light font">Password: </label>
            <input
              type="password"
              onChange={this.handleChange("password")}
              value={this.state.password}
              className="form-control bg-light"
              name="password"
              required
            />
          </div>

          <button
            className="btn btn-raised btn-primary"
            onClick={() => this.editprofile()}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditUser);
