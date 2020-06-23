import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { comment, uncomment} from './apiPost.js';
import { Link } from 'react-router-dom';
import profileimg from '../images/icon.jpg';


class Comment extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      text: "", 
      error: ""
      
    };
  }
  
handleChange(event) {
	
  this.setState({error: ""});
  this.setState({text: event.target.value});
}

validate (){
    const {text} = this.state;
    
    if (!text.length > 0 || text.length > 200) {
      this.setState({error: "Comment should not be empty and more than 200 characters!"})
      return false;
    }   
    return true;
}

/**
 * addComment method will save the commend to the db 
 * We will take te userId from the authenticated user
 * We will take the postId from the state
 * We will take token key from the Localstorage
 * And also the text of the comment
 * we pass all of this parameters to the comment method we have created on the apiPost
 * handle the server response
 * if error console log the err.
 * if no error clear the old text to the emty string
 * and update the comment 
*/

addComment(){
	if(this.validate()){
	  const userId = isAuthenticated().user._id
  	const postId = this.props.postId
  	const tokenkey = isAuthenticated().token
  	const text = {text: this.state.text}
  	comment(userId, tokenkey, postId, text)
  	.then(data => {
  		if(data.error){
  			console.log(data.error)
  		}
  		else{
  			this.setState({text: ""})
  			//past this comment to the parent component Singlepost
  			this.props.updateComments(data.comments)
  		}
  	})
}
}

/**
 * Handle the response object from remove method
 * if no error delete post and redirect to homepage
 * if error console log the err.
*/

deletecomment(comment) {
    const userId = isAuthenticated().user._id
  	const postId = this.props.postId
  	const tokenkey = isAuthenticated().token
  	const text = {text: this.state.text}
  	uncomment(userId, tokenkey, postId, comment)
  	.then(data => {
  		if(data.error){
  			console.log(data.error)
  		}
  		else{
  			this.props.updateComments(data.comments)
  		}
  	})

}

/**
 * On delete button click, the confirmation screen will be displayed
 * when we click cancel the account will not be deleted
 * when we click Ok the account deleteaccount method will be called
 
*/

deleteConfirmation(comment) {
  const answer = window.confirm("Are you sure you want to delete this comment?")
  if (answer) {
    this.deletecomment(comment)
  }
}


/*//save all comments in the comments array and get it from the props
updateComments = comments => {
  this.setState({comments})
}
*/

render() {
	return (
    <div >
	    <h2 className="mb-5 mt-5"> <FontAwesomeIcon icon={faCommentDots} className="text-primary"/> Leave a Comment</h2>
	    <div 
         className="alert alert-danger"
         style={{display: this.state.error ? "": "none"}}>
         {this.state.error}
         </div>
	    <div className="form-group">
	    	<input type="text"
            onChange={(event) => this.handleChange(event)}
            className="form-control"
            value={this.state.text}
            placeholder="Leave a comment ..."
        	/>
        	<button onClick={() =>this.addComment()} className="btn btn-raised btn-warning mt-4 float-right">
                    Post 
            </button>
       
            <br /><br /><br />
            <hr />
	
	</div>
	     <div className="col-md-20">
			<h3 className="text-primary">{this.props.comments.length} Comment(s) </h3>
		   	{this.props.comments.map((comment, index) => 
		    	<div key={index} >
			    	<div>
			    		<Link to={`/user/${comment.posted_by._id}`}>
			    			<img
			    			className="float-left mr-2"
			    			height="30px"
                alt={comment.posted_by._id}
			    			src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.posted_by._id}`} 
     						onError = {index => (index.target.src = `${profileimg}`)}
      						/>
      					</Link>
      					<div>
		   					<p className="text-dark lead"> {comment.text} </p>
		    				<p className="mark text-dark"> Posted by <Link to={`/user/${comment.posted_by._id}`}> {comment.posted_by.name} </Link> on {new Date(comment.created_at).toDateString() }
            				{isAuthenticated().user && isAuthenticated().user._id === comment.posted_by._id && (
                <span className="float-right">
                 <FontAwesomeIcon onClick={() =>this.deleteConfirmation(comment)} icon={faTrashAlt} style={{"color": "red"}}/>
                  

                </span>
                )}
            				</p>
            				 
		    			</div>
		    		</div>
			    </div>
		    )}
		   </div>
    </div>
)
}
}
export default withRouter(Comment);  