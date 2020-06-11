/**
 * GetUser information method: make a http request to the server.
 * take the response object from the server
 * and return json response
*/
export const readuserdata = (userId, tokenkey) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
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
};

/**
 * Update information method: make a http request to the server.
 * take the response object from the server
 * and return json response
*/
export const update = (userId, tokenkey, user) => {
  console.log("USER PROFILE HAS CHANGED", user)
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokenkey}`
      },
      body: user
  })
  .then(response => {
    return response.json()
  }).catch((err) =>{
        console.log(err)
    });
};

/**
 * Delete user Account method: make a http request to the server.
 * take the response object from the server
 * and return json response
*/
export const remove = (userId, tokenkey) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "DELETE",
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

/**
* make the http request to the server to get all users from the db.
* and then take the server response.
* the response will be handeled and if there is an error we console log that error.
* else we will set State with the user data on the users emty array.
*/

export const listusers= ()=>{
  return fetch(`${process.env.REACT_APP_API_URL}/users/`, {
    method: "GET",
  })
  .then(response => {
    return response.json()
  }).catch((err) =>{
        console.log(err)
    });
}

/**
* updateUser method: update user in the local storage.
* First check if token exists in the localStorage, so the user is authenticated.
* then check if the token key is given and get the localStorage infos and upadate the user
* than set the updated user to the localStorage  
*/
export const updateUser = (user, next) => {
  
  if(typeof window !== "undefined"){
  
    if(localStorage.getItem("tokenkey")){

      // get infos from localstorage
      let auth =  JSON.parse(localStorage.getItem("tokenkey"))   
      
      auth.user = user
      //set to the local storage
      localStorage.setItem("tokenkey", JSON.stringify(auth))
      next(); 
    }
  }
}; 