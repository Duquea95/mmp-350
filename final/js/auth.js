/*
	deals with all authentication events in the application
	sign up is for creating new user
	log in handles log in
	auth state is whenever the auth state changes
	- this happens when user logs in, signs up, or just refreshes page
	- this displays user name and adds profile link, if user is in database and authenticated
	log out handles log out

	each of these sections could be separated into separate files
*/

/* sign up */
const signupButton = document.getElementById('submit-sign-up');
const signupUsername = document.getElementById('sign-up-username');
const signupEmail = document.getElementById('sign-up-email');
const signupPassword = document.getElementById('sign-up-password');

function updateUser(credential) {
	const userInfo = {
		displayName: signupUsername.value
	};
	credential.user.updateProfile(userInfo);
	authState(credential.user);

	/* add user to database */
	const db = firebase.database();
	const ref = db.ref('users').child(credential.user.uid);
	ref.set(userInfo);
}

function createUser() {
	const email = signupEmail.value;
	const password = signupPassword.value;
	const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
	promise.then(updateUser);
	promise.catch(function(error) {
		console.log(error);
		alert(error.message);
	});
}

signupButton.onclick = createUser;


/* log in */
const loginButton = document.getElementById('submit-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginButton.onclick = function() {
	const email = loginEmail.value;
	const password = loginPassword.value;
	firebase.auth().signInWithEmailAndPassword(email, password);
};

/* auth state */
const displayName = document.getElementById('display-name');
const profileLink = document.getElementById('profile-link');
const menu = document.getElementById('menu');


function authState(user) {
	if (user) {
		document.body.classList.add('logged-in');
		menu.classList.remove('hide');
		displayName.textContent = 'Hello, ' + user.displayName;
		profileLink.href = '/user.html?uid=' + user.uid;
	} else {
		menu.classList.add('hide');
		document.body.classList.remove('logged-in');

	}
}

firebase.auth().onAuthStateChanged(authState);

/* log out */
const logoutButton = document.getElementById('logout');
logoutButton.onclick = function() {
	firebase.auth().signOut();
};
