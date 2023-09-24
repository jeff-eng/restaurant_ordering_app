import { menuArray, menuObjects2 } from './data.js';
import { createOrderListItem, renderMenu, renderMenu2, renderOrder, changeMenuItemQuantity } from './functions.js';

let customerOrder = [];

// Dynamically generate menu
// document.getElementById('menu-container').append(...renderMenu(menuArray));
document.getElementById('menu-container').append(...renderMenu2(menuObjects2));

//Event listeners
document.getElementById('menu-container').addEventListener('click', (event) => {
    const clickedTarget = event.target;
    const itemName = clickedTarget.dataset.item;

    console.log(clickedTarget);

    if (itemName) {
        console.log(itemName);
        const updatedQuantity = changeMenuItemQuantity(
                                    clickedTarget.textContent, 
                                    menuObjects2[itemName]
                                );
        console.log(updatedQuantity);
        const isItemInOrder = customerOrder.includes(itemName);
        
        updatedQuantity && !isItemInOrder ? customerOrder.push(itemName)
            : !updatedQuantity && isItemInOrder ? customerOrder.splice(customerOrder.indexOf(itemName))
            : null;
        
        console.log(customerOrder);
        // Clear out order container, then
        document.getElementById('order__list').innerHTML = '';
        // Re-render the order list
        document.getElementById('order__list').append(...renderOrder(menuObjects2, customerOrder));
    }

});

document.getElementById('order__list').addEventListener('click', (event) => {
    console.log('remove button clicked');
});
