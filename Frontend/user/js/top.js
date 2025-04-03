const accountLogo = document.getElementById("accountLogo");
const dropdownContent = document.getElementById("dropdownContent");
const logoutButton = document.getElementById("logoutButton");


if (accountLogo) {
    accountLogo.addEventListener("mouseenter", function () {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            dropdownContent.style.display = "block";
        }
    });
    
    accountLogo.addEventListener("mouseleave", function () {
        dropdownContent.style.display = "none";
    });

    
    accountLogo.addEventListener("click", function () {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            window.location.href = "/user/html/UserAccount.html";
        } else {
            window.location.href = "/user/html/login.html";
        }
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("phoneNumber");
        window.location.href = "/user/html/login.html";
    });
}