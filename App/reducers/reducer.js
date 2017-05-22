import {
 USER_DATA,
 EMAIL_IN_DB_TOGGLE,
 INCORRECT_EMAIL_PASSWORD,
 NEW_USER_CREATED,
 USER_LOGIN,
 UPDATE_ROOMS
} from '../actions/action';

const initialState = {
    name: '',
    email:'',
    friendsList: [],
    userId: '',
    deviceToken: '',
    rooms: [],
    emailInDb:false,
    newUserCreated:false,
    incorrectEmailOrPassword: false,
    userLogin: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case USER_DATA:
      console.log('userObj', action.userObj)
			return Object.assign({}, state, {
				name: action.userObj.name,
				email: action.userObj.email,
        friendsList: action.userObj.friendsList,
        userId: action.userObj.id,
        deviceToken: action.userObj.deviceToken,
        rooms: action.userObj.rooms
			});
		case EMAIL_IN_DB_TOGGLE:
			return Object.assign({}, state, {
				emailInDb: true
			});
    case INCORRECT_EMAIL_PASSWORD:
      return {...state, incorrectEmailOrPassword: true }
		case NEW_USER_CREATED:
			return Object.assign({}, state, {
				newUserCreated: true
			});
    case USER_LOGIN:
      console.log('userObj', action.userObj);
      return {...state,
        userLogin: true,
        name: action.name,
        email: action.userObj.email,
        friendsList: action.userObj.friendsList,
        userId: action.userObj.id,
        deviceToken: action.userObj.deviceToken,
        rooms: action.userObj.rooms
      }
    case UPDATE_ROOMS:
      console.log(action.data);
      return {
        ...state,
        rooms: [...state.rooms, action.data]
      }
	    default:
	        return state;
	}
}
