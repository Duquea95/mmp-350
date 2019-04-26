var temp = location.search.split('=')[1];
const uid = temp.split('&')[0];
const db = firebase.database();
const ref = db.ref('users').child(uid);

ref.on('value', updateUser);

const profileDisplayName = document.getElementById('profile-display-name');

function updateUser(snapshot) {
	const user = snapshot.val();
	profileDisplayName.textContent = user.displayName;
}

const editButton = document.getElementById('edit');
const editProfile = document.getElementById('profile-edit');
editButton.onclick = function() {
	editProfile.style.display = 'block';
};

// usernmae edit button
const profileUpdate = document.getElementById('profile-display-name-update');
profileUpdate.onclick = editUser;

function editUser() {
	const nameInput = document.getElementById('profile-display-name-edit');

	// test if nameInput.value, the text entered by user, is at least three characters long
	if (nameInput.value.length > 3) {
		// update the database if so
		ref.update({ displayName: nameInput.value });
		editProfile.style.display = 'none';
		nameInput.style.borderColor = 'gray';
	} else {
		// if not highlight the nameInput
		nameInput.placeholder = "Name needs at least 3 characters";
		nameInput.style.borderColor = 'red';
	}
}
