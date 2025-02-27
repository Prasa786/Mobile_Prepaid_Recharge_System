document.addEventListener("DOMContentLoaded", function () {
    updatePlanDetails();
});

function updatePlanDetails() {
    const plan = JSON.parse(localStorage.getItem("selectedPlan"));
    if (plan) {
        document.getElementById("price").innerText = `Rs ${plan.price}`;
        document.getElementById("validity").innerText = plan.validity;
        document.getElementById("data").innerText = plan.data;
        document.getElementById("totalData").innerText = plan.totalData ;
    }
}
