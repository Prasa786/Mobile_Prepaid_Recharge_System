document.getElementById('notificationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const subscriberInput = document.getElementById('subscriberSelect');
    const messageInput = document.getElementById('messageContent');
    const subscriberError = document.getElementById('subscriberFeedback');
    const messageError = document.getElementById('messageFeedback');

    let isValid = true;

    if (subscriberInput.value.trim() === '') {
        subscriberInput.classList.add('is-invalid');
        subscriberError.classList.remove('d-none');
        isValid = false;
    } else {
        subscriberInput.classList.remove('is-invalid');
        subscriberError.classList.add('d-none');
    }

    if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        messageError.classList.remove('d-none');
        isValid = false;
    } else {
        messageInput.classList.remove('is-invalid');
        messageError.classList.add('d-none');
    }

    if (isValid) {
        const subscriberName = subscriberInput.value;
        const mobile = getMobileNumber(subscriberName);
        const notificationMessage = messageInput.value;

        if (!mobile) {
            alert('Subscriber not found!');
            return;
        }

        const token = localStorage.getItem('adminToken');

        try {

            if (!token) {
                window.location.href = "/admin/html/index.html"; 
                throw new Error("No token found in localStorage. Please log in again.");
            }
            
            const emailResponse = await fetch('http://localhost:8083/api/notifications/send-email', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: mobile, subject: 'Notification', message: notificationMessage })
            });

            if (!emailResponse.ok) {
                throw new Error('Failed to send email notification');
            }

            alert(`Notification sent to ${subscriberName}: ${notificationMessage}`);
            loadNotifications();
            this.reset();
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification. Please try again.');
        }
    }
});

function getMobileNumber(name) {
    const subscribers = [
        { name: 'Tony Stark', mobile: '9876543212' },
        { name: 'Steve Rogers', mobile: '9876543213' }
    ];

    const subscriber = subscribers.find(sub => sub.name === name);
    return subscriber ? subscriber.mobile : null;
}

function loadNotifications() {
    const notificationHistoryList = document.getElementById('notificationHistoryList');
    notificationHistoryList.innerHTML = '';

    notifications.forEach(notification => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${notification.id}</td>
            <td>${notification.name}</td>
            <td>${notification.mobile}</td>
            <td>${notification.message}</td>
            <td>${notification.dateSent}</td>
            <td><span class="badge ${notification.status === 'Pending' ? 'bg-warning' : 'bg-success'}">${notification.status}</span></td>
        `;
        notificationHistoryList.appendChild(row);
    });
}

const notifications = [
    {
        id: 1,
        name: 'Tony Stark',
        mobile: '9876543212',
        message: 'Your plan expires soon!',
        dateSent: '15/2/2025',
        status: 'Sent'
    },
    {
        id: 2,
        name: 'Steve Rogers',
        mobile: '9876543213',
        message: 'Recharge now & get 10% off',
        dateSent: '13/2/2025',
        status: 'Sent'
    }
];

loadNotifications();