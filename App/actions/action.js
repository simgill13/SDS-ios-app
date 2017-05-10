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

// creating an async action to post a new user 



export const fetchUser = (name,email,password) => dispatch => {
    console.log("fetching user data...");
    fetch(`https://sdsserver.herokuapp.com/api/users/${email}`) 
    .then(response => response.json())
    .then(json => {
    	console.log(json)
    	console.log(json.message)
	    if (json.message == "Email not found in database") {
	      	console.log(`....Sorry, no document in DB relates to ${email}`);
	      	console.log('...soo,going to post a new user to the DB now ...');
	    	fetch('https://sdsserver.herokuapp.com/api/users', {
        		method: 'POST',
        		headers: {
            	'Content-Type': 'application/json'
        		},
        		body: JSON.stringify({name,email,password})
    		})
    		.then(response => response.json())
    		.then(json => {
    			console.log('...I have posted this user')
      			console.log(json)
      			dispatch(userData(json.name,json.email))
      			dispatch(NewuserCreated())
      		})
	    }
      	else if (json !== null){
      		console.log(`User ${email} was found in the USER DB`)
      		console.log(json)
      	dispatch(EmailInDbToggle())
      	}
    })
}