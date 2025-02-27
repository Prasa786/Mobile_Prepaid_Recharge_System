document.getElementById("proceedToPay").addEventListener("click", function () {
    let isValid = true;
    let selectedPaymentMethod = null;

    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const bankSelection = document.getElementById("bankSelection").value;
    const upiId = document.getElementById("upiId").value.trim();

    
    document.getElementById("cardNumberError").innerText = "";
    document.getElementById("expiryDateError").innerText = "";
    document.getElementById("cvvError").innerText = "";
    document.getElementById("bankSelectionError").innerText = "";
    document.getElementById("upiIdError").innerText = "";
    document.getElementById("paymentMethodError").innerText = "";

    
    const cardPaymentSection = document.getElementById("cardPayment");
    const netBankingSection = document.getElementById("netBanking");
    const upiPaymentSection = document.getElementById("upiPayment");

    if (cardPaymentSection.classList.contains("show")) {
        selectedPaymentMethod = "card";
    } else if (netBankingSection.classList.contains("show")) {
        selectedPaymentMethod = "netBanking";
    } else if (upiPaymentSection.classList.contains("show")) {
        selectedPaymentMethod = "upi";
    }

    
    if (selectedPaymentMethod === "card") {
        
        if (!/^\d{16}$/.test(cardNumber)) {
            document.getElementById("cardNumberError").innerText = "Please enter a valid 16-digit card number.";
            isValid = false;
        }

        
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            document.getElementById("expiryDateError").innerText = "Please enter a valid expiry date (MM/YY).";
            isValid = false;
        }

        
        if (!/^\d{3}$/.test(cvv)) {
            document.getElementById("cvvError").innerText = "Please enter a valid 3-digit CVV.";
            isValid = false;
        }
    } else if (selectedPaymentMethod === "netBanking") {
        
        if (bankSelection === "") {
            document.getElementById("bankSelectionError").innerText = "Please select a bank.";
            isValid = false;
        }
    } else if (selectedPaymentMethod === "upi") {
        
        if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
            document.getElementById("upiIdError").innerText = "Please enter a valid UPI ID.";
            isValid = false;
        }
    } else {
        document.getElementById("paymentMethodError").innerText = "Please select a payment method.";
        isValid = false;
    }

    
    if (isValid) {
        const paymentPopup = document.getElementById("paymentPopup");
        paymentPopup.style.display = "block";

        document.getElementById("doneButton").addEventListener("click", function () {
            paymentPopup.style.display = "none";
            localStorage.removeItem("phoneNumber");
            window.location.href = "/user/html/index.html"; 
        });
    }
});