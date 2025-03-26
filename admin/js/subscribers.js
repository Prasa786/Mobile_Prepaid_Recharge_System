const subscribers = [
    { username: 'BarackObama', email: 'barack.obama@example.com', mobile: '+91 9876543212', status: 'ACTIVE' },
    { username: 'JoeBiden', email: 'joe.biden@example.com', mobile: '+91 9876543213', status: 'ACTIVE' },
    { username: 'DonaldTrump', email: 'donald.trump@example.com', mobile: '+91 9876543214', status: 'ACTIVE' },
    { username: 'Elon Musk', email: 'elon.musk@example.com', mobile: '+91 9876543215', status: 'ACTIVE' },
    { username: 'Arvind Kejriwal', email: 'arvind.kejriwal@example.com', mobile: '+91 9876543216', status: 'ACTIVE' },
    { username: 'Ethan Hunt', email: 'ethan.hunt@example.com', mobile: '+91 9876543217', status: 'INACTIVE' },
    { username: 'LeonardoDiCaprio', email: 'leonardo.dicaprio@example.com', mobile: '+91 9876543218', status: 'ACTIVE' },
    { username: 'BradPitt', email: 'brad.pitt@example.com', mobile: '+91 9876543219', status: 'ACTIVE' },
    { username: 'TomCruise', email: 'tom.cruise@example.com', mobile: '+91 9876543220', status: 'ACTIVE' },
    { username: 'AngelinaJolie', email: 'angelina.jolie@example.com', mobile: '+91 9876543221', status: 'INACTIVE' },
    { username: 'TaylorSwift', email: 'taylor.swift@example.com', mobile: '+91 9876543222', status: 'ACTIVE' },
    { username: 'Narendra Modi', email: 'narendra.modi@example.com', mobile: '+91 9876543223', status: 'ACTIVE' },
    { username: 'Rahul Gandhi', email: 'rahul.gandhi@example.com', mobile: '+91 9976543217', status: 'ACTIVE' }
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
                <td>${subscriber.username}</td>
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
        <p><strong>Name:</strong> ${username}</p>
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