const signUpButton = document.getElementById('join-button');
const signUpFirstname = document.getElementById('sign-up-firstname');
const signUpLastname = document.getElementById('sign-up-lastname');
const signUpUsername = document.getElementById('sign-up-username');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');
const userBirthMonth = document.getElementById('birth-month');
const userBirthDay = document.getElementById('birth-day');
const userBirthYear = document.getElementById('birth-year');

// Create user
signUpButton.onclick = function createUser(){
    const email = signUpEmail.value;
    const password = signUpPassword.value;
    // const firstName = signUpFirstname;
    // const lastName = signUpLastname;
    // const email = signUpEmail;
    // const month = userBirthMonth;
    // const day = userBirthDay;
    // const year = userBirthYear;
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password);

    const promise = auth().createUserWithEmailAndPassword(email, password)

    promise.then(updateUser);

    promise.catch(function(error){
        console.log(this);
        alert("There was an error with creating a user");
    });

    // e.preventDefault();
}
// signUpButton.onclick = createUser();

function updateUser(credential) {
	const userInfo = {
		displayName: signupUsername.value
	};
	credential.user.updateProfile(userInfo);

	/* add to database */
	const db = firebase.database();
	const ref = db.ref('users').child(credential.user.uid);
	ref.update(userInfo);
}

const loginButton = document.getElementById('login-button');
const loginEmail = document.getElementById('login-email');
const loginPasword = document.getElementById('login-password');

loginButton.onclick = function loginUser(){
    const email = loginEmail.value;
    const password = loginPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password);
};
// loginButton.onclick = loginUser();

// auth State
const displayName = signUpUsername;

function authState(user) {
    if (user) {
        displayName.textContent = 'Hello, ' + user.displayName;

        document.getElementById('profile-link').href = "/mmp-350/weTune/user.html" + user.uid;

        document.body.classList.add('logged-in');

    } else {
        document.body.classList.remove('logged-in');
    }
}

firebase.auth().onAuthStateChanged(authState);

// Logout
const logoutButton = $('logout');
logoutButton.onClick = function(){
    firebase.auth.signOut();
}
