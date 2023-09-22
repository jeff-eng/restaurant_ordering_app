import { menuArray, menuObjects } from './data.js';
import { createOrderListItem, renderMenu, renderMenu2, renderOrder} from './functions.js';

let customerOrder = [];

// Dynamically generate menu
// document.getElementById('menu-container').append(...renderMenu(menuArray));
document.getElementById('menu-container').append(...renderMenu2(menuObjects));

//Event listeners
document.getElementById('menu-container').addEventListener('click', (event) => {
    const clickedBtnItemName = event.target.dataset.item;
    const menuObject = menuObjects[clickedBtnItemName];
    const itemInOrderArray = customerOrder.includes(clickedBtnItemName);

    if (menuObject && !itemInOrderArray) {
        customerOrder.push(clickedBtnItemName);
        document.getElementById('order__list').append(createOrderListItem(menuObject, clickedBtnItemName));
    } else if (itemInOrderArray) {
        console.log('Item already added');
        // Add in UI element to notify user that menu item has already been added
    }

});

document.getElementById('order__list').addEventListener('click', (event) => {
    console.log('remove button clicked');
});
