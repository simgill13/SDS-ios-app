import base64 from 'base-64';
import { Permissions, Notifications } from 'expo';

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
  console.log(email);
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
      id:"tab",
    });
  })
  .catch(err => {
    console.log(err);
    dispatch(incorrectEmailOrPassword());
  })
}

export const fetchUser = (name,email,password,token) => dispatch => {
    console.log("fetching user data...");
    console.log("token...", token);
    fetch('https://sdsserver.herokuapp.com/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password,token})
    })
    .then(response => response.json())
    .then(json => {
      console.log('json: ', json);
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

export const registerForPushNotificationsAsync = () => dispatch => {
  return Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)
  .then(status => {
    console.log('status: ', status);
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      return;
    }
  })
  .then(() => {
    // Get the token that uniquely identifies this device
    return Notifications.getExponentPushTokenAsync()
    .then(token => {
      console.log('token (from action): ', token);
      return token;
    })
  })
}


export const sendNotification = (deviceId, message) => dispatch => {
  fetch('https://sdsserver.herokuapp.com/api/notification/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({deviceId, message})
  })
  .then(response => {
    console.log(response);
    return response.json();
  })
  .catch(err => {
    console.log(err);
  })
}

// export const postingCameraPic = (picuri) => dispatch => {
//     console.log("posting pic...");
//     console.log("picuri...", picuri);
//     var photo = {
//       uri: picuri,
//       type: 'image/jpeg',
//       name: 'photo.jpg',
//     };

//     var body = new FormData();
//     // body.append('authToken', 'secret');
//     body.append('photo', photo);
//     body.append('title', 'A beautiful photo!');

//     xhr.open('POST', 'http://localhost:8080/api/camera');
//     xhr.send(body);
//     // .then(response => console.log(response))
//     // .catch(err => {
//     //   console.log(err);
//     // })
// }














