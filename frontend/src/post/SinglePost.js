import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { singlepost } from './apiPost.js';
import defaultpost from '../images/post.jpg';


class SinglePost extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     post: ""
    }
  }

  /**
 * Handle the response object from listusers method
 * if no error set State with data and display user information in the right form
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
          
        </div> 
</div>
</div>
</div>
);
}
}

export default withRouter(SinglePost);