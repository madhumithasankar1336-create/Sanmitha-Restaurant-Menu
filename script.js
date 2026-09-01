// Food Details

let foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 199,
        emoji: "🍕",
        spice: "Mild"
    },

    {
        id: 2,
        name: "Chicken Burger",
        category: "Burger",
        price: 149,
        emoji: "🍔",
        spice: "Medium"
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 220,
        emoji: "🍚",
        spice: "Spicy"
    },

    {
        id: 4,
        name: "Lime Soda",
        category: "Drinks",
        price: 80,
        emoji: "🥤",
        spice: "Mild"
    },

    {
        id: 5,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 120,
        emoji: "🍰",
        spice: "Mild"
    },

    {
        id: 6,
        name: "Cheese Pizza",
        category: "Pizza",
        price: 299,
        emoji: "🍕",
        spice: "Medium"
    }
];

let cart = [];
let favourites = [];
function displayFoods(foodList) {
    let menu = document.getElementById("menuContainer");
    menu.innerHTML = "";
    for (let i = 0; i < foodList.length; i++) {
        let food = foodList[i];
        menu.innerHTML += `
            <div class="food-card">
                <div class="food-image">
                    ${food.emoji}
                </div>
                <h3>${food.name}</h3>
                <p>${food.category}</p>
                <p>🌶️ ${food.spice}</p>
                <p class="price">
                    ₹${food.price}
                </p>
                <button onclick="addFavourite(${food.id})">
                    ❤️
                </button>
                <button onclick="addCart(${food.id})">
                    🛒 Add Cart
                </button>
            </div>
        `;
    }
}
displayFoods(foods);
function filterFood(category) {
    if (category == "All") {
        displayFoods(foods);
    } else {
        let result = foods.filter(function(food) {
            return food.category == category;
        });
        displayFoods(result);
    }
}
document
    .getElementById("searchInput")
    .addEventListener("input", function() {
        let search =
            this.value.toLowerCase();
        let result = foods.filter(function(food) {
            return food.name
                .toLowerCase()
                .includes(search);

        });
        displayFoods(result);

    });
function addCart(id) {
    let food = foods.find(function(food) {
        return food.id == id;
    });
    let existingFood = cart.find(function(item) {
        return item.id == id;
    });
    if (existingFood) {
        existingFood.quantity++;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            emoji: food.emoji,
            quantity: 1

        });
    }
    displayCart();
}
function displayCart() {
    let cartBox =
        document.getElementById("cartItems");
    cartBox.innerHTML = "";
    let total = 0;
    if (cart.length == 0) {
        cartBox.innerHTML =
            "Your cart is empty.";
    }
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let itemTotal =
            item.price * item.quantity;
        total = total + itemTotal;
        cartBox.innerHTML += `
            <div class="cart-item">
                <span>
                    ${item.emoji}
                    ${item.name}
                </span>
                <div class="quantity-controls">
                    <button
                        onclick="decreaseQuantity(${item.id})">
                        -
                    </button>
                    <span>
                        ${item.quantity}
                    </span>
                    <button
                        onclick="increaseQuantity(${item.id})">
                        +
                    </button>
                </div>
                <span>
                    ₹${itemTotal}
                </span>
                <button
                    onclick="removeCart(${item.id})">
                    ❌
                </button>
            </div>
        `;
    }
    document.getElementById("totalPrice")
        .innerText = total;
}
function increaseQuantity(id) {
    let item = cart.find(function(item) {
        return item.id == id;

    });
    item.quantity++;
    displayCart();
}
function decreaseQuantity(id) {
    let item = cart.find(function(item) {
        return item.id == id;
    });
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeCart(id);

    }
    displayCart();
}

function removeCart(id) {
    cart = cart.filter(function(item) {
        return item.id != id;
    });
    displayCart();
}
function addFavourite(id) {
    if (favourites.includes(id)) {
        favourites = favourites.filter(function(item) {
            return item != id;
        });
        alert("Removed from favourites");
    } else {
        favourites.push(id);
        alert("Added to favourites ❤️");
    }
    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );
}
function findBudgetFood() {
    let budget =
        Number(
            document.getElementById("budgetInput").value
        );
    let result =
        document.getElementById("budgetResult");
    if (budget <= 0) {
        result.innerHTML =
            "Please enter a valid budget.";

        return;
    }
    let affordableFoods =
        foods.filter(function(food) {
            return food.price <= budget;

        });
    result.innerHTML = "";
    for (let i = 0; i < affordableFoods.length; i++) {
        let food = affordableFoods[i];
        result.innerHTML += `
            <div class="budget-card">

                <h3>
                    ${food.emoji}
                    ${food.name}
                </h3>
                <p>
                    ₹${food.price}
                </p>
            </div>
        `;
    }
    if (affordableFoods.length == 0) {

        result.innerHTML =
            "No food available in this budget 😢";
    }
}
let randomNumber =
    Math.floor(Math.random() * foods.length);
let specialFood =
    foods[randomNumber];
document.getElementById("specialFood").innerHTML = `
    <div class="special-card">
        <div class="special-emoji">
            ${specialFood.emoji}
        </div>
        <h3>
            ${specialFood.name}
        </h3>
        <p>
            ⭐ Today's Special
        </p>
        <h3>
            ₹${specialFood.price}
        </h3>
    </div>
`;
document
    .getElementById("themeBtn")
    .addEventListener("click", function() {
     document.body.classList.toggle("dark");
        if (
            document.body.classList.contains("dark")
        ) {
            this.innerText =
                "☀️ Light Mode";

        } else {
            this.innerText =
                "🌙 Dark Mode";
        }

    });
function checkout() {
    if (cart.length == 0) {
        alert("Your cart is empty!");
        return;
    }
    let total =
        document.getElementById("totalPrice")
            .innerText;
    alert(
        "🎉 Order Placed Successfully!\n" +
        "Total Amount: ₹" + total
    );
    cart = [];
    displayCart();
}