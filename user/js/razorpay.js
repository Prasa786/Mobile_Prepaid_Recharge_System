document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:8083'; 

    
    const proceedToPayButton = document.getElementById('proceedToPay');
    const errorMessage = document.getElementById('editError');

    
    const mobileNumber = localStorage.getItem('phoneNumber');
    const plan = JSON.parse(localStorage.getItem('selectedPlan'));

    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }

    
    function hideError() {
        errorMessage.classList.add('d-none');
    }

    
    async function createRazorpayOrder(mobileNumber, planId, amount) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/razorpay/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobileNumber: mobileNumber,
                    planId: planId,
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
            key: orderData.razorpay_key_id,
            amount: orderData.amount,
            currency: orderData.currency || "INR",
            name: "Your Transaction",
            description: "Mobile Recharge Payment",
            order_id: orderData.order_id,
            prefill: {
                name: "",
                email: "user@example.com", 
                contact: `+91${mobileNumber}`
            },
            handler: function(response) {
                
                console.log("Payment successful:", response);
                
                window.location.href = '/user/html/success.html'; 
            },
            modal: {
                ondismiss: function() {
                    
                    console.log("Checkout form closed");
                }
            },
            theme: {
                color: "#42b4fa"
            }
        };

        const razorpayCheckout = new Razorpay(options);
        razorpayCheckout.open();
    }

    
    proceedToPayButton.addEventListener('click', async function() {
        if (!mobileNumber || !plan) {
            showError("Please select a plan and enter a valid phone number.");
            return;
        }

        hideError();

        
        const orderData = await createRazorpayOrder(mobileNumber, plan.id, plan.price * 100); 

        if (orderData) {
            
            openRazorpayCheckout(orderData);
        }
    });
});