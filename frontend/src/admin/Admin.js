import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faList } from "@fortawesome/fontawesome-free-solid";
import { withRouter } from "react-router";



class Admin extends Component {

render() {
        return (
            <div className="cont1">
                <div className="jumbotron font1 text-dark ">
                    <h2>Admin Dashboard</h2>
                    <p className="lead">Welcome to Albanian Facebook</p>
                </div>
                <div>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <h2><a href="/"><FontAwesomeIcon icon={faList}/> See all Posts</a></h2>
                            <hr/>
                        </div>

                        <div className="col-md-6 text-center">
                            <h2><a href="/users"> <FontAwesomeIcon icon={faUsers} /> See all Users</a></h2>
                            <hr/>
                        </div>

					</div>
                </div>
			</div>
        );
    }
}

export default withRouter(Admin);
