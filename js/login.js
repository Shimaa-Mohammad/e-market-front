function checkUser(role, email, password) {

    let users = JSON.parse(localStorage.getItem(role)) || [];
    let existUser = users.find(item => item.email === email && item.password === password);

    if (existUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("CurrentUser", JSON.stringify(existUser));
        return true; 
    }
    return false;
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var errorSpan = document.getElementById("login-error");

    var isCustomer = checkUser("customers", email, password);

    if (isCustomer) {
        errorSpan.style.display = "none";

        window.location.href = "index.html";
    } 
    else {
        errorSpan.textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
        errorSpan.style.display = "block";
    }
});