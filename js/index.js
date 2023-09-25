import { menuObjects } from './data.js';
import { renderMenu, renderOrder, changeMenuItemQuantity, calculateOrderTotal } from './functions.js';

let customerOrder = [];

// Dynamically generate menu
document.getElementById('menu-container').append(...renderMenu(menuObjects));

//Event listeners
document.getElementById('menu-container').addEventListener('click', (event) => {
    const clickedTarget = event.target;
    const addItem = clickedTarget.dataset.add;

    if (addItem) {
        // Increment item quantity
        const updatedQuantity = changeMenuItemQuantity(true, menuObjects[addItem]);
        // Check if item is already in customerOrder array
        const isItemInOrder = customerOrder.includes(addItem);
        // If updated quantity is > 0 and item is not already in order array, then add
        updatedQuantity && !isItemInOrder ? customerOrder.push(addItem) : null;

        reRenderOrderList(menuObjects, customerOrder);
    }
});

document.getElementById('order__list').addEventListener('click', (event) => {
    const decrementedItem = event.target.dataset.less;
    const incrementedItem = event.target.dataset.more;
    const removedItem = event.target.dataset.remove;

    if (removedItem) {
        // Remove item from customerOrder array
        customerOrder.splice(customerOrder.indexOf(removedItem), 1);
        // Reset item's quantity in menuObjects back to zero
        menuObjects[removedItem].reset();
    } else if (decrementedItem || incrementedItem) {
        decrementedItem ? changeMenuItemQuantity(false, menuObjects[decrementedItem]) :
        changeMenuItemQuantity(true, menuObjects[incrementedItem]);
    }

    reRenderOrderList(menuObjects, customerOrder);

});

function reRenderOrderList(menuObjs, orderArr) {
    // Re-render the order list
    document.getElementById('order__list').innerHTML = '';
    document.getElementById('order__list').append(...renderOrder(menuObjs, orderArr));
    // Update total
    document.getElementById('order__total-amount').textContent = calculateOrderTotal(menuObjs);
}

console.log(document.getElementById('order__total-price').textContent);