const subscribers = [
    { name: 'Clint Barton', mobile: '+91 9876543212', plan: 'Unlimited Plan', expiryDate: '2025-02-20', lastRecharge: '2025-01-20', status: 'active' },
    { name: 'Natasha Romonoff', mobile: '+91 9876543213', plan: 'Basic Plan', expiryDate: '2025-02-22', lastRecharge: '2025-01-18', status: 'active' },
    { name: 'Tony Stark', mobile: '+91 9876543214', plan: 'Premium Plan', expiryDate: '2025-03-01', lastRecharge: '2025-02-01', status: 'active' },
    { name: 'Bruce Banner', mobile: '+91 9876543215', plan: 'Basic Plan', expiryDate: '2025-02-25', lastRecharge: '2025-01-25', status: 'active' },
    { name: 'Steve Rogers', mobile: '+91 9876543216', plan: 'Unlimited Plan', expiryDate: '2025-03-05', lastRecharge: '2025-02-05', status: 'active' },
    { name: 'Thor Odinson', mobile: '+91 9876543217', plan: 'Premium Plan', expiryDate: '2025-03-10', lastRecharge: '2025-02-10', status: 'inactive' },
    { name: 'Wanda Maximoff', mobile: '+91 9876543218', plan: 'Basic Plan', expiryDate: '2025-03-15', lastRecharge: '2025-02-15', status: 'active' },
    { name: 'Peter Parker', mobile: '+91 9876543219', plan: 'Unlimited Plan', expiryDate: '2025-03-20', lastRecharge: '2025-02-20', status: 'active' },
    { name: 'Carol Danvers', mobile: '+91 9876543220', plan: 'Premium Plan', expiryDate: '2025-03-25', lastRecharge: '2025-02-25', status: 'active' },
    { name: 'Scott Lang', mobile: '+91 9876543221', plan: 'Basic Plan', expiryDate: '2025-03-30', lastRecharge: '2025-02-30', status: 'inactive' },
    { name: 'Hope van Dyne', mobile: '+91 9876543222', plan: 'Unlimited Plan', expiryDate: '2025-04-05', lastRecharge: '2025-03-05', status: 'active' },
    { name: 'Sam Wilson', mobile: '+91 9876543223', plan: 'Premium Plan', expiryDate: '2025-04-10', lastRecharge: '2025-03-10', status: 'active' },
];

const rowsPerPage = 2;
let currentPage = 1;

function getStatusColor(status) {
    return status === 'active' ? 'green' : 'red';
}


function populateTable() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedSubscribers = subscribers.slice(start, end);

    const tableBody = document.getElementById('subscriber-table-body');
    tableBody.innerHTML = '';

    paginatedSubscribers.forEach(subscriber => {
        const row = `
            <tr>
                <td>${subscriber.name}</td>
                <td>${subscriber.mobile}</td>
                <td>${subscriber.plan}</td>
                <td>${subscriber.expiryDate}</td>
                <td>${subscriber.lastRecharge}</td>
                <td style="color: ${getStatusColor(subscriber.status)};">${subscriber.status}</td>
                <td>
                    <button class="btn btn-info" onclick="viewHistory('${subscriber.name}', '${subscriber.mobile}', '${subscriber.plan}', '${subscriber.expiryDate}', '${subscriber.lastRecharge}')">View History</button>
                    <button class="btn btn-danger" onclick="deleteSubscriber('${subscriber.mobile}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}


document.getElementById('search').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#subscriber-list tbody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const mobile = row.cells[1].textContent.toLowerCase();

        if (name.includes(searchValue) || mobile.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});


function viewHistory(name, mobile, plan, expiryDate, lastRecharge) {
    
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';

    
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    
    popupContent.innerHTML = `
        <h3>Subscriber Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile No.:</strong> ${mobile}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Expiry Date:</strong> ${expiryDate}</p>
        <p><strong>Last Recharge:</strong> ${lastRecharge}</p>
        <button class="btn btn-primary" onclick="closePopup()">Close</button>
    `;

    
    popupOverlay.appendChild(popupContent);

    
    document.body.appendChild(popupOverlay);
}


function closePopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    if (popupOverlay) {
        document.body.removeChild(popupOverlay);
    }
}


function deleteSubscriber(mobile) {
    const subscriber = subscribers.find(sub => sub.mobile === mobile);
    if (subscriber) {
        subscriber.status = 'inactive';
        populateTable();
    }
}


document.querySelectorAll('.pagination .page-item').forEach(item => {
    item.addEventListener('click', function () {
        const page = this.getAttribute('data-page');

        if (page === 'previous' && currentPage > 1) {
            currentPage--;
        } else if (page === 'next' && currentPage * rowsPerPage < subscribers.length) {
            currentPage++;
        } else if (!isNaN(page)) {
            currentPage = parseInt(page);
        }

        document.querySelectorAll('.pagination .page-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.pagination .page-item[data-page="${currentPage}"]`).classList.add('active');

        populateTable();
    });
});


populateTable();
