
/**
* @param {string} userId id of the user in the url 
* @param {string} tokenkey token that is saved in localStorage
* @param {string} user data  that is on the State
* Update information method: make a http request to the server.
* we send the token and user to the backend 
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
* make the http request to the server to get all users from the db.
* and then take the server response.
* the response will be handeled and if there is an error we console log that error.
* else we will set State with the user data on the users emty array.
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