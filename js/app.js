// Variables
let employees = [];
const url = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const grid = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const searchbar = document.querySelector(".search");
const modal = document.querySelector(".modal");

// Fetch API
fetch(url)
    .then(response => response.json())
    .then(response => response.results)
    .then(displayMembers)
    .catch(error => console.log(error));

// Function that displays members from response
function displayMembers(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    // Loop through array of employees and for each employee add markup
    employees.forEach((employee, index) => {
        let name = `${employee.name.first} ${employee.name.last}`;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture.large;
        
        employeeHTML += `
            <div class="card" data-index="${index}" title="Click for more information">
                <img class="image" src="${picture}" alt="Profile picture">
                <div class="text-container">
                    <h2 class="name">${name}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;

        grid.innerHTML = employeeHTML;
    });
};

// Display the overlay
function displayModal(index) {
    let modalHTML = '';

    let employee = employees[index];
    let name = `${employee.name.first} ${employee.name.last}`;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture.large;
    let phone = employee.phone;
    let street =  employee.location.street.name;
    let number = employee.location.street.number;
    let state = employee.location.state;
    let postcode = employee.location.postcode;
    let date = new Date(employee.dob.date);

    modalHTML = `
        <img class="avatar" src="${picture}" />
        <div class="text-container">
            <h2 class="name">${name}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${number} ${street}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;

    // Add data index to modal for switch
    const indexAtt = document.createAttribute("DATA-MODALINDEX");
    indexAtt.value = index;
    modal.setAttributeNode(indexAtt);
};

// Function to switch between modals
document.addEventListener('keydown', event => {
    let index = modal.getAttribute('data-modalindex');

    // Increase or decrease index passed to displayModal
    if (event.key === "ArrowRight" && overlay.className === "overlay" && index < 11) {
        index++;
        displayModal(index);
        
    } else if (event.key === "ArrowLeft" && overlay.className === "overlay" && index > 0) {
        index--;
        displayModal(index);
    }
});

// Display the card to modal when clicked
grid.addEventListener('click', e => {
    if (e.target !== grid) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

// Hide modal when the X is clicked
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

// Filter by name
searchbar.addEventListener('input', () => {
    const names = document.getElementsByClassName("name");
    const cards = document.getElementsByClassName("card");

    for (i = 0; i < names.length; i++) {
        const name = names[i].textContent.toUpperCase();
        const card = cards[i];

        if (name.includes(searchbar.value.toUpperCase())) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        };
    }
});