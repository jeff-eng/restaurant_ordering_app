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

const promotions = {
    mealDeal: {
        description: 'meal deal discount',
        discountRate: 0.10,
        requiredItems: ['pizza', 'hamburger', 'beer'],
        getDiscountString: function() {
            return this.discountRate * 100 + '%';
        },
        qualifiesForPromotion: function (orderArray) {
            const orderSet = new Set(orderArray);
            const requiredSet = new Set(this.requiredItems);

            if (orderSet.size !== requiredSet.size) {
                return false;
            }

            for (const item of orderSet) {
                if (!requiredSet.has(item)) {
                    return false;
                }
            }

            return true;
        },

    }
}

export { menuObjects, promotions };