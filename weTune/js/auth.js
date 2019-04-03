$(function(){
    console.log("hello");
    const $signUpButton = $('#submit-sign-up');
    const $signUpUsername = $('#sign-up-username');
    const $signUpEmail = $('#sign-up-email');
    const $signUpPassword = $('#sign-up-password');

    function updateUser(credential){
        const userInfo = {
            displayName: $signUpUsername.value
        };
        credential.user.updateProfile(userInfo);
        authState(credential.user)
    }

    $signUpButton.onClick = createUser();

    const loginButton = $('#login-username');
    const loginEmail = $('#login-email');
    const loginPasword = $('#login-password')

    $loginButton.onClick = loginUser();

});

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
