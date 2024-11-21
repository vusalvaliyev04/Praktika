document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users"));
    let form = document.querySelector(".form");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    let loginAttempts = JSON.parse(localStorage.getItem("loginAttempts")) || {};

    function login(e) {
        e.preventDefault();

        if (!users) {
            toast("No users found");
            return;
        }

        if (!validateUsername(username.value)) {
            toast("Please enter a valid username or email.");
            return;
        }

        if (!validatePassword(password.value)) {
            toast("Password must be at least 8 characters long.");
            return;
        }

        let findUser = users.find((user) => user.username === username.value);

        if (findUser) {
            if (isAccountLocked(findUser)) {
                toast("Your account is temporarily locked due to too many failed login attempts. Please try again after 15 minutes.");
                return;
            }

            if (findUser.password === password.value) {
                findUser.isLogined = true;
                findUser.failedAttempts = 0;  
                localStorage.setItem("users", JSON.stringify(users));
                toast("User logged in successfully");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                handleFailedLogin(findUser);
                toast("Username or password is incorrect");
            }
        } else {
            toast("Username does not exist");
        }
    }

    function handleFailedLogin(user) {
        user.failedAttempts = (user.failedAttempts || 0) + 1;
        localStorage.setItem("users", JSON.stringify(users));

        if (user.failedAttempts >= 3) {
            let lockTime = Date.now() + 15 * 60 * 1000;  
            user.lockedUntil = lockTime;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }

    function isAccountLocked(user) {
        if (user.lockedUntil && Date.now() < user.lockedUntil) {
            return true;
        }
        return false;
    }

    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return usernameRegex.test(username) || username.length > 3;
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function toast(text) {
        Toastify({
            text: `${text}`,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }

    form.addEventListener("submit", login);
});
