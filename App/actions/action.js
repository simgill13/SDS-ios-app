export const USER_DATA = 'USER_DATA';
export const userData = (name,email,password) => ({
  type: USER_DATA,
  name,
  email,
  password
})



// creating an async action to post a new user 


