document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#history-table tbody");
    const searchInput = document.querySelector("#search");
    const pagination = document.querySelector(".pagination");
    const itemsPerPage = 10; 
    let currentPage = 1;
    let allTransactions = [];

    
    async function fetchTransactions() {
        try {
            const token = localStorage.getItem("adminToken"); 
            console.log("Token:", token); 
            
            if (!token) {
                window.location.href = "/admin/html/index.html"; 
                throw new Error("No token found in localStorage. Please log in again.");
            }
    
            const response = await fetch("http://localhost:8083/api/admin/transactions", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            });
            
            if (!response.ok) {
                return response.text().then(text => {
                    console.error("Response error:", text); 
                    throw new Error(`Failed to fetch transactions: ${response.status} - ${text}`);
                });
            }
    
            const transactions = await response.json();
            console.log("Fetched transactions:", transactions);
            allTransactions = transactions; 
            renderTable(transactions); 
            setupPagination(transactions); 
        } catch (error) {
            console.error("Error fetching transactions:", error);
            alert("Error fetching transactions. Please log in again.");
        }
    }

    
    function renderTable(transactions) {
        tableBody.innerHTML = ""; 
        transactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.user.username}</td>
                <td>${transaction.user.mobile}</td>
                <td>${transaction.plan.name}</td>
                <td>${new Date(transaction.transactionDate).toLocaleDateString()}</td>
                <td>${transaction.payment.amount}</td>
                <td>${transaction.payment.paymentMethod}</td>
                <td>${new Date(transaction.plan.endDate).toLocaleDateString()}</td>
                <td>${transaction.status}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="softDeleteTransaction(${transaction.transactionId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    
    async function softDeleteTransaction(transactionId) {
        try {
            const token = localStorage.getItem("token"); 
            if (!token) {
                throw new Error("No token found in localStorage. Please log in again.");
            }

            const response = await fetch(`http://localhost:8083/api/admin/transactions/${transactionId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Failed to delete transaction: ${response.status} - ${text}`);
                });
            }

            alert("Transaction deleted successfully!");
            fetchTransactions(); 
        } catch (error) {
            console.error("Error deleting transaction:", error);
            alert("Error deleting transaction. Please check the console for details.");
        }
    }

        
        function setupPagination(transactions) {
            const totalPages = Math.ceil(transactions.length / itemsPerPage);
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
            const paginatedTransactions = allTransactions.slice(startIndex, endIndex);
            renderTable(paginatedTransactions);
            setupPagination(allTransactions);
        };
    
        
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredTransactions = allTransactions.filter(transaction =>
                transaction.user.username.toLowerCase().includes(searchTerm) ||
                transaction.user.mobile.toLowerCase().includes(searchTerm) ||
                transaction.plan.name.toLowerCase().includes(searchTerm)
            );
            renderTable(filteredTransactions);
            setupPagination(filteredTransactions);
        });
    
        
        fetchTransactions();
    });