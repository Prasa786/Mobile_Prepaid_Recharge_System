document.getElementById('profileForm').addEventListener('submit', async function (e) {
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
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = "/admin/html/index.html"; 
            throw new Error("No token found in localStorage. Please log in again.");
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const profileData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            address: address.value.trim()
        };

        try {
            const response = await fetch('http://localhost:8083/api/profile', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
            }

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    }
});

document.getElementById('changePasswordForm').addEventListener('submit', async function (e) {
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
        const token = localStorage.getItem('adminToken'); 
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const passwordData = {
            currentPassword: currentPassword.value.trim(),
            newPassword: newPassword.value.trim()
        };

        try {
            const response = await fetch('http://localhost:8083/api/change-password', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(passwordData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to change password: ${response.status} - ${errorText}`);
            }

            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please try again.');
        }
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}