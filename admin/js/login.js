const apiBaseUrl = "http://localhost:8083/api";


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Error: Login form not found!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (!usernameInput || !passwordInput) {
            console.error("Error: Username or Password input fields not found!");
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        
        if (!username || !password) {
            if (!username) {
                document.getElementById("usernameError").classList.remove("d-none");
                usernameInput.classList.add("is-invalid");
            }
            if (!password) {
                document.getElementById("passwordError").classList.remove("d-none");
                passwordInput.classList.add("is-invalid");
            }
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/auth/login-admin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }) 
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Login failed");

            
            localStorage.setItem("adminToken", data.token);

            
            document.querySelector(".toast-body").textContent = "Login successful! Redirecting to dashboard...";
            $('#toast').toast('show'); 

            
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } catch (error) {
            console.error("Login error:", error);
            document.getElementById("incorrectFeedback").style.display = "block"; 
        }
    });

    
    const passwordContainer = document.querySelector(".password-container");
    if (passwordContainer) {
        passwordContainer.addEventListener("click", function (event) {
            if (event.target.matches('.fa-eye, .fa-eye-slash')) {
                const passwordField = document.getElementById("password");
                const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
                passwordField.setAttribute("type", type);
                event.target.classList.toggle("fa-eye-slash");
            }
        });
    }

    
    const usernameInput = document.getElementById("username");
    if (usernameInput) {
        usernameInput.addEventListener("input", function () {
            if (this.value.trim() !== '') {
                this.classList.remove("is-invalid");
                document.getElementById("usernameError").classList.add("d-none");
            }
        });
    }

    const passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.addEventListener("input", function () {
            if (this.value.trim() !== '') {
                this.classList.remove("is-invalid");
                document.getElementById("passwordError").classList.add("d-none");
            }
        });
    }
});