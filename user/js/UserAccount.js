document.addEventListener("DOMContentLoaded", function () {
    initializeCharts();

    
    document.getElementById('editProfileButton').addEventListener('click', toggleProfileEdit);
});

function initializeCharts() {
    let chart1 = document.getElementById('dataUsageChart').getContext('2d');
    let chart2 = document.getElementById('monthlyDataUsageChart').getContext('2d');

    
    new Chart(chart1, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Data Usage (GB)',
                data: [7, 6, 7, 5, 8],
                backgroundColor: '#65bef5'
            }]
        }
    });

    
    new Chart(chart2, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu'],
            datasets: [{
                label: 'Daily Data Usage (GB)',
                data: [2, 3, 2.5, 4],
                backgroundColor: '#f56565'
            }]
        }
    });
}

function toggleProfileEdit() {
    const modal = document.getElementById('editProfileModal');
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}

function closeModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}

function saveProfile() {
    
    const altPhoneNumber = document.getElementById('altPhoneInput').value;
    const email = document.getElementById('emailInput').value;

    
    if (!altPhoneNumber || !email) {
        alert('All fields are required.');
        return;
    }

    
    document.getElementById('altPhoneNumberDisplay').textContent = altPhoneNumber;
    document.getElementById('emailDisplay').textContent = email;

    
    closeModal();
}

const invoices = [
    { planName: "Basic Plan", amountPaid: "Rs. 299", validity: "28 Days", details: "1.5GB/Day", transactionId: "67890DEF", date: "26/02/2025" },
    { planName: "Popular Plan", amountPaid: "Rs. 299", validity: "28 Days", details: "1.5GB/Day", transactionId: "11223XYZ", date: "15/01/2025" },
    { planName: "Popular Plan", amountPaid: "Rs. 399", validity: "90 Days", details: "2.5GB/Day", transactionId: "44556QWE", date: "10/10/2024" },
    { planName: "Data Plan", amountPaid: "Rs. 749", validity: "72 Days", details: "2GB/Day", transactionId: "77889RTY", date: "05/08/2024" },
    { planName: "Long Term Plan", amountPaid: "Rs. 1029", validity: "84 Days", details: "2GB/Day", transactionId: "99001UOP", date: "01/06/2024" },
    { planName: "Long Term Plan", amountPaid: "Rs. 3599", validity: "365 Days", details: "2.5GB/Day", transactionId: "22334ZXC", date: "01/06/2023" },
    { planName: "Long Term Plan", amountPaid: "Rs. 899", validity: "90 Days", details: "3GB/Day", transactionId: "55667ASD", date: "03/03/2023" },
    { planName: "Long Term Plan", amountPaid: "Rs. 1299", validity: "180 Days", details: "10GB/Day", transactionId: "88990FGH", date: "16/09/2022" },
    { planName: "Unlimited Plan", amountPaid: "Rs. 2599", validity: "180 Days", details: "Unlimited", transactionId: "33223JKL", date: "11/03/2022" },
    { planName: "Data Plan", amountPaid: "Rs. 159", validity: "28 Days", details: "120GB/Plan", transactionId: "66556BNM", date: "06/02/2022" },
    { planName: "Data Plan", amountPaid: "Rs. 199", validity: "28 Days", details: "200GB/Plan", transactionId: "99889VBN", date: "01/01/2022" }
];


    const itemsPerPage = 5;
    let currentPage = 1;

    function renderTable(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = invoices.slice(start, end);

        const tableBody = document.getElementById("invoiceTable");
        tableBody.innerHTML = "";

        paginatedItems.forEach((invoice, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${invoice.planName}</td>
                <td>${invoice.amountPaid}</td>
                <td>${invoice.validity}</td>
                <td>${invoice.details}</td>
                <td>${invoice.transactionId}</td>
                <td>${invoice.date}</td>
                <td><button class="btn btn-primary btn-download" onclick="downloadInvoice(${start + index})">Download</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    function downloadInvoice(index) {
        const invoice = invoices[index];
        const invoiceContent = `
            Plan Name: ${invoice.planName}
            Amount Paid: ${invoice.amountPaid}
            Validity: ${invoice.validity}
            Details: ${invoice.details}
            Transaction ID: ${invoice.transactionId}
            Date: ${invoice.date}
        `;
        const blob = new Blob([invoiceContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    }

    function nextPage() {
        if (currentPage * itemsPerPage < invoices.length) {
            currentPage++;
            renderTable(currentPage);
        }
    }

    
    renderTable(currentPage);