function Recharge() {
    const phoneNumberInput = document.getElementById('phoneNumber');
    const errorMessage = document.getElementById('error-message');
    const phoneNumber = phoneNumberInput.value;

    if (isEmpty(phoneNumber)) {
        errorMessage.textContent = 'Please enter a valid 10-digit phone number.';
        errorMessage.style.color = 'red';
        return;
    }

    if (/^[6789]\d{9}$/.test(phoneNumber)) {
        sessionStorage.setItem('phoneNumber', phoneNumber);
        window.location.href = 'RechargePage.html';
    } else {
        errorMessage.textContent = 'Please enter a valid 10-digit phone number.';
        errorMessage.style.color = 'red';
    }
}

function isEmpty(value) {
    return !value || value.trim().length === 0;
}

function displayPhoneNumber() {
    const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
    const phoneNumberDisplay = document.getElementById('phone-number-display');
    phoneNumberDisplay.textContent = storedPhoneNumber ? `+91 ${storedPhoneNumber}` : 'Enter Number';
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
    if (/^[6789]\d{9}$/.test(editedPhoneNumber)) {
        sessionStorage.setItem('phoneNumber', editedPhoneNumber); // Store in sessionStorage
        displayPhoneNumber();
        closePopup();
    } else {
        document.getElementById('editError').classList.remove("d-none");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let carousel = new bootstrap.Carousel(document.getElementById("testimonialCarousel"), {
        interval: 5000,
        wrap: true
    });
});

document.getElementById('recharge-button')?.addEventListener('click', Recharge);
document.getElementById('edit-button')?.addEventListener('click', openPopup);
document.getElementById('close-popup')?.addEventListener('click', closePopup);
document.getElementById('save-button')?.addEventListener('click', savePhoneNumber);

displayPhoneNumber();