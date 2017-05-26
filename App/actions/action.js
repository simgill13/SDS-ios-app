import base64 from 'base-64';
import { Permissions, Notifications } from 'expo';

export const USER_DATA = 'USER_DATA';
export const userData = (userObj) => ({
  type: USER_DATA,
  userObj,
})

export const EMAIL_IN_DB_ON = 'EMAIL_IN_DB_ON';
export const EmailInDbOn = () => ({
  type: EMAIL_IN_DB_ON,
})

export const EMAIL_IN_DB_OFF = 'EMAIL_IN_DB_OFF';
export const EmailInDbOff = () => ({
  type: EMAIL_IN_DB_OFF,
})

export const NEW_USER_CREATED = 'NEW_USER_CREATED';
export const NewUserCreated = () => ({
  type: NEW_USER_CREATED,
})

export const INCORRECT_EMAIL_PASSWORD = 'INCORRECT_EMAIL_PASSWORD';
export const incorrectEmailOrPassword = () => ({
  type: INCORRECT_EMAIL_PASSWORD,
})

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (userObj) => ({
  type: USER_LOGIN,
  userObj,
})

export const SPINNER_ON = 'SPINNER_ON';
export const spinnerOn = () => ({
  type: SPINNER_ON,
})

export const SPINNER_OFF = 'SPINNER_OFF';
export const spinnerOff = () => ({
  type: SPINNER_OFF,
})

export const LOGIN_ERROR_TRUE = 'LOGIN_ERROR_TRUE';
export const LoginErrorTrue = () => ({
  type: LOGIN_ERROR_TRUE,
})

export const LOGIN_ERROR_FALSE = 'LOGIN_ERROR_FALSE';
export const LoginErrorFalse = () => ({
  type: LOGIN_ERROR_FALSE,
})

export const loginUser = (email, password, navigator) => dispatch => {
  const encodedLoginInfo = base64.encode(`${email.toLowerCase()}:${password}`)
  return fetch(`https://sdsserver.herokuapp.com/api/users/${email}`, {
    headers: {
        "Authorization": "Basic " + encodedLoginInfo,
    }
  })
  .then(response => {
    if(response.status === 401 || response.status === 404){
      dispatch(LoginErrorTrue());
      dispatch(spinnerOff());
    }
    return response.json();
  })
  .then(json => {
    dispatch(LoginErrorFalse());
    dispatch(spinnerOff());
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

export const createUser = (name,email,password,token,navigator) => dispatch => {
    fetch('https://sdsserver.herokuapp.com/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password,token})
    })
    .then(response => response.json())
    .then(json => {
      if (json.message === "email already taken") {
        dispatch(EmailInDbOn());
      } else {
          dispatch(userData(json))
          dispatch(NewUserCreated())
          navigator.push({
            id:"tab",
          });
      }
    })
    .catch(err => {
      console.log(err);
    })
    dispatch(spinnerOff());
}

export const registerForPushNotificationsAsync = () => dispatch => {
  dispatch(spinnerOn());
  return Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)
  .then(status => {
    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
      dispatch(spinnerOff());
      return;
    }
  })
  .then(() => {
    // Get the token that uniquely identifies this device
    return Notifications.getExponentPushTokenAsync()
    .then(token => {
      dispatch(spinnerOff());
      return token;
    })
  })
}

export const sendNotification = (deviceId, message) => dispatch => {
  dispatch(spinnerOn());
  fetch('https://sdsserver.herokuapp.com/api/notification/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({deviceId, message})
  })
  .then(response => {
    return response.json();
  })
  .catch(err => {
    console.log(err);
  })
  dispatch(spinnerOff());
}

export const UPDATE_ROOMS = 'UPDATE_ROOMS';
export const updateRooms = (data) => ({
  type: UPDATE_ROOMS,
  data
})

export const createRoom = (roomName, addedFriends, userId, navigator) => dispatch => {
  dispatch(spinnerOn());
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
    let numChatId = data.rooms[data.rooms.length - 1];
    // navigator.push({
		// 	id:"chatroom",
    //   data: numChatId
		// })
    addedFriends.forEach((friend) => {
      dispatch(addUserToRoom(data.rooms[data.rooms.length - 1]._id, friend._id))
    })
    return data;
  })
  .then((data) => {
    dispatch(updateRooms(data));
  })
  .catch(err => {
    console.log('errored', err);
  })
  dispatch(spinnerOff());
}

export const addUserToRoom = (roomId, userId) => dispatch => {
  fetch(`https://sdsserver.herokuapp.com/api/room/${roomId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currentUserId: userId,
    })
  })
  .then((response) => {
    // console.log(response)
  })
  .catch(err => {
    console.log(err);
  })
}

export const SEARCHED_USERS = 'SEARCHED_USERS';
export const searchedUsers = (data) => ({
  type: SEARCHED_USERS,
  data,
})

export const searchUsers = (query) => dispatch => {
  dispatch(spinnerOn());
  fetch('https://sdsserver.herokuapp.com/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
    })
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    dispatch(searchedUsers(data));
    dispatch(spinnerOff());
  })
  .catch(err => {
    console.log(err);
  })
}

export const ADDED_FRIEND = 'ADDED_FRIEND';
export const addedFriend = (data) => ({
  type: ADDED_FRIEND,
  data
})

export const addFriend = (userId, friendId) => dispatch => {
  fetch(`https://sdsserver.herokuapp.com/api/${friendId}/friends/${userId}`, (req, res) => {
    method: 'POST'
  })
  return fetch(`https://sdsserver.herokuapp.com/api/${userId}/friends/${friendId}`, {
    method: 'POST'
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    dispatch(addedFriend(data));
  })
  .catch(err => {
    console.log(err);
  })
}
