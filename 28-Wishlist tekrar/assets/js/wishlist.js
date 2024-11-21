document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "login.html";
        toast("You must be logged in to view your wishlist");
    }

    function createWishlistItem(product) {
        let wishlistItem = document.createElement("div");
        wishlistItem.classList.add("wishlist-item");
        
        let image = document.createElement("div");
        image.classList.add("image");
        
        let img = document.createElement("img");
        let title = document.createElement("h5");
        title.classList.add("title");
        
        let category = document.createElement("p");
        category.classList.add("category");
        
        let price = document.createElement("p");
        price.classList.add("price");
        
        let removeBtn = document.createElement("button");
        removeBtn.classList.add("btn", "btn-danger", "remove-btn");
        removeBtn.textContent = "Remove";

        let heartIcon = document.createElement("i");
        heartIcon.classList.add("fa", "fa-heart");
        heartIcon.classList.add(currentUser.wishList.some((item) => item.id === product.id) ? "liked" : "unliked");
        
        heartIcon.addEventListener("click", () => {
            if (heartIcon.classList.contains("unliked")) {
                heartIcon.classList.remove("unliked");
                heartIcon.classList.add("liked");
                addItemToWishlist(product);
            } else {
                heartIcon.classList.remove("liked");
                heartIcon.classList.add("unliked");
                removeItemFromWishlist(product.id);
            }
        });

       
        removeBtn.addEventListener("click", () => {
            removeItemFromWishlist(product.id);
        });

        function addItemToWishlist(product) {
            currentUser.wishList.push(product);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            toast("Item added to wishlist");
        }

        function removeItemFromWishlist(productId) {
            currentUser.wishList = currentUser.wishList.filter(item => item.id !== productId);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            toast("Item removed from wishlist");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }

        image.appendChild(img);
        wishlistItem.append(image, title, category, price, removeBtn, heartIcon);
        
        let wishlistContainer = document.querySelector(".wishlist");
        wishlistContainer.appendChild(wishlistItem);

        img.src = product.image;
        title.textContent = product.title.slice(0, 15) + "...";
        category.textContent = product.category;
        price.textContent = `$ ${product.price}`;
    }

    if (currentUser.wishList.length > 0) {
        currentUser.wishList.forEach((product) => {
            createWishlistItem(product);
        });
    } else {
        let empty = document.createElement("h3");
        empty.textContent = "Your wishlist is empty";
        let wishlistContainer = document.querySelector(".wishlist");
        wishlistContainer.appendChild(empty);
    }

    function toast(text) {
        Toastify({
            text: text,
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            },
        }).showToast();
    }

    let logoutBtn = document.querySelector("#logout-btn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        toast("You have logged out");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    });
});
