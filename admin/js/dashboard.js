async function populateSubscribersTable() {
    const tbody = document.getElementById("expiring-subscribers-tbody");
    const token = localStorage.getItem('adminToken');

    try {
        if (!token) {
            window.location.href = "/admin/html/index.html"; 
            throw new Error("No token found in localStorage. Please log in again.");
        }
        
        const response = await fetch('http://localhost:8083/api/recharge-history', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch subscribers');
        }

        const subscribers = await response.json();
        subscribers.forEach((subscriber) => {
            const daysToExpiry = calculateDaysToExpiry(subscriber.expiryDate);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${subscriber.name}</td>
                <td>${subscriber.mobile}</td>
                <td>${subscriber.plan}</td>
                <td>${daysToExpiry} days</td>
                <td>${subscriber.lastRecharge}</td>
                <td>
                    <button class="btn btn-warning ms-2" onclick="notifyUser ('${subscriber.name}', '${subscriber.mobile}', '${subscriber.email}')">Notify User</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
    }
}

function calculateDaysToExpiry(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - today;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

async function notifyUser (name, mobile, email) {
    const token = localStorage.getItem('adminToken');
    const notificationMessage = `Dear ${name}, your plan is expiring soon! Please take action to renew it.`;

    try {
        const emailResponse = await fetch('http://localhost:8083/api/notifications/send-email', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, subject: 'Plan Expiry Notification', message: notificationMessage })
        });

        if (!emailResponse.ok) {
            throw new Error('Failed to send email notification');
        }

        alert(`Notification sent to ${name} (${mobile}): Your plan is expiring soon!`);
    } catch (error) {
        console.error('Error sending notification:', error);
        alert('Failed to send notification. Please try again.');
    }
}

document.addEventListener("DOMContentLoaded", populateSubscribersTable);

const revenueChart = new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue (₹)',
            data: [8000, 9000, 7500, 6000, 9000, 7000],
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
            data: [200, 250, 150, 100, 200, 180],
            backgroundColor: '#3498db'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});