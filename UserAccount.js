document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById('dataUsageChart').getContext('2d');
    new Chart(ctx, {
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
});

function toggleProfileEdit() {
    var profileEdit = document.getElementById('profileEdit');
    if (profileEdit.style.display === "none") {
        profileEdit.style.display = "block";
    } else {
        profileEdit.style.display = "none";
    }
}

function saveProfile() {
    var name = document.getElementById('nameInput').value;
    var phone = document.getElementById('phoneInput').value;
    var altPhone = document.getElementById('altPhoneInput').value;
    var email = document.getElementById('emailInput').value;

    document.getElementById('nameDisplay').textContent = name;
    document.getElementById('phoneNumberDisplay').textContent = phone;
    document.getElementById('altPhoneNumberDisplay').textContent = altPhone;
    document.getElementById('emailDisplay').textContent = email;
}