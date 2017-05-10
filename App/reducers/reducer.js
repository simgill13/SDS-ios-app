import {
 USER_DATA,
 EMAIL_IN_DB_TOGGLE,
 INCORRECT_EMAIL_PASSWORD,
 NEW_USER_CREATED,
 USER_LOGIN
} from '../actions/action';

const initialState = {
    name: '',
    email:'',
    emailInDb:false,
    newUserCreated:false,
    incorrectEmailOrPassword: false,
    userLogin: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case USER_DATA:
			return Object.assign({}, state, {
				name: action.name,
				email: action.email
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
      return {...state, userLogin: true, name: action.name }
	    default:
	        return state;
	}
}
