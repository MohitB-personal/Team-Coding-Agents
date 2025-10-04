
let expenses = [
    { id: 1, employee: "John Doe", date: "2024-10-01", category: "Travel", description: "Business trip to London", amount: 1250.00, receipt: "flight_hotel.pdf", status: "Pending" },
    { id: 2, employee: "Jane Smith", date: "2024-09-28", category: "Meals", description: "Team lunch with client", amount: 95.50, receipt: "receipt_95.png", status: "Approved" },
    { id: 3, employee: "John Doe", date: "2024-09-25", category: "Office Supplies", description: "Ergonomic keyboard purchase", amount: 145.99, receipt: "keyboard_receipt.jpg", status: "Rejected" },
    { id: 4, employee: "Jane Smith", date: "2024-10-02", category: "Miscellaneous", description: "Software subscription renewal", amount: 50.00, receipt: "sub_invoice.pdf", status: "Pending" },
];

const countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
    "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
    "Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
    "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
    "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo",
    "Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica",
    "Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia",
    "Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
    "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan",
    "Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon",
    "Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
    "Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
    "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
    "North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea",
    "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
    "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
    "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan",
    "Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
    "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
    "Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
    "United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
    "Yemen","Zambia","Zimbabwe"
];

function showNotification(message) {
    const box = document.getElementById("notification-box");
    if (!box) {
        console.error("Notification box not found. Message:", message);
        return;
    }
    box.textContent = message;
    box.style.display = "block";
    setTimeout(() => {
        box.style.display = "none";
    }, 3000);
}


document.addEventListener("DOMContentLoaded", () => {
    
    const countrySelect = document.getElementById("country");
    if (countrySelect) {
        
        countrySelect.innerHTML = '<option value="">Select Country</option>';
        countries.forEach(country => {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });
    }

   
    if (document.getElementById("employee-expenses-table")) {
        renderEmployeeTable();
    }
    if (document.getElementById("manager-approvals-table")) {
        renderManagerTable();
    }


    const expenseForm = document.getElementById("expenseForm");
    if (expenseForm) {
        expenseForm.addEventListener("submit", submitExpense);
    }
});


function login(event) {
    event.preventDefault();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (email && password) {
        
        window.location.href = "admin.html";
    } else {
        showNotification("Please enter valid credentials.");
    }
}


function signup(event) {
    event.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("signupEmail")?.value.trim();
    const password = document.getElementById("signupPassword")?.value.trim();
    const confirm = document.getElementById("confirmPassword")?.value.trim();
    const country = document.getElementById("country")?.value;

    if (!name || !email || !password || !confirm || !country) {
        showNotification("Please fill all fields!");
        return;
    }
    if (password !== confirm) {
        showNotification("Passwords do not match!");
        return;
    }

    
    showNotification("Signup successful! Redirecting to login...");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}


function logout() {
    showNotification("Logging out...");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
}

function demoAction(action) {
    showNotification("You clicked on " + action + " (demo only).");
}


function openModal() {
    document.getElementById("expenseModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("expenseModal").style.display = "none";
}

function submitExpense(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const receiptFile = document.getElementById("receipt").files[0];

    if (!date || !category || !description || isNaN(amount) || amount <= 0) {
        showNotification("Please fill out all required expense details correctly.");
        return;
    }

    const newExpense = {
        id: expenses.length + 1,
        employee: "John Doe", 
        date: date,
        category: category,
        description: description,
        amount: amount,
        receipt: receiptFile ? receiptFile.name : "N/A",
        status: "Pending"
    };

    expenses.push(newExpense);
    showNotification(`Expense for $${amount.toFixed(2)} submitted successfully!`);
    closeModal();
    document.getElementById("expenseForm").reset(); // Clear the form
    renderEmployeeTable(); // Refresh the table
}

// --- Table Rendering Functions ---

function renderEmployeeTable() {
    const tableBody = document.querySelector("#employee-expenses-table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const employeeExpenses = expenses.filter(exp => exp.employee === "John Doe").sort((a, b) => new Date(b.date) - new Date(a.date));

    employeeExpenses.forEach(exp => {
        const row = document.createElement("tr");
        const statusClass = exp.status.toLowerCase();
        const statusBadge = `<span class="status-badge status-${statusClass}">${exp.status}</span>`;

        row.innerHTML = `
            <td>${exp.date}</td>
            <td>${exp.category}</td>
            <td>${exp.description}</td>
            <td>$${exp.amount.toFixed(2)}</td>
            <td><a href="#" onclick="showNotification('Downloading ${exp.receipt}...'); return false;">${exp.receipt}</a></td>
            <td>${statusBadge}</td>
        `;
        tableBody.appendChild(row);
    });
}

function renderManagerTable() {
    const tableBody = document.querySelector("#manager-approvals-table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = ""; 

    const sortedExpenses = expenses.sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return new Date(a.date) - new Date(b.date);
    });

    sortedExpenses.forEach(exp => {
        const row = document.createElement("tr");
        const statusClass = exp.status.toLowerCase().replace(' ', '-');
        const statusBadge = `<span class="status-badge status-${statusClass}">${exp.status}</span>`;

        let actionButtons = '';
        if (exp.status === "Pending") {
            actionButtons = `
                <button class="btn-action btn-approve" onclick="updateStatus(${exp.id}, 'Approved')">Approve</button>
                <button class="btn-action btn-reject" onclick="updateStatus(${exp.id}, 'Rejected')">Reject</button>
            `;
        } else {
            actionButtons = 'No Action';
        }

        row.innerHTML = `
            <td>#PROJ-00${exp.id}</td>
            <td>${exp.date}</td>
            <td>${exp.employee}</td>
            <td>${exp.category}</td>
            <td>$${exp.amount.toFixed(2)}</td>
            <td>${statusBadge}</td>
            <td>
                <div class="action-buttons">
                    ${actionButtons}
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateStatus(id, status) {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
        expense.status = status;
        showNotification(`Expense ID ${id} has been ${status.toLowerCase()}.`);
        renderManagerTable();
    }
}
