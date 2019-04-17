$(function(){
    console.log("hello");

        const signUpButton = $('.join-button');
        const signUpFirstname = $('#sign-up-firstname');
        const signUpLastname = $('#sign-up-lastname');
        const signUpEmail = $('#sign-up-email');
        const signUpPassword = $('#sign-up-password');
        const userBirthMonth = $('#birth-month');
        const userBirthDay = $('#birth-day');
        const userBirthYear = $('#birth-year');

        // Create user
        function createUser(){
            const email = signUpEmail;
            // const firstName = signUpFirstname;
            // const lastName = signUpLastname;
            const password = signUpPassword;
            // const email = signUpEmail;
            // const month = userBirthMonth;
            // const day = userBirthDay;
            // const year = userBirthYear;

            firebase.auth().createUserWithEmailAndPassword(email, password);

            const promise = auth.createUserWithEmailAndPassword(email, passwords)

            promise.then(updateUser);

            promise.catch(function(error){
                console.log(this);
                alert("There was an error with creating a user");
            });
        }

        function updateUser(credential){
            const userInfo = {
                displayName: signUpEmail.value
            };
            credential.user.updateProfile(userInfo);
            authState(credential.user)
        }

        signUpButton.onClick = createUser();

        const loginButton = $('.login-button');
        const loginEmail = $('#login-email');
        const loginPasword = $('#login-password')
        function loginUser(){
            const email = loginEmail.value
            const password = loginPassword.value

            firebase.auth().signInWithEmailAndPassword(email, password);
        }

        loginButton.onClick = loginUser();

        // auth State
        const displayName = $('#display-name');
        function authState(user){
            if(user){
                // console.log(user);
                $('body').addClass('logged-in');
                displayName.text("Hello, "+ username);
            }
        }

        firebase.auth().onAuthStateChanged(authState);

        // Logout
        const logoutButton = $('#logout');
        logoutButton.onClick = function(){
            firebase.auth.signOut();
        }
});
