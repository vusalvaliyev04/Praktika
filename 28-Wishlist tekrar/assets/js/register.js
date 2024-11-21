
document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let form = document.querySelector(".form");
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let confirmPassword = document.querySelector("#confirm-password");
    let passwordCheck = document.querySelector("#password-check");

    // 3) Sifre Minimum 8 simvol; ən azı bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol (məsələn, @, #, $, %, &).  
    function isPasswordStrong(password) {
        let strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        return strongPasswordRegex.test(password);
    }
     // 2) Email - Düzgün e-poçt formatında olmalıdır (məsələn, user@example.com).
    function isValidEmail(email) {
        let atSymbolIndex = email.indexOf('@');
        if (atSymbolIndex === -1 || email.indexOf(' ') !== -1) {
            return false;
        }
        let domainPart = email.slice(atSymbolIndex + 1);
        if (domainPart.indexOf('.') === -1) {
            return false;
        }

        return true;
    }

    function validateForm() {
        let usernameError = document.querySelector("#username-error");
        let emailError = document.querySelector("#email-error");
        let passwordError = document.querySelector("#password-error");
        let confirmPasswordError = document.querySelector("#confirm-password-error");

        let isValid = true;

        // 1) Username - Minimum 3, maksimum 20 simvol; yalnız əlifba, rəqəm, alt xətt və tire istifadə oluna bilər.
        let usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        if (!usernameRegex.test(username.value)) {
            usernameError.textContent = "Invalid username (3-20 characters, alphanumeric, _, -)";
            isValid = false;
        } else {
            usernameError.textContent = "";
        }

        if (!isValidEmail(email.value)) {
            emailError.textContent = "Invalid email format";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        
        // 6) İstifadəçi şifrəsi güclü olmalıdır, zəif şifrələr qəbul edilməməlidir.(Sifre guclu oldugu halda yasil check isaresi inputun saginda gorunmelidir eks halda qirmizi gorunmelidir)
        if (!isPasswordStrong(password.value)) {
            passwordError.textContent = "Weak password. Include upper, lower, number, special character.";
            passwordCheck.className = "fas fa-times invalid";
            isValid = false;
        } else {
            passwordError.textContent = "";
            passwordCheck.className = "fas fa-check valid";
        }

        // 4) Sifre-tesdiqi: Qeydiyyat zamanı daxil edilən şifrə ilə uyğun olmalıdır.  
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "Passwords do not match";
            isValid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        return isValid;
    }

    function register(e) {
        e.preventDefault();

        if (!validateForm()) return;

        let id = uuidv4();
        // 5) Qeydiyyat zamanı daxil edilən istifadəçi adı və e-poçt sistemdə mövcud olmamalıdır. Eyni istifadəçi adı və ya e-poçt ilə qeydiyyat mümkün olmamalıdır.  
        let uniqueUser = users.some(
            (user) => user.username === username.value || user.email === email.value
        );

        if (!uniqueUser) {
            let newUser = {
                username: username.value,
                email: email.value,
                password: password.value,
                id: id,
                wishList: [],
            };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            toast("User registered successfully");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            toast("Username or email already exists");
        }
    }

    function toast(text) {
        Toastify({
            text: text,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }

    form.addEventListener("submit", register);
});
  


