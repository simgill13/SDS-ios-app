import {

} from '../actions/action';

const initialState = {
    name: 'TestFromReducer',
    email:'',   
}

export default (state = initialState, action) => {
	switch(action.type) {
	   	
	    default:
	        return state;
	}
}
