document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function() {
        let topButton = document.getElementById("topButton");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    };

    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // Phone number validation
    function validatePhoneNumber() {
        const phoneNumber = document.getElementById("phoneNumber").value;
        const phoneRegex = /^\+91\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert("Please enter a valid 10-digit phone number starting with 6-9.");
            return false;
        }
        return true;
    }

    // Attach the validatePhoneNumber function to the form's submit event
    document.querySelector("form").onsubmit = validatePhoneNumber;
});
