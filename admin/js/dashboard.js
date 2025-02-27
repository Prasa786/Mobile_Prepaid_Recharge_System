const subscribers = [
    { name: "Tony Stark", mobile: "+91 9234567890", plan: "Unlimited Plan", expiry: "2025-02-20", lastRecharge: "2025-01-20", notifyMobile: "+91 9876543212" },
    { name: "Steve Rogers", mobile: "+91 9876543210", plan: "Basic Plan", expiry: "2025-02-22", lastRecharge: "2025-01-18", notifyMobile: "+91 9876543213" },
    { name: "Bruce Banner", mobile: "+91 9123456789", plan: "Data Booster Plan", expiry: "2025-02-21", lastRecharge: "2025-01-19", notifyMobile: "+91 9876543214" },
    { name: "Natasha Romanoff", mobile: "+91 9988776655", plan: "Long validity Plan", expiry: "2025-02-23", lastRecharge: "2025-01-18", notifyMobile: "+91 9876543215" },
    { name: "Clint Barton", mobile: "+91 9876567890", plan: "Popular Plan", expiry: "2025-02-24", lastRecharge: "2025-01-18", notifyMobile: "+91 9876543216" }
];

function populateSubscribersTable() {
    const tbody = document.getElementById("expiring-subscribers-tbody");
    subscribers.forEach((subscriber, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${subscriber.name}</td>
            <td>${subscriber.mobile}</td>
            <td>${subscriber.plan}</td>
            <td>${subscriber.expiry}</td>
            <td>${subscriber.lastRecharge}</td>
            <td>
                <button class="btn btn-warning ms-2" onclick="notifyUser('${subscriber.name}', '${subscriber.notifyMobile}')">Notify User</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function notifyUser(name, mobile) {
    alert(`Notify User: ${name}, Mobile: ${mobile}`);
}

document.addEventListener("DOMContentLoaded", populateSubscribersTable);

document.querySelector('.sidebar-toggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
});


const revenueChart = new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue (₹)',
            data: [5000, 7000, 6000, 8000, 9000, 10000],
            borderColor: '#1abc9c',
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const subscriberChart = new Chart(document.getElementById('subscriberChart'), {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Subscribers',
            data: [100, 150, 200, 250, 300, 350],
            backgroundColor: '#3498db'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


function viewHistory(name, mobile, plan, date) {
    alert(`Viewing history for ${name} (${mobile}): ${plan} on ${date}`);
}


function notifyUser(name, mobile) {
    alert(`Notification sent to ${name} (${mobile}): Your plan is expiring soon!`);
}