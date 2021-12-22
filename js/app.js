// Variables
let employees = [];
const url = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const grid = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Fetch API
fetch(url)
    .then(response => response.json())
    .then(response => response.results)
    .then(displayMembers)
    .catch(err => console.log(err));

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
            <div class="card" data-index="${index}">
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

function displayModal(index) {
    let modalHTML = '';

    for (i = index; i < index + 1; i ++) {
        let name = `${employees[index].name.first} ${employees[index].name.last}`;
        let email = employees[index].email;
        let city = employees[index].location.city;
        let picture = employees[index].picture.large;
        let phone = employees[index].phone;
        let street =  employees[index].location.street.name;
        let number = employees[index].location.street.number;
        let state = employees[index].location.state;
        let postcode = employees[index].location.postcode;

        modalHTML = `
            <img class="avatar" src="${picture}" />
            <div class="text-container">
                <h2 class="name">${name}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="address">${number} ${street}, ${state} ${postcode}</p>
                <p>Birthday: Moet nog</p>
            </div>
        `;
    }
    
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
};

grid.addEventListener('click', e => {
    if (e.target !== grid) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});
    