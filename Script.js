function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

function Recharge() {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const errorMessage = document.getElementById('error-message');
    const phoneNumber = phoneNumberInput.value;

    if (validatePhoneNumber(phoneNumber)) {
        localStorage.setItem('phoneNumber', phoneNumber);
        window.location.href = 'RechargePage.html';
    } else {
        errorMessage.textContent = 'Please enter a valid 10-digit phone number.';
        errorMessage.style.color = 'white';
    }
}

function displayPhoneNumber() {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const phoneNumberDisplay = document.getElementById('phone-number-display');
    phoneNumberDisplay.textContent = storedPhoneNumber ? `+91 ${storedPhoneNumber}` : '+91 XXXXXXXXXX';
}

function openPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function savePhoneNumber() {
    const editedPhoneNumber = document.getElementById('edit-phone-number').value;
    if (validatePhoneNumber(editedPhoneNumber)) {
        localStorage.setItem('phoneNumber', editedPhoneNumber);
        displayPhoneNumber();
        closePopup();
    } else {
        alert('Please enter a valid 10-digit phone number.');
    }
}

document.getElementById('recharge-button')?.addEventListener('click', Recharge);
document.getElementById('edit-button')?.addEventListener('click', openPopup);
document.getElementById('close-popup')?.addEventListener('click', closePopup);
document.getElementById('save-button')?.addEventListener('click', savePhoneNumber);

displayPhoneNumber();