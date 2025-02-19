function showUpiOptions() {
    const upiSelect = document.getElementById("upiSelect");
    const upiOptions = document.getElementById("upiOptions");
    const selectedUpi = document.getElementById("selectedUpi");

    if (upiSelect.value) {
        selectedUpi.textContent = upiSelect.options[upiSelect.selectedIndex].text;
        upiOptions.style.display = "block";
    } else {
        upiOptions.style.display = "none";
    }
}

function showCardFields() {
    const cardSelect = document.getElementById("cardSelect");
    const cardFields = document.getElementById("cardFields");

    if (cardSelect.value === "credit_debit") {
        cardFields.style.display = "block";
    } else {
        cardFields.style.display = "none";
    }
}

function showBankOptions() {
    const bankSelect = document.getElementById("bankSelect");
    const bankOptions = document.getElementById("bankOptions");
    const selectedBank = document.getElementById("selectedBank");

    if (bankSelect.value) {
        selectedBank.textContent = bankSelect.options[bankSelect.selectedIndex].text;
        bankOptions.style.display = "block";
    } else {
        bankOptions.style.display = "none";
    }
}

function showWalletOptions() {
    const walletSelect = document.getElementById("walletSelect");
    const walletOptions = document.getElementById("walletOptions");
    const selectedWallet = document.getElementById("selectedWallet");

    if (walletSelect.value) {
        selectedWallet.textContent = walletSelect.options[walletSelect.selectedIndex].text;
        walletOptions.style.display = "block";
    } else {
        walletOptions.style.display = "none";
    }
}

function updatePlanDetails() {
    const plan = JSON.parse(localStorage.getItem("selectedPlan"));
    if (plan) {
        document.getElementById("price").innerText = `Rs ${plan.price}`;
        document.getElementById("validity").innerText = plan.validity;
        document.getElementById("data").innerText = plan.data;
        document.getElementById("totalData").innerText = plan.totalData;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updatePlanDetails();
});