import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { singlepost, remove } from './apiPost.js';
import defaultpost from '../images/post.jpg';
import { isAuthenticated } from "../auth/file.js";



class SinglePost extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     post: ""
    }
  }

/**
 * Handle the response object from singlepost method
 * if no error set State with data and display post information in the right form
 * if error console log the err.
*/

componentDidMount() {
	const postId = this.props.match.params.postId
  singlepost(postId).then(data => {
    if (data.error) {
      console.log(data.error)
    }
    else 
      this.setState({post: data});
  });
  
}


/**
 * Handle the response object from remove method
 * if no error delete post and redirect to homepage
 * if error console log the err.
*/

deletepost() {
    const postId = this.props.match.params.postId
    const tokenkey = isAuthenticated().token
    remove(postId, tokenkey).then(data => {
      if (data.error) {
      console.log(data.error)
    }
    else 
      this.props.history.push("/");
  });

}

/**
 * On delete button click, the confirmation screen will be displayed
 * when we click cancel the account will not be deleted
 * when we click Ok the account deleteaccount method will be called
 
*/

deleteConfirmation() {
  const answer = window.confirm("Are you sure you want to delete this post?")
  if (answer) {
    this.deletepost()
  }
}


render() {
	const postId = this.state.post.posted_by ? this.state.post.posted_by._id : ""
 	const postName = this.state.post.posted_by ? this.state.post.posted_by.name : " Unknown"

    return (
      <div className="welcome">
      <div className="container cont">



<h2 className="cont2 text-center font1"><FontAwesomeIcon icon={faList} /> See Post  </h2>
  <div className="cont4 text-dark col-md-12">
 	
        <div className="card-body">
           
            <h4 className="card-title text-dark mb-4"><b><i>{this.state.post.title}</i></b> </h4>
             <img 
        	src={`${process.env.REACT_APP_API_URL}/post/photo/${this.state.post._id}?${new Date().getTime()}`} 
        	alt={this.state.post.title} className="img-thumbnail mb-3"
        	style={{width: '100%', height: "300px", objectFit:"cover"}} onError = {i => (i.target.src = `${defaultpost}`)}
			/>
            <p className="card-text text-dark"><i>{this.state.post.body}</i></p>  
            <br/>
            <p className="mark text-dark"> Posted by <Link to={`/user/${postId}`}> {postName} </Link> on {new Date(this.state.post.created_at).toDateString() }
            </p>
            <div className="d-inline-block">
              <Link className="btn btn-raised btn-primary mr-5" to={`/`}>
              Back to Posts 
              </Link>
{/* if we have the authenticated user, and if uathenticated userid matches with the posted_by._id */ }      
        {isAuthenticated().user && isAuthenticated().user._id === postId && (
                <>
                  <Link className="btn btn-raised btn-success mr-5" to={`/post/edit/${this.state.post._id}`}>
                    Edit Post
                  </Link>
                  <button onClick={() =>this.deleteConfirmation()} className="btn btn-raised btn-danger mr-5" to={`/`}>
                    Delete Post 
                  </button>
                </>
                )}
              
          </div>
          
          
        </div> 
</div>
</div>
</div>
);
}
}

export default withRouter(SinglePost);