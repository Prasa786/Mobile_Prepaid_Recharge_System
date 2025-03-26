document.addEventListener("DOMContentLoaded", function () {
    const planList = document.getElementById("planList");
    const priceFilter = document.getElementById("priceFilter");
    const planButtons = document.querySelectorAll(".plan-filter");
    const dataPlanButtons = document.querySelectorAll("#dataPlan button");

    // Fetch plans from backend with better JSON handling
    async function fetchPlans() {
        try {
            const response = await fetch("http://localhost:8083/api/recharge-plans", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
            const text = await response.text();
            console.log("Raw API Response:", text);
    
            const jsonStart = text.indexOf("[") !== -1 ? text.indexOf("[") : text.indexOf("{");
            if (jsonStart === -1) throw new Error("No JSON found in response.");
    
            let validJsonString = text.slice(jsonStart).trim();
            let plans = JSON.parse(validJsonString);
    
            // **🔹 Prevent infinite recursion by removing deeply nested objects**
            plans = plans.map(plan => {
                if (plan.category) {
                    delete plan.category.rechargePlans; // **Remove recursive nesting**
                }
                return plan;
            });
    
            return plans;
        } catch (error) {
            console.error("Error fetching plans:", error);
            planList.innerHTML = "<p class='text-danger'>Error loading plans. Please try again later.</p>";
            return [];
        }
    }
    
    // Render plans with filtering
    async function renderPlans(filterPrice = null, planType = null, dataFilter = null) {
        planList.innerHTML = "";
        const plans = await fetchPlans();

        if (!plans.length) {
            planList.innerHTML = "<p class='text-muted'>No plans available.</p>";
            return;
        }

        let filteredPlans = plans;

        // Apply price filter
        if (filterPrice) {
            filteredPlans = filteredPlans.filter(plan => plan.price <= parseFloat(filterPrice));
        }

        // Apply plan type filter
        if (planType) {
            filteredPlans = filteredPlans.filter(plan => 
                plan.description?.toLowerCase().includes(planType.toLowerCase()));
        }

        // Apply data filter
        if (dataFilter) {
            filteredPlans = filteredPlans.filter(plan => 
                plan.dataLimit?.toLowerCase().includes(dataFilter.toLowerCase()));
            }
            
                    filteredPlans.forEach((plan, index) => {
                        const planCard = document.createElement("div");
                        planCard.classList.add("planCard");
                        planCard.innerHTML = `
                            <div class="planDetails"><span>Price: ₹${plan.price}</span></div>
                            <div class="planDetails"><span>Validity: ${plan.validity}</span></div>
                            <div class="planDetails"><span>Data: ${plan.dataLimit}</span></div>
                            <button id="btn-${index}" class="btn" data-plan='${JSON.stringify(plan)}'>Buy</button>
                        `;
                        planList.appendChild(planCard);
                    });
                    
                    // Add event listeners to recharge buttons
        filteredPlans.forEach((plan, index) => {
            document.getElementById(`btn-${index}`).addEventListener("click", function () {
                const selectedPlan = JSON.parse(this.getAttribute("data-plan"));
                localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
                let phNo = localStorage.getItem("phoneNumber");
                if (phNo) {
                    window.location.href = "/user/html/Transaction.html";
                } else {
                    openPopup();
                }
            });
        });
    }
    
    // Price filter event
    priceFilter.addEventListener("change", function () {
        const selectedPrice = parseInt(this.value) || null;
        const activePlanType = document.querySelector(".plan-filter.active")?.dataset.plan || null;
        const activeDataFilter = document.querySelector("#dataPlan button.active")?.innerText.trim() || null;
        renderPlans(selectedPrice, activePlanType, activeDataFilter);
    });
    
    // Plan type filter event
    planButtons.forEach(button => {
        button.addEventListener("click", function () {
            planButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const selectedPlanType = this.getAttribute("data-plan");
            const selectedPrice = parseInt(priceFilter.value) || null;
            const activeDataFilter = document.querySelector("#dataPlan button.active")?.innerText.trim() || null;
            renderPlans(selectedPrice, selectedPlanType, activeDataFilter);
        });
    });
    
    // Data plan filter event
    dataPlanButtons.forEach(button => {
        button.addEventListener("click", function () {
            dataPlanButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            const dataFilter = this.innerText.trim();
            const selectedPrice = parseInt(priceFilter.value) || null;
            const activePlanType = document.querySelector(".plan-filter.active")?.dataset.plan || null;
            renderPlans(selectedPrice, activePlanType, dataFilter);
        });
    });

    // Popup handling for phone number entry
    function openPopup() {
        const popup = document.getElementById("popup");
        const closePopup = document.getElementById("close-popup");
        const saveButton = document.getElementById("save-button");
        const editPhoneNumber = document.getElementById("edit-phone-number");
        const editError = document.getElementById("editError");

        popup.style.display = "block";
        
        closePopup.addEventListener("click", function () {
            popup.style.display = "none";
        });
        
        saveButton.addEventListener("click", function () {
            const newNumber = editPhoneNumber.value.trim();
            if (/^[6789]\d{9}$/.test(newNumber)) {
                localStorage.setItem("phoneNumber", `+91${newNumber}`);
                popup.style.display = "none";
                window.location.href = "/user/html/Transaction.html";
            } else {
                editError.classList.remove("d-none");
            }
        });
    }
    
    // Initial render
    renderPlans();
});


//     filteredPlans.forEach((plan, index) => {
//     const planCard = document.createElement("div");
//     planCard.classList.add("card", "shadow-sm", "p-3", "mb-3");
//     planCard.innerHTML = `
//         <h5 class="card-title">${plan.name || "Unnamed Plan"}</h5>
//         <div class="planDetails"><span>Price: ₹${plan.price || "N/A"}</span></div>
//         <div class="planDetails"><span>Validity: ${plan.validity || "N/A"}</span></div>
//         <div class="planDetails"><span>Data: ${plan.dataLimit || "N/A"}</span></div>
//         <div class="planDetails"><span>Description: ${plan.description || "N/A"}</span></div>
//         <button id="btn-${index}" class="btn btn-primary mt-2" data-plan='${JSON.stringify(plan)}'>Recharge Now</button>
//     `;
//     planList.appendChild(planCard);
// });



// document.addEventListener("DOMContentLoaded", function () {
    //     const planList = document.getElementById("planList");
    //     const priceFilter = document.getElementById("priceFilter");
    //     const planButtons = document.querySelectorAll(".plan-filter");
    //     const dataPlanButtons = document.querySelectorAll("#dataPlan button");
    
    //     const plans = [
        //         { price: 299, validity: "28 Days", data: "1.5GB/Day", type: "popular", totalData: "42 GB" },
        //         { price: 399, validity: "90 Days", data: "2.5GB/Day", type: "popular", totalData: "225 GB" },
        //         { price: 749, validity: "72 Days", data: "2GB/Day", type: "data", totalData: "144 GB" },
        //         { price: 1029, validity: "84 Days", data: "2GB/Day", type: "long", totalData: "168 GB" },
        //         { price: 3599, validity: "365 Days", data: "2.5GB/Day", type: "long", totalData: "730 GB" },
        //         { price: 899, validity: "90 Days", data: "3GB/Day", type: "long", totalData: "270 GB" },
//         { price: 1299, validity: "180 Days", data: "10GB/Day", type: "long", totalData: "1800 GB" },
//         { price: 2599, validity: "180 Days", data: "Unlimited", type: "unlimited", totalData: "Unlimited" },
//         { price: 159, validity: "28 Days", data: "120GB/Day", type: "data", totalData: "120 GB" },
//         { price: 199, validity: "28 Days", data: "200GB/Day", type: "data", totalData: "200 GB" }
//     ];

//     function renderPlans(filterPrice = null, planType = null, dataFilter = null) {
//         planList.innerHTML = "";

//         let filteredPlans = plans;

//         if (filterPrice) {
//             filteredPlans = filteredPlans.filter(plan => plan.price <= filterPrice);
//         }

//         if (planType) {
//             filteredPlans = filteredPlans.filter(plan => plan.type === planType);
//         }

//         if (dataFilter) {
//             filteredPlans = filteredPlans.filter(plan => plan.data.includes(dataFilter));
//         }


//         filteredPlans.forEach((plan, index) => {
//             document.getElementById(`btn-${index}`).addEventListener("click", function () {
//                 const selectedPlan = JSON.parse(this.getAttribute("data-plan"));
//                 localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
//                 let phNo = localStorage.getItem('phoneNumber');
//                 if (phNo) {
//                     window.location.href = "Transaction.html";
//                 } else {
//                     openPopup();
//                 }
//             });
//         });
//     }

//     priceFilter.addEventListener("change", function () {
//         const selectedPrice = parseInt(priceFilter.value);
//         renderPlans(selectedPrice);
//     });

//     planButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             const selectedPlan = this.getAttribute("data-plan");
//             renderPlans(null, selectedPlan);
//         });
//     });

//     dataPlanButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             const dataFilter = this.innerText.trim();
//             renderPlans(null, null, dataFilter);
//         });
//     });

//     function openPopup() {
//         // Assuming you have a popup element in your HTML
//         const popup = document.getElementById("popup");
//         popup.style.display = "block";
//         // Attach event listener to the close button of the popup
//         document.getElementById("closePopup").addEventListener("click", function () {
//             popup.style.display = "none";
//             window.location.href = "Transaction.html";
//         });
//     }

//     renderPlans();
// });