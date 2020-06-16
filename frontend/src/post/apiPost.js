
/**
* @param {string} userId id of the user in the url 
* @param {string} tokenkey token that is saved in localStorage
* @param {string} post, we need to add new post
* create method: make a http request to the server.
* we send the token and post to the backend 
* take the response object from the server
* and return json response
*/
export const create = (userId, tokenkey, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokenkey}`
      },
      // no need to stringify, we have FormData
      body: post
  })
  .then(response => {
    return response.json()
  }).catch((err) =>{
        console.log(err)
    });
};


/**
* listpost method: get all post from the DB 
* make the http request to the server to get all posts from the db.
* and then take the server response.
* the response will be handeled and if there is an error we console log that error.
*/

export const listposts= ()=>{
  return fetch(`${process.env.REACT_APP_API_URL}/posts/`, {
    method: "GET",
  })
  .then(response => {
    return response.json()
  }).catch((err) =>{
        console.log(err)
    });
}


/**
* @param {string} postId id of the post  
* make the http request to the server to get single post from the db.
* and then take the server response.
* the response will be handeled and if there is an error we console log that error.
*/

export const singlepost= (postId)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "GET",
  })
  .then(response => {
    return response.json()
  }).catch((err) =>{
        console.log(err)
    });
}

/**
* @param {string} userId id of the user  
* @param {string} tokenkey token in the local Storage 
* make the http request to the server to get all posts from a specific user.
* then take the server response.
* the response will be handeled and if there is an error we console log that error.
*/

export const listbyuser= (userId, tokenkey)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenkey}`
      }
  })
 
  .then(response => {
    return response.json()
  }).catch((err) =>{
        console.log(err)
    });
}