document.addEventListener("DOMContentLoaded", function () {
    updatePlanDetails();

    document.querySelector(".btn-success").addEventListener("click", function (event) {
        if (!validatePayment()) {
            event.preventDefault();
        }
    });

    document.getElementById("upiSelect").addEventListener("change", showUpiOptions);
    document.getElementById("cardSelect").addEventListener("change", showCardFields);
    document.getElementById("bankSelect").addEventListener("change", showBankOptions);
    document.getElementById("walletSelect").addEventListener("change", showWalletOptions);
});

function validatePayment() {
    let upi = document.getElementById("upiSelect").value;
    let card = document.getElementById("cardSelect").value;
    let bank = document.getElementById("bankSelect").value;
    let wallet = document.getElementById("walletSelect").value;

    if (!upi && !card && !bank && !wallet) {
        alert("Please select a payment method.");
        return false;
    }

    if (card === "credit_debit" && !validateCardDetails()) {
        return false;
    }

    return true;
}

function validateCardDetails() {
    let cardNumber = document.getElementById("cardNumber").value.trim();
    let expiryDate = document.getElementById("expiryDate").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Invalid card number. Please enter a 16-digit number.");
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert("Invalid expiry date. Format should be MM/YY.");
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert("Invalid CVV. Please enter a 3-digit number.");
        return false;
    }

    return true;
}
