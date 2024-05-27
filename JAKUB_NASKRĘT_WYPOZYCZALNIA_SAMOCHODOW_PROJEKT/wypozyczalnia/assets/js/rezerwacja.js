document.getElementById('calculateTotal').addEventListener('click', function(event) {
    event.preventDefault();

    const rentalPrice = parseFloat(document.getElementById('rentalPrice').value) || 0;
    const driverChecked = document.getElementById('driver').checked;

    const date1 = new Date(document.getElementById('date').value);
    const date2 = new Date(document.getElementById('date2').value);

    const days = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
    const driverCost = driverChecked ? 400 * days : 0;

    const total = (rentalPrice * days) + driverCost;

    document.getElementById('totalPrice').innerText = total.toFixed(2) + 'zł';
});
