document.querySelector('.sidebar-toggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
});

function viewHistory(name, mobile, plan, date) {
    alert(`Viewing history for ${name} (${mobile}): ${plan} on ${date}`);
}

function notifyUser(name, mobile) {
    alert(`Notification sent to ${name} (${mobile}): Your plan is expiring soon!`);
}


function exportToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    let csvContent = '';

    rows.forEach(row => {
        const rowData = [];
        const cols = row.querySelectorAll('td, th');
        cols.forEach(col => {
            rowData.push(col.innerText);
        });
        csvContent += rowData.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}


function exportToPDF(tableId, filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    let y = 10;

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        let x = 10;
        cols.forEach(col => {
            doc.text(col.innerText, x, y);
            x += 40;
        });
        y += 10;
    });

    doc.save(filename);
}