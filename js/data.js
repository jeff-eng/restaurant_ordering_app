const menuArray = [
    {
        id: 0,
        name: "pizza",
        ingredients: ["pepperoni", "mushroom", "mozzarella"],
        price: 14,
        emoji: "🍕"
    },
    {
        id: 1,
        name: "hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        emoji: "🍔"
    },
    {
        id: 2,
        name: "beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺"
    }
];

// const menuObjects = {
//     pizza: {
//         id: 0,
//         ingredients: ["pepperoni", "mushroom", "mozzarella"],
//         price: 14,
//         emoji: "🍕"
//     },

//     hamburger: {
//         id: 1,
//         ingredients: ["beef", "cheese", "lettuce"],
//         price: 12,
//         emoji: "🍔"
//     },

//     beer: {
//         id: 2,
//         ingredients: ["grain, hops, yeast, water"],
//         price: 12,
//         emoji: "🍺"
//     }
// };

const menuObjects2 = {
    pizza: {
        qty: 0,
        data: {
            id: 0,
            ingredients: ["pepperoni", "mushroom", "mozzarella"],
            price: 14,
            emoji: "🍕"
        },
        increment: function() {
            this.qty++;
        },
        decrement: function() {
            this.qty--;
            this.qty = Math.max(0, this.qty);
        }
    },

    hamburger: {
        qty: 0,
        data: {
            id: 1,
            ingredients: ["beef", "cheese", "lettuce"],
            price: 12,
            emoji: "🍔"
        },
        increment: function() {
            this.qty++;
        },
        decrement: function() {
            this.qty--;
            this.qty = Math.max(0, this.qty);
        }
    },

    beer: {
        qty: 0,
        data: {
            id: 2,
            ingredients: ["grain, hops, yeast, water"],
            price: 12,
            emoji: "🍺"
        },
        increment: function() {
            this.qty++;
        },
        decrement: function() {
            this.qty--;
            this.qty = Math.max(0, this.qty);
        }
    }
}

export { menuArray, menuObjects2 };