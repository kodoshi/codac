import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHeart, faComment, faUser } from "@fortawesome/fontawesome-free-solid";


class Homepage extends React.Component {
	render() {
		return (
			<div className="welcome">
						<div className=" cont1 text-center">


<h2 className="logo">  Welcome to Albanian Facebook </h2>
<p> <FontAwesomeIcon icon={faCamera} />  Share your moments with friends</p>
<p> <FontAwesomeIcon icon={faHeart} />  Like or unlike photos, posts, news </p>
<p> <FontAwesomeIcon icon={faComment} />  Make different comments to your friend photos, posts  </p>
<p> <FontAwesomeIcon icon={faUser} /> Make new friends </p>


</div>
</div>

			);
	}


}

export default Homepage;