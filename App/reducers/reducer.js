import {
 USER_DATA,
 EMAIL_IN_DB_TOGGLE,
 NEW_USER_CREATED
} from '../actions/action';

const initialState = {
    name: '',
    email:'',
    emailInDb:false,
    newUserCreated:false,   
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
		case NEW_USER_CREATED:
			return Object.assign({}, state, {
				newUserCreated: true	
			});
	    default:
	        return state;
	}
}
