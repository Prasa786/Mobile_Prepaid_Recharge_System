document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#history-table tbody");
    const searchInput = document.querySelector("#search");
    const pagination = document.querySelector(".pagination");
    const itemsPerPage = 10;
    let currentPage = 1;
    let allRechargeHistory = [];

    async function fetchRechargeHistory() {
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
            const response = await fetch('http://localhost:8083/api/recharge-history', {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch recharge history: ${response.status} - ${errorText}`);
            }

            const rechargeHistory = await response.json();
            allRechargeHistory = rechargeHistory;
            renderTable(rechargeHistory);
            setupPagination(rechargeHistory);
        } catch (error) {
            console.error('Error fetching recharge history:', error);
            alert('Failed to fetch recharge history. Please try again.');
        }
    }

    function renderTable(rechargeHistory) {
        tableBody.innerHTML = "";
        rechargeHistory.forEach(history => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${history.user.username}</td>
                <td>${history.user.mobile}</td>
                <td>${history.plan.name}</td>
                <td>${new Date(history.rechargeDate).toLocaleDateString()}</td>
                <td>₹${history.amount}</td>
                <td>${history.payment.paymentMethod}</td>
                <td>${new Date(history.plan.endDate).toLocaleDateString()}</td>
                <td>${history.status}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteRechargeHistory(${history.historyId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    async function deleteRechargeHistory(historyId) {
        if (confirm('Are you sure you want to delete this recharge history?')) {
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
                const response = await fetch(`http://localhost:8083/api/recharge-history/${historyId}`, {
                    method: 'DELETE',
                    headers: headers
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to delete recharge history: ${response.status} - ${errorText}`);
                }

                alert('Recharge history deleted successfully!');
                fetchRechargeHistory();
            } catch (error) {
                console.error('Error deleting recharge history:', error);
                alert('Failed to delete recharge history. Please try again.');
            }
        }
    }

    function setupPagination(rechargeHistory) {
        const totalPages = Math.ceil(rechargeHistory.length / itemsPerPage);
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
        const paginatedRechargeHistory = allRechargeHistory.slice(startIndex, endIndex);
        renderTable(paginatedRechargeHistory);
        setupPagination(allRechargeHistory);
    };

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRechargeHistory = allRechargeHistory.filter(history =>
            history.user.username.toLowerCase().includes(searchTerm) ||
            history.user.mobile.toLowerCase().includes(searchTerm) ||
            history.plan.name.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredRechargeHistory);
        setupPagination(filteredRechargeHistory);
    });

    fetchRechargeHistory();
});