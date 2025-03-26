document.addEventListener('DOMContentLoaded', function () {
    const addPlanButton = document.getElementById('add-plan-button');
    const addPlanPopup = document.getElementById('add-plan-popup');
    const addPlanForm = document.getElementById('add-plan-form');
    const availablePlansTbody = document.getElementById('availablePlansTbody');
    const pagination = document.querySelector(".pagination");
    const itemsPerPage = 10; // Number of rows per page
    let currentPage = 0;
    let allPlans = [];

    // Fetch plans from the backend
    async function fetchPlans() {
        const token = localStorage.getItem('adminToken'); // Retrieve the token from localStorage
        console.log("Fetching plans with token:", token); // Log the token for debugging
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    
        try {
            const response = await fetch('http://localhost:8083/api/recharge-plans', {
                method: 'GET',
                headers: headers
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Response error:", errorText);
                throw new Error(`Failed to fetch plans: ${response.status} - ${errorText}`);
            }
    
            const plans = await response.json();
            console.log("Fetched plans:", plans);
            allPlans = plans; // Store the fetched plans
            renderTable(plans); // Render the table with the fetched plans
            setupPagination(plans); // Set up pagination
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    }

    // Render the table with plans
    function renderTable(plans) {
        availablePlansTbody.innerHTML = ""; // Clear existing rows
        plans.forEach(plan => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.name || ''}</td>
                <td>${plan.price || ''}</td>
                <td>${plan.validity || ''}</td>
                <td>${plan.dataLimit || ''}</td>
                <td>${plan.benefits || 'N/A'}</td>
                <td>${plan.planType || 'N/A'}</td>
                <td>${plan.description || ''}</td>
                <td>${plan.smsCount || ''}</td>
                <td>${plan.callMinutes || ''}</td>
                <td>${plan.validityDays || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editPlan(${plan.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePlan(${plan.id})">Delete</button>
                </td>
            `;
            availablePlansTbody.appendChild(row);
        });
    }

    // Setup pagination
    function setupPagination(plans) {
        const totalPages = Math.ceil(plans.length / itemsPerPage);
        pagination.innerHTML = "";

        // Previous button
        const prevButton = document.createElement("li");
        prevButton.className = "page-item";
        prevButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
        prevButton.disabled = currentPage === 1;
        pagination.appendChild(prevButton);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.className = "page-item" + (i === currentPage ? " active" : "");
            pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
            pagination.appendChild(pageItem);
        }

        // Next button
        const nextButton = document.createElement("li");
        nextButton.className = "page-item";
        nextButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
        nextButton.disabled = currentPage === totalPages;
        pagination.appendChild(nextButton);
    }

    // Change page
    window.changePage = function (page) {
        currentPage = page;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedPlans = allPlans.slice(startIndex, endIndex);
        renderTable(paginatedPlans);
        setupPagination(allPlans);
    };

    // Add plan button click event
    addPlanButton.addEventListener('click', function () {
        addPlanPopup.style.display = 'flex';
        addPlanForm.reset();
        addPlanForm.onsubmit = function (e) {
            e.preventDefault();
            addPlan();
        };
    });

    window.closePopup = function () {
        addPlanPopup.style.display = 'none';
    };

    // Add a new plan
    function addPlan() {
        const plan = {
            name: document.getElementById('plan-name').value,
            price: parseFloat(document.getElementById('plan-price').value),
            validity: document.getElementById('plan-validity').value,
            dataLimit: document.getElementById('plan-data-limit').value,
            description: document.getElementById('plan-description').value,
            smsCount: parseInt(document.getElementById('plan-sms-count').value),
            callMinutes: parseInt(document.getElementById('plan-call-minutes').value),
            category: {
                categoryId: parseInt(document.getElementById('plan-category').value)
            }
        };

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        fetch('http://localhost:8083/api/recharge-plans', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(plan)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Failed to add plan: ${response.status} - ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            closePopup();
            fetchPlans(); // Refresh the plans list
        })
        .catch(error => console.error('Error adding plan:', error));
    }

    // Edit a plan
    window.editPlan = function (id) {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`http://localhost:8083/api/recharge-plans/${id}`, {
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Failed to fetch plan: ${response.status} - ${text}`);
                });
            }
            return response.json();
        })
        .then(plan => {
            // Populate the form with the plan details
            document.getElementById('plan-name').value = plan.name || '';
            document.getElementById('plan-price').value = plan.price || '';
            document.getElementById('plan-validity').value = plan.validity || '';
            document.getElementById('plan-data-limit').value = plan.dataLimit || '';
            document.getElementById('plan-benefits').value = plan.benefits || '';
            document.getElementById('plan-type').value = plan.planType || '';
            document.getElementById('plan-description').value = plan.description || '';
            document.getElementById('plan-sms-count').value = plan.smsCount || '';
            document.getElementById('plan-call-minutes').value = plan.callMinutes || '';
            document.getElementById('plan-validity-days').value = plan.validityDays || '';
            document.getElementById('plan-category').value = plan.category?.categoryId || '';

            addPlanPopup.style.display = 'flex';
            addPlanForm.onsubmit = function(e) {
                e.preventDefault();
                updatePlan(id); // Call updatePlan with the plan ID
            };
        })
        .catch(error => console.error('Error fetching plan:', error));
    };

    // Update an existing plan
    function updatePlan(id) {
        const plan = {
            name: document.getElementById('plan-name').value,
            price: parseFloat(document.getElementById('plan-price').value),
            validity: document.getElementById('plan-validity').value,
            dataLimit: document.getElementById('plan-data-limit').value,
            description: document.getElementById('plan-description').value,
            smsCount: parseInt(document.getElementById('plan-sms-count').value),
            callMinutes: parseInt(document.getElementById('plan-call-minutes').value),
            category: {
                categoryId: parseInt(document.getElementById('plan-category').value)
            }
        };

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        fetch(`http://localhost:8083/api/recharge-plans/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(plan)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Failed to update plan: ${response.status} - ${text}`);
                });
            }
            return response.json();
        })
        .then(() => {
            closePopup();
            fetchPlans(); // Refresh the plans list
        })
        .catch(error => console.error('Error updating plan:', error));
    }

    // Delete a plan
    window.deletePlan = function (id) {
        if (confirm('Are you sure you want to delete this plan?')) {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            fetch(`http://localhost:8083/api/recharge-plans/${id}`, {
                method: 'DELETE',
                headers: headers
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Failed to delete plan: ${response.status} - ${text}`);
                    });
                }
                fetchPlans(); // Refresh the plans list
            })
            .catch(error => console.error('Error deleting plan:', error));
        }
    };

    // Initial fetch
    fetchPlans();
});