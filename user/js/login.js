document.getElementById("genOtp").addEventListener("click", function () {
    let mobileNumber = document.getElementById("mobileNumber");
    let phError = document.getElementById("phError");

    if (/^[6789]\d{9}$/.test(mobileNumber.value)) {
        mobileNumber.classList.remove("border-danger");
        phError.classList.add("d-none");
        
        const fullPhoneNumber = `+91${mobileNumber.value}`; 
        localStorage.setItem("phoneNumber", fullPhoneNumber);

        fetch("http://localhost:8083/api/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber: fullPhoneNumber })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error || "Failed to generate OTP");
                });
            }
            
            document.getElementById("phNo").classList.add("d-none");
            document.getElementById("OtpIn").classList.remove("d-none");
        })
        .catch(error => {
            console.error("Error sending OTP:", error);
            phError.textContent = error.message || "Failed to send OTP. Try again.";
            phError.classList.remove("d-none");
        });
    } else {
        mobileNumber.classList.add("border-danger");
        phError.textContent = "Enter a valid 10-digit mobile number (starting with 6)})}7, 8, or 9).";
        phError.classList.remove("d-none");
    }
});

document.getElementById("verify").addEventListener("click", function () {
    let otp = document.getElementById("otp").value;
    let otpError = document.getElementById("otpError");
    let phoneNumber = localStorage.getItem("phoneNumber");

    if (/^\d{4,6}$/.test(otp)) {
        otpError.classList.add("d-none");
        
        fetch("http://localhost:8083/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber: phoneNumber, otp: otp })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error("Invalid OTP");
                });
            }
            return response.json();
        })
        .then(data => {
            
            localStorage.setItem("authToken", data.token);
            
            window.location.href = "/user/html/UserAccount.html";
        })
        .catch(error => {
            console.error("OTP verification failed:", error);
            otpError.textContent = "Invalid OTP. Please try again.";
            otpError.classList.remove("d-none");
        });
    } else {
        otpError.textContent = "Please enter a valid 4-6 digit OTP.";
        otpError.classList.remove("d-none");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("mobileNumber").focus();
});