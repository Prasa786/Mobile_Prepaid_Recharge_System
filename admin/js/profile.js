document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const addressError = document.getElementById('addressError');

    let isValid = true;

    
    if (fullName.value.trim() === '') {
        fullName.classList.add('is-invalid');
        fullNameError.classList.remove('d-none');
        isValid = false;
    } else {
        fullName.classList.remove('is-invalid');
        fullNameError.classList.add('d-none');
    }

    
    if (email.value.trim() === '' || !validateEmail(email.value)) {
        email.classList.add('is-invalid');
        emailError.classList.remove('d-none');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        emailError.classList.add('d-none');
    }

    
    if (address.value.trim() === '') {
        address.classList.add('is-invalid');
        addressError.classList.remove('d-none');
        isValid = false;
    } else {
        address.classList.remove('is-invalid');
        addressError.classList.add('d-none');
    }

    
    if (isValid) {
        alert('Profile updated successfully!');
        
    }
});

document.getElementById('changePasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmNewPassword = document.getElementById('confirmNewPassword');
    const currentPasswordError = document.getElementById('currentPasswordError');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmNewPasswordError = document.getElementById('confirmNewPasswordError');

    let isValid = true;

    
    if (currentPassword.value.trim() === '') {
        currentPassword.classList.add('is-invalid');
        currentPasswordError.classList.remove('d-none');
        isValid = false;
    } else {
        currentPassword.classList.remove('is-invalid');
        currentPasswordError.classList.add('d-none');
    }

    
    if (newPassword.value.trim() === '') {
        newPassword.classList.add('is-invalid');
        newPasswordError.classList.remove('d-none');
        isValid = false;
    } else {
        newPassword.classList.remove('is-invalid');
        newPasswordError.classList.add('d-none');
    }

    
    if (confirmNewPassword.value.trim() !== newPassword.value.trim()) {
        confirmNewPassword.classList.add('is-invalid');
        confirmNewPasswordError.classList.remove('d-none');
        isValid = false;
    } else {
        confirmNewPassword.classList.remove('is-invalid');
        confirmNewPasswordError.classList.add('d-none');
    }

    
    if (isValid) {
        alert('Password changed successfully!');
        
    }
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


const modal = document.getElementById("changePasswordModal");
const btn = document.getElementById("changePasswordBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}