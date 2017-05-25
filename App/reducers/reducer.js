import {
  USER_DATA,
  EMAIL_IN_DB_ON,
  EMAIL_IN_DB_OFF,
  INCORRECT_EMAIL_PASSWORD,
  NEW_USER_CREATED,
  USER_LOGIN,
  UPDATE_ROOMS,
  LOGIN_ERROR_TRUE,
  LOGIN_ERROR_FALSE,
  SEARCHED_USERS,
  ADDED_FRIEND,
  SPINNER_ON,
  SPINNER_OFF,
} from '../actions/action';

const initialState = {
  name: '',
  email:'',
  friendsList: [],
  userId: '',
  deviceToken: '',
  rooms: [],
  emailInDb: false,
  newUserCreated: false,
  incorrectEmailOrPassword: false,
  userLogin: false,
  LoginButtonError: false,
  activityIndicator: false,
  searchedUsers: [],
  spinner: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case USER_DATA:
      return {...state,
				name: action.userObj.name,
				email: action.userObj.email,
        friendsList: action.userObj.friendsList,
        userId: action.userObj.id,
        deviceToken: action.userObj.deviceToken,
        rooms: action.userObj.rooms,
			};
    case SEARCHED_USERS:
      return {...state, searchedUsers: action.data}
    case ADDED_FRIEND:
      return {...state, friendsList: action.data.friendsList}
		case EMAIL_IN_DB_ON:
			return {...state, emailInDb: true}
    case EMAIL_IN_DB_OFF:
      return {...state, emailInDb: false}
    case INCORRECT_EMAIL_PASSWORD:
      return {...state, incorrectEmailOrPassword: true }
		case NEW_USER_CREATED:
      return {...state, newUserCreated: true }
    case USER_LOGIN:
      return {...state,
        userLogin: true,
        name: action.userObj.name,
        email: action.userObj.email,
        friendsList: action.userObj.friendsList,
        userId: action.userObj.id,
        deviceToken: action.userObj.deviceToken,
        rooms: action.userObj.rooms
      }
    case UPDATE_ROOMS:
      return {...state, rooms: [...state.rooms, action.data.rooms[action.data.rooms.length - 1]]}
    case LOGIN_ERROR_TRUE:
      return {...state, LoginButtonError: true}
    case LOGIN_ERROR_FALSE:
      return {...state, LoginButtonError: false}
    case SPINNER_ON:
      return {...state, spinner: true}
    case SPINNER_OFF:
      return {...state, spinner: false}
    default:
      return state;
	}
}
