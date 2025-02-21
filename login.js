document.getElementById("genOtp").addEventListener("click", function () {
    let mobileNumber = document.getElementById("mobileNumber");
    let phError = document.getElementById("phError");
    
    if (/^\d{10}$/.test(mobileNumber.value)) {
        mobileNumber.classList.remove("border-danger");
        phError.classList.add("d-none");

        document.getElementById("phNo").classList.add("d-none");
        document.getElementById("OtpIn").classList.remove("d-none");
    } else {
        mobileNumber.classList.add("border-danger");
        phError.classList.remove("d-none");
    }
});

document.getElementById("verify").addEventListener("click", function () {
    let otp = document.getElementById("otp").value;
    if (otp) {
        window.location.href = "UserAccount.html";
    } else {
        alert("Please enter a valid OTP.");
    }
});