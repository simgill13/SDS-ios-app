import base64 from 'base-64';

export const USER_DATA = 'USER_DATA';
export const userData = (name,email) => ({
  type: USER_DATA,
  name,
  email,
})

export const EMAIL_IN_DB_TOGGLE = 'EMAIL_IN_DB_TOGGLE';
export const EmailInDbToggle = () => ({
  type: EMAIL_IN_DB_TOGGLE,
})
export const NEW_USER_CREATED = 'NEW_USER_CREATED';
export const NewuserCreated = () => ({
  type: NEW_USER_CREATED,
})

export const INCORRECT_EMAIL_PASSWORD = 'INCORRECT_EMAIL_PASSWORD';
export const incorrectEmailOrPassword = () => ({
  type: INCORRECT_EMAIL_PASSWORD,
})

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (name) => ({
  type: USER_LOGIN,
  name
})

// creating an async action to post a new user

export const loginUser = (email, password, navigator) => dispatch => {
  const encodedLoginInfo = base64.encode(`${email.toLowerCase()}:${password}`)
  console.log(encodedLoginInfo)
  return fetch(`https://sdsserver.herokuapp.com/api/users/${email}`, {
    headers: {
        "Authorization": "Basic " + encodedLoginInfo,
    }
  })
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(json => {
    console.log(json);
    dispatch(userLogin(json.name));
    navigator.push({
      id:"homeloggedin",
    });
  })
  .catch(err => {
    console.log(err);
    dispatch(incorrectEmailOrPassword());
  })
}

export const fetchUser = (name,email,password) => dispatch => {
    console.log("fetching user data...");
    fetch('https://sdsserver.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    })
    .then(response => response.json())
    .then(json => {
      if (json.message === "email already taken") {
        dispatch(EmailInDbToggle());
      } else {
        console.log('...I have posted this user')
          console.log(json)
          dispatch(userData(json.name,json.email))
          dispatch(NewuserCreated())
      }
    })
    .catch(err => {
      console.log(err);
    })
}
