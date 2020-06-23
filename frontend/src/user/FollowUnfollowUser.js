import React from "react";
import { withRouter } from "react-router-dom";
import { follow, unfollow } from "./apiUsers.js";

class FollowUnfollowUser extends React.Component {
  /**
   * In this method we will access the props
   * onClick the followClick will be executed than onButtonClick we will be called on the UserProfile Component
   * then the clickFollow method will be executed, wich calls the callApi method that is the follow argument in this component.
   */
  followClick() {
    this.props.onButtonClick(follow);
  }

  unfollowClick() {
    this.props.onButtonClick(unfollow);
  }

  render() {
    return (
      <div>
        {
          //is the following props is false then we can show the button Follow
          !this.props.following ? (
            <button
              className="btn btn-raised btn-primary mr-5"
              onClick={() => this.followClick()}
            >
              {" "}
              Follow{" "}
            </button>
          ) : (
            <button
              className="btn btn-raised btn-danger mr-5"
              onClick={() => this.unfollowClick()}
            >
              {" "}
              UnFollow{" "}
            </button>
          )
        }
      </div>
    );
  }
}

export default withRouter(FollowUnfollowUser);
