document.addEventListener("DOMContentLoaded", function() {
    // Dane dla tabeli - symulacja danych z wypożyczalni samochodów
    const cars = [
        { id: 1, brand: "Toyota", model: "Corolla", year: 2020, pricePerDay: 150, availability: "Dostępny" },
        { id: 2, brand: "Ford", model: "Focus", year: 2019, pricePerDay: 120, availability: "Dostępny" },
        { id: 3, brand: "Volkswagen", model: "Golf", year: 2021, pricePerDay: 130, availability: "Niedostępny" },
        { id: 4, brand: "Honda", model: "Civic", year: 2018, pricePerDay: 140, availability: "Dostępny" },
        { id: 5, brand: "Hyundai", model: "Elantra", year: 2017, pricePerDay: 110, availability: "Dostępny" },
        { id: 6, brand: "Kia", model: "Forte", year: 2020, pricePerDay: 125, availability: "Dostępny" },
        { id: 7, brand: "Chevrolet", model: "Malibu", year: 2019, pricePerDay: 135, availability: "Niedostępny" },
        { id: 8, brand: "Mazda", model: "Mazda3", year: 2018, pricePerDay: 145, availability: "Dostępny" },
        { id: 9, brand: "Chevrolet", model: "Malibu", year: 2019, pricePerDay: 135, availability: "Niedostępny" },
        { id: 10, brand: "Mazda", model: "Mazda3", year: 2018, pricePerDay: 145, availability: "Dostępny" },
        { id: 11, brand: "Chevrolet", model: "Malibu", year: 2019, pricePerDay: 135, availability: "Niedostępny" },
        { id: 12, brand: "Mazda", model: "Mazda3", year: 2018, pricePerDay: 145, availability: "Dostępny" },
        { id: 13, brand: "Ford", model: "Focus", year: 2019, pricePerDay: 120, availability: "Dostępny" },
        { id: 14, brand: "Volkswagen", model: "Golf", year: 2021, pricePerDay: 130, availability: "Niedostępny" },
        { id: 15, brand: "Honda", model: "Civic", year: 2018, pricePerDay: 140, availability: "Dostępny" },
    ];

    // Funkcja generująca wiersze tabeli
    function generateTableRows(data) {
        const tbody = document.querySelector("#carTable tbody");
        tbody.innerHTML = ""; // Wyczyść zawartość tbody

        data.forEach(car => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.id}</td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.pricePerDay}</td>
                <td>${car.availability}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Generowanie tabeli na podstawie danych
    generateTableRows(cars);
});
