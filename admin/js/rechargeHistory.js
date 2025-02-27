document.getElementById('search').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#history-table tbody tr');

    rows.forEach(row => {
        const planName = row.cells[0].textContent.toLowerCase();
        const date = row.cells[1].textContent.toLowerCase();
        const amount = row.cells[2].textContent.toLowerCase();
        const paymentMode = row.cells[3].textContent.toLowerCase();
        const status = row.cells[4].textContent.toLowerCase();

        if (
            planName.includes(searchValue) ||
            date.includes(searchValue) ||
            amount.includes(searchValue) ||
            paymentMode.includes(searchValue) ||
            status.includes(searchValue)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});