const menuObjects = {
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
            this.qty = Math.max(1, this.qty);
        },
        reset: function() {
            this.qty = 0;
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
            this.qty = Math.max(1, this.qty);
        },
        reset: function() {
            this.qty = 0;
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
            this.qty = Math.max(1, this.qty);
        },
        reset: function() {
            this.qty = 0;
        }
    }
}

export { menuObjects };