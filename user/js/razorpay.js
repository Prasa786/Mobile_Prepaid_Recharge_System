document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:8083'; 
    const proceedToPayButton = document.getElementById('proceedToPay');
    const errorMessage = document.getElementById('editError');
    let userDetails = null; 
    let plan = JSON.parse(sessionStorage.getItem('selectedPlan')); 

    async function fetchUserDetails() {
        const token = sessionStorage.getItem("authToken"); 
        if (!token) {
            alert("You must be logged in to access this page.");
            window.location.href = "/user/html/login.html"; 
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/details`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }

            userDetails = await response.json(); 
            document.getElementById("phone-number-display").innerText = userDetails.phoneNumber; 
        } catch (error) {
            console.error("Error fetching user details:", error);
            alert("Error fetching user details. Please try again.");
        }
    }
    async function createRazorpayOrder(amount) {
        const token = sessionStorage.getItem("authToken"); 
        if (!token) {
            showError("You must be logged in to proceed with the payment.");
            return null;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/razorpay/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    mobileNumber: userDetails.phoneNumber, 
                    amount: amount
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const orderData = await response.json();
            return orderData;
        } catch (error) {
            console.error("Error creating order:", error);
            showError("Failed to create payment order. Please try again.");
            return null;
        }
    }
    function openRazorpayCheckout(orderData) {
        const options = {
            key: "rzp_test_1DP5mmOlF5G5ag", 
            amount: orderData.amount, 
            currency: orderData.currency || "INR",
            name: "Mobi Recharge",
            description: "Mobile Recharge Payment",
            order_id: orderData.order_id, 
            handler: function(response) {
                
                window.location.href = '/user/html/success.html'; 
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            },
            prefill: {
                name: userDetails.name || "User", 
                email: userDetails.email || "user@example.com", 
                contact: `+91${userDetails.phoneNumber}` 
            },
            theme: {
                color: "#42b4fa"
            }
        };
        const razorpayCheckout = new Razorpay(options);
        razorpayCheckout.open();
    }
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }
    function hideError() {
        errorMessage.classList.add('d-none');
    }
    proceedToPayButton.addEventListener('click', async function() {
        if (!plan) {
            showError("Please select a plan.");
            return;
        }
        hideError();
        const orderData = await createRazorpayOrder(plan.price * 100); 

        if (orderData) {
            openRazorpayCheckout(orderData);
        }
    });
    fetchUserDetails();
});