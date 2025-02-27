const plans = [
    { name: "Basic Plan", price: "₹199", validity: "30 Days", data: "nil", status: "Active", username: "Tony Stark" },
    { name: "Unlimited Plan", price: "₹399", validity: "60 Days", data: "1.5GB/Day", status: "Active", username: "Steve Rogers" },
    { name: "Data Plan", price: "₹599", validity: "90 Days", data: "4GB Total", status: "Inactive", username: "Bruce Banner" },
    { name: "Popular Plan", price: "₹999", validity: "120 Days", data: "5GB/Day", status: "Active", username: "Peter Parker" },
    { name: "Long Validity Plan", price: "₹899", validity: "100 Days", data: "3GB/Day", status: "Active", username: "Natasha Romanoff" },
    { name: "Recommended Plan", price: "₹799", validity: "80 Days", data: "2GB/Day", status: "Inactive", username: "Clint Barton" }
];

const availablePlans = [
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

let filteredPlans = [...plans];
const rowsPerPage = 5;
let currentPage = 1;

function populateAvailablePlansTable() {
    const tbody = document.getElementById("available-plans-tbody");
    tbody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedPlans = availablePlans.slice(start, end);

    paginatedPlans.forEach((plan, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>₹${plan.price}</td>
            <td>${plan.validity}</td>
            <td>${plan.data}</td>
            <td>${plan.totalData}</td>
            <td>${plan.type}</td>
            <td><button class="btn btn-danger" onclick="deleteAvailablePlan(${start + index})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    updatePagination();
}


function populateTable() {
    const tbody = document.getElementById("plans-tbody");
    tbody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedPlans = filteredPlans.slice(start, end);

    paginatedPlans.forEach((plan, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${plan.name}</td>
            <td>${plan.username}</td>
            <td>${plan.price}</td>
            <td>${plan.validity}</td>
            <td>${plan.data}</td>
            <td>${plan.status}</td>
        `;
        tbody.appendChild(row);
    });

    updatePagination();
}



function deleteAvailablePlan(index) {
    if (confirm("Are you sure you want to delete this plan?")) {
        availablePlans.splice(index, 1);
        populateAvailablePlansTable();
        showDeleteToast();
    }
}


function showDeleteToast() {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = "Plan deleted successfully!";
    document.body.appendChild(toast);

    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2000);
}


function updatePagination() {
    const totalPages = Math.ceil(availablePlans.length / rowsPerPage);
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = '';

    
    const prevButton = document.createElement("li");
    prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
    pagination.appendChild(prevButton);

    
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    
    const nextButton = document.createElement("li");
    nextButton.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
    pagination.appendChild(nextButton);
}


function changePage(page) {
    if (page < 1 || page > Math.ceil(availablePlans.length / rowsPerPage)) {
        return; 
    }
    currentPage = page;
    populateAvailablePlansTable();
}


document.getElementById('search').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    filteredPlans = plans.filter(plan =>
        plan.name.toLowerCase().includes(searchValue) ||
        plan.price.toLowerCase().includes(searchValue) ||
        plan.validity.toLowerCase().includes(searchValue) ||
        plan.data.toLowerCase().includes(searchValue) ||
        plan.status.toLowerCase().includes(searchValue)
    );
    populateTable();
});


document.getElementById('add-plan-button').addEventListener('click', function () {
    document.getElementById('add-plan-popup').style.display = 'flex';
});


function closePopup() {
    document.getElementById('add-plan-popup').style.display = 'none';
}



document.getElementById('add-plan-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const price = document.getElementById('plan-price').value; 
    const validity = document.getElementById('plan-validity').value; 
    const data = document.getElementById('plan-data').value; 
    const category = document.getElementById('plan-category').value; 

    let valid = true;

    
    if (!price) {
        document.getElementById('price-error').innerHTML = "Price is required."; 
        valid = false;
    } else if (isNaN(price) || price <= 0) {
        document.getElementById('price-error').innerHTML = "Price must be a valid number greater than 0."; 
        valid = false;
    } else {
        document.getElementById('price-error').innerHTML = ""; 
    }

    
    if (!validity) {
        document.getElementById('validity-error').innerHTML = "Validity is required."; 
        valid = false;
    } else {
        document.getElementById('validity-error').innerHTML = ""; 
    }

    
    if (!data) {
        document.getElementById('data-error').innerHTML = "Data is required."; 
        valid = false;
    } else {
        document.getElementById('data-error').innerHTML = ""; 
    }

    
    if (!category) {
        document.getElementById('category-error').innerHTML = "Category is required."; 
        valid = false;
    } else {
        document.getElementById('category-error').innerHTML = ""; 
    }

    
    if (valid) {
        const newPlan = {
            price: parseInt(price),
            validity: validity,
            data: data,
            totalData: data, 
            type: category
        };
        availablePlans.push(newPlan);
        populateAvailablePlansTable();
        closePopup();

        
        document.getElementById('add-plan-form').reset(); 
    }
});


document.getElementById('plan-price').addEventListener('input', function () {
    document.getElementById('price-error').innerHTML = ""; 
});

document.getElementById('plan-validity').addEventListener('input', function () {
    document.getElementById('validity-error').innerHTML = ""; 
});

document.getElementById('plan-data').addEventListener('input', function () {
    document.getElementById('data-error').innerHTML = ""; 
});

document.getElementById('plan-category').addEventListener('input', function () {
    document.getElementById('category-error').innerHTML = ""; 
});


document.getElementById('add-plan-button').addEventListener('click', function () {
    document.getElementById('add-plan-popup').style.display = 'flex'; 
});


function closePopup() {
    document.getElementById('add-plan-popup').style.display = 'none'; 
}


populateTable(); 
populateAvailablePlansTable(); 