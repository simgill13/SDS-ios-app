import base64 from 'base-64';
import { Permissions, Notifications } from 'expo';

export const USER_DATA = 'USER_DATA';
export const userData = (userObj) => ({
  type: USER_DATA,
  userObj
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
export const userLogin = (userObj) => ({
  type: USER_LOGIN,
  userObj
})
export const CHANGE_LOGIN_BTN_STATE = 'CHANGE_LOGIN_BTN_STATE';
export const changeLoginBtnState = () => ({
  type: CHANGE_LOGIN_BTN_STATE,
})

// creating an async action to post a new user

export const loginUser = (email, password, navigator) => dispatch => {
  console.log("====Action EMAIL =====",email);
  const encodedLoginInfo = base64.encode(`${email.toLowerCase()}:${password}`)
  console.log("====Action encodedemail =====",encodedLoginInfo)
  return fetch(`https://sdsserver.herokuapp.com/api/users/${email}`, {
    headers: {
        "Authorization": "Basic " + encodedLoginInfo,
    }
  })
  .then(response => {
    console.log("====Action Response =====",response._bodyText);
    if(response._bodyText === 'Unauthorized'){
      console.log("====Action Denied =====")
      dispatch(changeLoginBtnState());
    }
    return response.json();
  })
  .then(json => {
    console.log('login action', json);
    dispatch(userLogin(json));
    navigator.push({
      id:"tab",
    });
  })
  .catch(err => {
    console.log(err);
    dispatch(incorrectEmailOrPassword());
  })
}

// change name
export const fetchUser = (name,email,password,token,navigator) => dispatch => {
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
          console.log('fetch Object', json)
          dispatch(userData(json))
          dispatch(NewuserCreated())
          navigator.push({
            id:"tab",
          });
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

export const UPDATE_ROOMS = 'UPDATE_ROOMS';
export const updateRooms = (data) => ({
  type: UPDATE_ROOMS,
  data
})

export const createRoom = (roomName, addedFriends, userId) => dispatch => {
  console.log(roomName, addedFriends, userId);
  fetch(`https://sdsserver.herokuapp.com/api/${userId}/room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      roomName,
      addedFriends
    })
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    dispatch(updateRooms(data));
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
