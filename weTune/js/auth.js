$(function(){
	const signUpButton = document.getElementById('join-button');
	const signUpFirstname = document.getElementById('sign-up-firstname');
	const signUpLastname = document.getElementById('sign-up-lastname');
	const signUpUsername = document.getElementById('sign-up-username');
	const signUpEmail = document.getElementById('sign-up-email');
	const signUpPassword = document.getElementById('sign-up-password');
	const userBirthMonth = document.getElementById('birth-month');
	const userBirthDay = document.getElementById('birth-day');
	const userBirthYear = document.getElementById('birth-year');
	$main = $("main");

	function updateUser(credential) {
		const userInfo = {
			displayName: signupUsername.value
		};
		credential.user.updateProfile(userInfo);
	    authState(credential.user)

		/* add to database */
		const db = firebase.database();
		const ref = db.ref('users').child(credential.user.uid);
		ref.update(userInfo);
	}

	// Create user
	signUpButton.click = function(){
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

	    const promise = firebase.auth().createUserWithEmailAndPassword(email, password)

	    promise.then(updateUser);

	    promise.catch(function(error){
	        console.log(error);
	        alert(error.message);
	    });
	}

	const loginButton = document.getElementById('login-button');
	const loginEmail = document.getElementById('login-email');
	const loginPasword = document.getElementById('login-password');

	loginButton.click = function(){
	    const email = loginEmail.value;
	    const password = loginPassword.value;

	    firebase.auth().signInWithEmailAndPassword(email, password);
	};

	// auth State
	const displayName = document.getElementById('display-name')
	const profileLink = document.getElementById("profile-link");

	function authState(user) {
	    if (user) {
			// document.preventDefault();
	        console.log("ok");
			$(".main-container").css("display", "none");
			$(".info-container").css("display", "none");
			$("form").css("display", "none");
			$(".dropdown").css("display", "flex");
			$(".news-feed").css("display", "block");
			$(".search-container").css("display", "block");
			$(".grid-container").css("grid-template-rows", "53px 1fr 40px");
			$(".nav-container").css("grid-template-columns", "20% 40% auto%");
			$main.css({"grid-template-areas": "'feed'","grid-template-rows": "auto"});
			$(".drop-btn").css("display", "block");
			// document.body.classList.add('logged-in');
	        // displayName.textContent = 'Hello, ' + user.displayName;
			profileLink.href = '/user.html?uid=' + user.uid

	        // document.getElementById('profile-link').href = "/mmp-350/weTune/profile.html" + user.uid;

	        document.body.classList.add('logged-in');

	    } else {
	        document.body.classList.remove('logged-in');
	    }
	}

	firebase.auth().onAuthStateChanged(authState);

	// Logout
	const logoutButton = document.getElementById('logout');
	logoutButton.click = function(){
	    firebase.auth.signOut();
	}
});
