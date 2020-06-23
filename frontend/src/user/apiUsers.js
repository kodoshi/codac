/**
 * GetUser information method: make a http request to the server.
 * we send the token to the backend
 * take the response object from the server
 * and return json response
 *
 * @param {string} userId id of the user in the url
 * @param {string} tokenkey token that is saved in localStorage.
 * @returns {json} response.json
 */
export const readuserdata = (userId, tokenkey) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenkey}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Update information method: make a http request to the server.
 * we send the token and user to the backend
 * take the response object from the server
 * and return json response
 *
 * @param {string} userId id of the user in the url
 * @param {string} tokenkey token that is saved in localStorage
 * @param {string} user data  that is on the State
 * @returns {json} response.json
 */
export const update = (userId, tokenkey, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokenkey}`,
    },
    // no need to stringify, we have FormData
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Delete user Account method: make a http request to the server.
 * we send the token to the backend
 * take the response object from the server
 * and return json response
 *
 * @param {string} userId id of the user in the url
 * @param {string} tokenkey token that is saved in localStorage
 * @returns {json} response.json
 */
export const remove = (userId, tokenkey) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenkey}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * make the http request to the server to get all users from the db.
 * and then take the server response.
 * the response will be handeled and if there is an error we console log that error.
 * else we will set State with the user data on the users emty array.
 *
 * @returns {json} response.json
 */

export const listusers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * updateUser method: update user in the local storage.
 * First check if token exists in the localStorage, so the user is authenticated.
 * then check if the token key is given and get the localStorage infos and upadate the user
 * than set the updated user to the localStorage
 *
 * @param {string} user object that is saved in the localStorage
 * @param {object} next allows the method to go to the next middleware
 */
export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("tokenkey")) {
      // get infos from localstorage
      let auth = JSON.parse(localStorage.getItem("tokenkey"));
      //update the user property of tokenkey
      auth.user = user;
      //set to the local storage the updated userS
      localStorage.setItem("tokenkey", JSON.stringify(auth));
      next();
    }
  }
};

/**
 * follow method: make a http request to the server.
 * we send the token , userid and followid to the backend
 * take the response object from the server
 * and return json response
 *
 * @param {string} userId id of the user in the url
 * @param {string} tokenkey token that is saved in localStorage
 * @param {string} followId followed user id
 * @returns {json} response.json
 */
export const follow = (userId, tokenkey, followId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenkey}`,
    },
    body: JSON.stringify({ userId, followId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * unfollow method: make a http request to the server.
 * we send the token , userid and unfollowid to the backend
 * take the response object from the server
 * and return json response
 *
 * @param {string} userId id of the user in the url
 * @param {string} tokenkey token that is saved in localStorage
 * @param {string} unfollowId unfollowed user id
 * @returns {json} response.json
 */
export const unfollow = (userId, tokenkey, unfollowId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenkey}`,
    },
    body: JSON.stringify({ userId, unfollowId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * findpeople method: make a http request to the server.
 * we send the token , userid to the backend
 * take the response object from the server
 * and return json response
 *
 * @param {string} userId id of the user in the url
 * @param {string} tokenkey token that is saved in localStorage
 * @returns {json} response.json
 */
export const findPeople = (userId, tokenkey) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/tofollow/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenkey}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
