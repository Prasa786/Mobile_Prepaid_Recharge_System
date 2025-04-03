document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#subscriber-table-body");
    const searchInput = document.querySelector("#search");
    const pagination = document.querySelector(".pagination");
    const itemsPerPage = 10;
    let currentPage = 1;
    let allSubscribers = [];

    async function fetchSubscribers() {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = "/admin/html/index.html"; 
            throw new Error("No token found in localStorage. Please log in again.");
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch('http://localhost:8083/api/users', {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch subscribers: ${response.status} - ${errorText}`);
            }

            const subscribers = await response.json();
            allSubscribers = subscribers;
            renderTable(subscribers);
            setupPagination(subscribers); 
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            alert('Failed to fetch subscribers. Please try again.');
        }
    }

    function renderTable(subscribers) {
        tableBody.innerHTML = "";
        subscribers.forEach(subscriber => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${subscriber.username}</td>
                <td>${subscriber.mobile}</td>
                <td>${subscriber.plan?.name || 'N/A'}</td>
                <td>${subscriber.plan?.endDate ? new Date(subscriber.plan.endDate).toLocaleDateString() : 'N/A'}</td>
                <td>${subscriber.lastRecharge || 'N/A'}</td>
                <td>${subscriber.status}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewHistory('${subscriber.mobile}')">View History</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteSubscriber('${subscriber.mobile}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    async function viewHistory(mobile) {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = "/admin/html/index.html"; 
            throw new Error("No token found in localStorage. Please log in again.");
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(`http://localhost:8083/api/recharge-history/user/${mobile}`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch recharge history: ${response.status} - ${errorText}`);
            }

            const history = await response.json();
            alert(`Recharge history for ${mobile}: ${JSON.stringify(history, null, 2)}`);
        } catch (error) {
            console.error('Error fetching recharge history:', error);
            alert('Failed to fetch recharge history. Please try again.');
        }
    }

    async function deleteSubscriber(mobile) {
        if (confirm('Are you sure you want to delete this subscriber?')) {
            const token = localStorage.getItem('adminToken'); 
            if (!token) {
                window.location.href = "/admin/html/index.html"; 
                throw new Error("No token found in localStorage. Please log in again.");
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            try {
                const response = await fetch(`http://localhost:8083/api/users/${mobile}`, {
                    method: 'DELETE',
                    headers: headers
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to delete subscriber: ${response.status} - ${errorText}`);
                }

                alert('Subscriber deleted successfully!');
                fetchSubscribers();
            } catch (error) {
                console.error('Error deleting subscriber:', error);
                alert('Failed to delete subscriber. Please try again.');
            }
        }
    }

    function setupPagination(subscribers) {
        const totalPages = Math.ceil(subscribers.length / itemsPerPage);
        pagination.innerHTML = "";

        const prevButton = document.createElement("li");
        prevButton.className = "page-item";
        prevButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
        prevButton.disabled = currentPage === 1;
        pagination.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.className = "page-item" + (i === currentPage ? " active" : "");
            pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
            pagination.appendChild(pageItem);
        }

        const nextButton = document.createElement("li");
        nextButton.className = "page-item";
        nextButton.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
        nextButton.disabled = currentPage === totalPages;
        pagination.appendChild(nextButton);
    }

    window.changePage = function (page) {
        currentPage = page;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedSubscribers = allSubscribers.slice(startIndex, endIndex);
        renderTable(paginatedSubscribers);
        setupPagination(allSubscribers);
    };

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSubscribers = allSubscribers.filter(subscriber =>
            subscriber.username.toLowerCase().includes(searchTerm) ||
            subscriber.mobile.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredSubscribers);
        setupPagination(filteredSubscribers);
    });

    fetchSubscribers();
});