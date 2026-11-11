
/* =====================================
   WIZARD EMPORIUM
   COMPLETE SHOPPING FUNCTIONALITY
===================================== */


// PRODUCT DATABASE

const products = [

    {
        id: 1,
        name: "Enchanted Elder Wand",
        price: 1499,
        category: "wands",
        icon: "🪄",
        description: "An elegant handcrafted fantasy wand."
    },

    {
        id: 2,
        name: "Phoenix Feather Wand",
        price: 999,
        category: "wands",
        icon: "🪄",
        description: "A beautiful wand inspired by the phoenix."
    },

    {
        id: 3,
        name: "Dragon Heart Wand",
        price: 1299,
        category: "wands",
        icon: "🪄",
        description: "A mysterious dragon-inspired collectible."
    },

    {
        id: 4,
        name: "Midnight Potion Set",
        price: 899,
        category: "potions",
        icon: "🧪",
        description: "Decorative potion bottles for your collection."
    },

    {
        id: 5,
        name: "Liquid Luck Bottle",
        price: 999,
        category: "potions",
        icon: "🍾",
        description: "A magical-looking collectible bottle."
    },

    {
        id: 6,
        name: "Ancient Spellbook",
        price: 1199,
        category: "books",
        icon: "📖",
        description: "An antique-style fantasy journal."
    },

    {
        id: 7,
        name: "Wizard's Secret Journal",
        price: 699,
        category: "books",
        icon: "📚",
        description: "A beautiful notebook for magical ideas."
    },

    {
        id: 8,
        name: "Golden Crystal Ball",
        price: 1499,
        category: "balls",
        icon: "🔮",
        description: "A mystical decorative crystal orb."
    },

    {
        id: 9,
        name: "Mystic Mini Orb",
        price: 599,
        category: "balls",
        icon: "🔮",
        description: "A miniature fantasy crystal collectible."
    },

    {
        id: 10,
        name: "Snowy Owl Plush",
        price: 899,
        category: "owls",
        icon: "🦉",
        description: "A soft owl-themed fantasy plush toy."
    },

    {
        id: 11,
        name: "Wizard Robe",
        price: 1999,
        category: "robes",
        icon: "🧙",
        description: "A premium fantasy wizard robe costume."
    },

    {
        id: 12,
        name: "Wizard Hat",
        price: 599,
        category: "robes",
        icon: "🎩",
        description: "A classic pointed wizard costume hat."
    },

    {
        id: 13,
        name: "Golden Snitch Prop",
        price: 799,
        category: "quidditch",
        icon: "🏆",
        description: "A golden fantasy sports collectible."
    },

    {
        id: 14,
        name: "Quidditch Ball Set",
        price: 1499,
        category: "quidditch",
        icon: "⚽",
        description: "A decorative magical sports ball set."
    },

    {
        id: 15,
        name: "Golden Sky Broom",
        price: 2499,
        category: "brooms",
        icon: "🧹",
        description: "A fantasy broomstick display collectible."
    },

    {
        id: 16,
        name: "Mini Flying Broom",
        price: 899,
        category: "brooms",
        icon: "🧹",
        description: "A miniature decorative broomstick."
    }

];


// STORAGE

let cart = JSON.parse(
    localStorage.getItem("wizardCart")
) || [];

let wishlist = JSON.parse(
    localStorage.getItem("wizardWishlist")
) || [];


// ELEMENTS

const productGrid = document.getElementById("productGrid");

const cartDrawer = document.getElementById("cartDrawer");

const wishlistDrawer = document.getElementById("wishlistDrawer");

const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");

const wishlistItems = document.getElementById("wishlistItems");


// FORMAT PRICE

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "wizardCart",
        JSON.stringify(cart)
    );

}


// SAVE WISHLIST

function saveWishlist() {

    localStorage.setItem(
        "wizardWishlist",
        JSON.stringify(wishlist)
    );

}


// DISPLAY PRODUCTS

function displayProducts(list = products) {

    productGrid.innerHTML = "";

    document.getElementById("resultCount").textContent =
        list.length + " magical products found";

    if (list.length === 0) {

        productGrid.innerHTML =
            "<p>No magical products found. Try another search!</p>";

        return;

    }

    list.forEach(product => {

        const isWishlisted = wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image ${product.category}">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4 class="product-price">
                    ${formatPrice(product.price)}
                </h4>

                <button class="add-cart-btn"
                    data-id="${product.id}">
                    ADD TO CART
                </button>

                <button class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    data-id="${product.id}">
                    ${isWishlisted ? "♥ Wishlisted" : "♡ Wishlist"}
                </button>

                <button class="details-btn"
                    data-id="${product.id}">
                    VIEW DETAILS
                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// ADD TO CART

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    displayCart();

    alert("✨ " + product.name + " added to your cart!");

}


// DISPLAY CART

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>🪄 Your cart is empty!</h2>
                <p>Discover some magical treasures.</p>
            </div>
        `;

    }

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        const name = document.createElement("h3");
        name.textContent = item.icon + " " + item.name;

        const price = document.createElement("p");
        price.textContent = "Price: " + formatPrice(item.price);

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const subtotalText = document.createElement("p");
        subtotalText.textContent = "Subtotal: " + formatPrice(subtotal);

        const decrease = document.createElement("button");
        decrease.textContent = "−";
        decrease.addEventListener("click", () => changeQuantity(item.id, -1));

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.addEventListener("click", () => changeQuantity(item.id, 1));

        const remove = document.createElement("button");
        remove.textContent = "REMOVE";
        remove.addEventListener("click", () => removeFromCart(item.id));

        div.append(
            name,
            price,
            quantity,
            subtotalText,
            decrease,
            increase,
            remove
        );

        cartItems.appendChild(div);

    });

    document.getElementById("cartTotal").textContent =
        "Total: " + formatPrice(total);

    document.getElementById("cartCount").textContent = count;

}


// CHANGE QUANTITY

function changeQuantity(id, amount) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(id);

    } else {

        saveCart();

        displayCart();

    }

}


// REMOVE PRODUCT

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    displayCart();

}


// CLEAR CART

document.getElementById("clearCart")
    .addEventListener("click", function() {

        if (cart.length === 0) return;

        if (confirm("Remove all magical products from your cart?")) {

            cart = [];

            saveCart();

            displayCart();

        }

    });


// WISHLIST

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(
            item => item !== id
        );

    } else {

        wishlist.push(id);

    }

    saveWishlist();

    displayProducts();

    displayWishlist();

}


// DISPLAY WISHLIST

function displayWishlist() {

    wishlistItems.innerHTML = "";

    const savedProducts = products.filter(
        product => wishlist.includes(product.id)
    );

    if (savedProducts.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <h2>♡ No favourites yet!</h2>
                <p>Save your favourite magical treasures.</p>
            </div>
        `;

        return;

    }

    savedProducts.forEach(product => {

        const div = document.createElement("div");

        div.className = "cart-item";

        const name = document.createElement("h3");
        name.textContent = product.icon + " " + product.name;

        const price = document.createElement("p");
        price.textContent = formatPrice(product.price);

        const add = document.createElement("button");
        add.textContent = "ADD TO CART";
        add.addEventListener("click", () => addToCart(product.id));

        const remove = document.createElement("button");
        remove.textContent = "REMOVE";
        remove.addEventListener("click", () => toggleWishlist(product.id));

        div.append(name, price, add, remove);

        wishlistItems.appendChild(div);

    });

}


// SEARCH

document.getElementById("searchInput")
    .addEventListener("input", filterProducts);


// FILTER

document.getElementById("categoryFilter")
    .addEventListener("change", filterProducts);


// SORT

document.getElementById("sortFilter")
    .addEventListener("change", filterProducts);


function filterProducts() {

    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("categoryFilter")
        .value;

    const sort = document.getElementById("sortFilter")
        .value;

    let filtered = products.filter(product => {

        const matchesName =
            product.name.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesName && matchesCategory;

    });

    if (sort === "low") {

        filtered.sort((a, b) => a.price - b.price);

    } else if (sort === "high") {

        filtered.sort((a, b) => b.price - a.price);

    } else if (sort === "name") {

        filtered.sort((a, b) => a.name.localeCompare(b.name));

    }

    displayProducts(filtered);

}


// CATEGORY CLICK

document.querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener("click", function() {

            const category = this.dataset.filter;

            document.getElementById("categoryFilter").value =
                category;

            filterProducts();

        });

    });


// PRODUCT GRID BUTTONS

productGrid.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);

    if (button.classList.contains("add-cart-btn")) {

        addToCart(id);

    }

    if (button.classList.contains("wishlist-btn")) {

        toggleWishlist(id);

    }

    if (button.classList.contains("details-btn")) {

        showProductDetails(id);

    }

});


// PRODUCT DETAILS MODAL

function showProductDetails(id) {

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    document.getElementById("modalContent").innerHTML = `
        <div style="font-size:80px">${product.icon}</div>

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <h3>${formatPrice(product.price)}</h3>

        <button class="add-modal" id="modalAdd">
            ADD TO CART
        </button>
    `;

    document.getElementById("modalAdd")
        .addEventListener("click", function() {

            addToCart(id);

        });

    document.getElementById("productModal")
        .classList.add("show");

}


// CLOSE MODAL

document.getElementById("modalClose")
    .addEventListener("click", function() {

        document.getElementById("productModal")
            .classList.remove("show");

    });

document.getElementById("productModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            this.classList.remove("show");

        }

    });


// OPEN CART

document.getElementById("cartOpen")
    .addEventListener("click", function() {

        cartDrawer.classList.add("open");

        wishlistDrawer.classList.remove("open");

        overlay.classList.add("show");

    });


// CLOSE CART

document.getElementById("cartClose")
    .addEventListener("click", closeDrawers);


// OPEN WISHLIST

document.getElementById("wishlistOpen")
    .addEventListener("click", function() {

        displayWishlist();

        wishlistDrawer.classList.add("open");

        cartDrawer.classList.remove("open");

        overlay.classList.add("show");

    });


// CLOSE WISHLIST

document.getElementById("wishlistClose")
    .addEventListener("click", closeDrawers);


// CLOSE DRAWERS

function closeDrawers() {

    cartDrawer.classList.remove("open");

    wishlistDrawer.classList.remove("open");

    overlay.classList.remove("show");

}

overlay.addEventListener("click", closeDrawers);


// CHECKOUT DEMO

document.getElementById("checkoutBtn")
    .addEventListener("click", function() {

        if (cart.length === 0) {

            alert("Your magical cart is empty!");

            return;

        }

        alert(
            "✨ Your cart is ready!\n\n" +
            "Checkout and secure payment will be added in the next stage."
        );

    });


// INITIALIZE WEBSITE

displayProducts();

displayCart();

displayWishlist();

console.log("✨ Wizard Emporium is ready!");
