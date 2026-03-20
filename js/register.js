function validateName(name) {

    var regexName = /^[a-zA-Z\u0600-\u06FF]{2,}\s[a-zA-Z\u0600-\u06FF]{2,}/;
    return regexName.test(name);
}

function validateEmail(email) {
    var regexEmail = /^[a-zA-Z0-9._+-]+@gmail\.com$/;
    return regexEmail.test(email);
}

function validatePassword(password) {

    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regexPassword.test(password);
}

// --- Live Validation (Blur Event) ---
const inputs = ["name", "email", "password"];

inputs.forEach(id => {
    document.getElementById(id).addEventListener("blur", function () {
        let isValid = false;
        if (id === "name") isValid = validateName(this.value.trim());
        if (id === "email") isValid = validateEmail(this.value.trim());
        if (id === "password") isValid = validatePassword(this.value.trim());

        if (!isValid) {
            this.style.border = "2px solid red";
            document.getElementById(`${id}-error`).style.display = "block";
        } else {
            this.style.border = "2px solid green";
            document.getElementById(`${id}-error`).style.display = "none";
        }
    });
});

// --- Form Validation Function ---
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let valid = true;

    if (!validateName(name)) {
        document.getElementById("name-error").style.display = "block";
        valid = false;
    }
    if (!validateEmail(email)) {
        document.getElementById("email-error").style.display = "block";
        valid = false;
    }
    if (!validatePassword(password)) {
        document.getElementById("password-error").style.display = "block";
        valid = false;
    }

    return valid;
}

// --- Submit Handler ---
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const newUser = {
            name,
            email,
            password,
            role: "customer"
        };

        let storedCustomers = JSON.parse(localStorage.getItem("customers")) || [];

        const existCustomer = storedCustomers.find(item => item.email === email);

        if (existCustomer) {
            const alreadyAlert = document.getElementById("already-regiter");
            alreadyAlert.style.top = "20px";
            setTimeout(() => alreadyAlert.style.top = "-100px", 3000);
        } else {
            storedCustomers.push(newUser);
            localStorage.setItem("customers", JSON.stringify(storedCustomers));

            const successAlert = document.getElementById("success-regiter");
            successAlert.style.top = "20px";
            
            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 2000);
        }
    }
});