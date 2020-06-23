import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/fontawesome-free-solid";
import { singlepost, update } from "./apiPost.js";
import defaultpost from "../images/post.jpg";
import { isAuthenticated } from "../auth/file.js";

class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      body: "",
      error: "",
      fileSize: 0,
    };
  }

  componentDidMount() {
    //post Form Data Browser API
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    singlepost(postId).then((data) => {
      if (data.error) {
        this.props.history.push(`/user/${isAuthenticated().user._id}`);
      } else
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: "",
        });
    });
  }

  /**
   * Validation of the edit profile page
   * validate title, body and photo
   */
  validate() {
    const { title, body, fileSize } = this.state;
    if (fileSize > 10000) {
      this.setState({ error: "Filesize should be less than 100kb " });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required" });
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

    //save the values on the postData
    this.postData.set(name, value);

    this.setState({ [name]: value, fileSize });
  };

  /**
   * validate title, body and photo if they are correct go ti next step
   * handle server response from update method and if there is an error set it to the state
   * if there is no error do the update and redirect to user profile page
   */
  editpost() {
    if (this.validate()) {
      const postId = this.state.id;
      const tokenkey = isAuthenticated().token;
      //this.userData --> send the userData to the backend
      update(postId, tokenkey, this.postData).then((data) => {
        if (data.error) this.setState({ error: data.error });
        else this.props.history.push(`/`);
      });
    }
  }

  render() {
    return (
      <div className="edit">
        <div className="container cont">
          <h2 className="mt-5 mb-5 text-center font1">
            <FontAwesomeIcon icon={faEdit} /> Update Post
          </h2>
          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${
              this.state.id
            }?${new Date().getTime()}`}
            alt={this.state.title}
            className="card-img-top mb-4"
            style={{ width: "20%" }}
            onError={(index) => (index.target.src = `${defaultpost}`)}
          />

          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.error}
          </div>
          <div className="form-group">
            <label className="text-light font">Post Photo: </label>
            <input
              type="file"
              onChange={this.handleChange("photo")}
              accept="image/*"
              className="form-control bg-light"
            />
          </div>

          <div className="form-group">
            <label className="text-light font">Title: </label>
            <input
              type="text"
              onChange={this.handleChange("title")}
              value={this.state.title}
              className="form-control bg-light"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-light font">Post Body: </label>
            <textarea
              type="text"
              onChange={this.handleChange("body")}
              value={this.state.body}
              className="form-control bg-light"
              name="about"
              maxLength="500"
              required
            />
          </div>

          <button
            className="btn btn-raised btn-primary"
            onClick={() => this.editpost()}
          >
            Update Post
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPost);
