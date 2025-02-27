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


const planChart = new Chart(document.getElementById('planChart'), {
    type: 'doughnut',
    data: {
        labels: ['Basic Plan', 'Unlimited Plan', 'Data Booster Plan'],
        datasets: [{
            label: 'Plan Popularity',
            data: [30, 50, 20],
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


const paymentChart = new Chart(document.getElementById('paymentChart'), {
    type: 'pie',
    data: {
        labels: ['UPI', 'Credit Card', 'Debit Card', 'Bank Transfer'],
        datasets: [{
            label: 'Payment Mode Distribution',
            data: [40, 30, 20, 10],
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});