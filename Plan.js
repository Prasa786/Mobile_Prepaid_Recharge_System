document.addEventListener("DOMContentLoaded", function () {
    const planList = document.getElementById("planList");
    const priceFilter = document.getElementById("priceFilter");
    const planButtons = document.querySelectorAll(".plan-filter");
    const dataPlanButtons = document.querySelectorAll("#dataPlan button");
    
    const plans = [
        { price: 299, validity: "28 Days", data: "1.5GB/Day", type: "popular" },
        { price: 399, validity: "90 Days", data: "2.5GB/Day", type: "popular" },
        { price: 749, validity: "72 Days", data: "2GB/Day", type: "data" },
        { price: 1029, validity: "84 Days", data: "2GB/Day", type: "long" },
        { price: 3599, validity: "365 Days", data: "2.5GB/Day", type: "long" },
        { price: 899, validity: "90 Days", data: "3GB/Day", type: "long" },
        { price: 1299, validity: "180 Days", data: "10GB/Day", type: "long" },
        { price: 2599, validity: "180 Days", data: "Unlimited", type: "unlimited" },
        { price: 159, validity: "28 Days", data: "120GB", type: "data" },
        { price: 199, validity: "28 Days", data: "200GB", type: "data" }
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
        
        filteredPlans.forEach(plan => {
            const planCard = document.createElement("div");
            planCard.classList.add("planCard");
            planCard.innerHTML = `
            <div class="planDetails"><span>Price: ₹${plan.price}</span></div>
            <div class="planDetails"><span>Validity: ${plan.validity}</span></div>
                <div class="planDetails"><span>Data: ${plan.data}</span></div>
                <button class="btn" style="background-color: #65bef5; color: white;" onclick="location.href='Transaction.html';">
                Buy
                </button>
            `;
            planList.appendChild(planCard);
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

    renderPlans();
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});