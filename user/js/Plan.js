document.addEventListener("DOMContentLoaded", function () {
    const planList = document.getElementById("planList");
    const priceFilter = document.getElementById("priceFilter");
    const planButtons = document.querySelectorAll(".plan-filter");
    const dataPlanButtons = document.querySelectorAll("#dataPlan button");

    const plans = [
        { price: 299, validity: "28 Days", data: "1.5GB/Day", type: "popular", totalData: "42 GB" },
        { price: 399, validity: "90 Days", data: "2.5GB/Day", type: "popular", totalData: "225 GB" },
        { price: 749, validity: "72 Days", data: "2GB/Day", type: "data", totalData: "144 GB" },
        { price: 1029, validity: "84 Days", data: "2GB/Day", type: "long", totalData: "168 GB" },
        { price: 3599, validity: "365 Days", data: "2.5GB/Day", type: "long", totalData: "730 GB" },
        { price: 899, validity: "90 Days", data: "3GB/Day", type: "long", totalData: "270 GB" },
        { price: 1299, validity: "180 Days", data: "10GB/Day", type: "long", totalData: "1800 GB" },
        { price: 2599, validity: "180 Days", data: "Unlimited", type: "unlimited", totalData: "Unlimited" },
        { price: 159, validity: "28 Days", data: "120GB/Plan", type: "data", totalData: "120 GB" },
        { price: 199, validity: "28 Days", data: "200GB/Plan", type: "data", totalData: "200 GB" }
    ];

    function renderPlans(filterPrice = null, planType = null, dataFilter = null) {
        planList.innerHTML = "";

        let filteredPlans = plans;

        if (filterPrice) {
            filteredPlans = filteredPlans.filter(plan => plan.price <= filterPrice);
        }

        if (planType) {
            filteredPlans = filteredPlans.filter(plan => plan.type === planType);
        }

        if (dataFilter) {
            filteredPlans = filteredPlans.filter(plan => plan.data.includes(dataFilter));
        }

        filteredPlans.forEach((plan, index) => {
            const planCard = document.createElement("div");
            planCard.classList.add("planCard");
            planCard.innerHTML = `
                <div class="planDetails"><span>Price: ₹${plan.price}</span></div>
                <div class="planDetails"><span>Validity: ${plan.validity}</span></div>
                <div class="planDetails"><span>Data: ${plan.data}</span></div>
                <button id="btn-${index}" class="btn" data-plan='${JSON.stringify(plan)}'>Buy</button>
            `;
            planList.appendChild(planCard);
        });

        filteredPlans.forEach((plan, index) => {
            document.getElementById(`btn-${index}`).addEventListener("click", function () {
                const selectedPlan = JSON.parse(this.getAttribute("data-plan"));
                localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
                let phNo = localStorage.getItem('phoneNumber');
                if (phNo) {
                    window.location.href = "Transaction.html";
                } else {
                    openPopup();
                }
            });
        });
    }

    priceFilter.addEventListener("change", function () {
        const selectedPrice = parseInt(priceFilter.value);
        renderPlans(selectedPrice);
    });

    planButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedPlan = this.getAttribute("data-plan");
            renderPlans(null, selectedPlan);
        });
    });

    dataPlanButtons.forEach(button => {
        button.addEventListener("click", function () {
            const dataFilter = this.innerText.trim();
            renderPlans(null, null, dataFilter);
        });
    });

    function openPopup() {
        // Assuming you have a popup element in your HTML
        const popup = document.getElementById("popup");
        popup.style.display = "block";
        // Attach event listener to the close button of the popup
        document.getElementById("closePopup").addEventListener("click", function () {
            popup.style.display = "none";
            window.location.href = "Transaction.html";
        });
    }

    renderPlans();
});
