
/**
 * IsAuthenticated method: check if the user is authenticated.
 * If token does not exists in the localStorage the user is not authenticated so return false.
 * If exists get he token and parse it on JSON format.  
*/
export const isAuthenticated = () => {
  
  if(typeof window == "undefined"){
    return false
  }
  if(localStorage.getItem("tokenkey")){
    return JSON.parse(localStorage.getItem("tokenkey"))   
  }
  else {
    return false
  }
}; 