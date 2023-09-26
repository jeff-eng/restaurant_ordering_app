import { menuObjects } from './data.js';
import { 
    renderMenu, 
    changeMenuItemQuantity, 
    createBasicElement,
    reRenderOrderList,
    htmlElementTable } from './functions.js';

let customerOrder = [];

const paymentForm = document.getElementById('modal__payment-form');
const modal = document.getElementById('modal');

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

document.getElementById('order-container').addEventListener('click', (event) => {
    const completeOrderBtn = event.target;
    console.log(completeOrderBtn);

    // Display modal
    if (completeOrderBtn.id === 'order__button--complete') {
        setTimeout(() => modal.classList.toggle('hide'), 1500);
    }
});

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const paymentFormData = new FormData(paymentForm);
    const customerName = paymentFormData.get('fullName');

    paymentForm.reset();

    modal.classList.toggle('hide');
    document.getElementById('order-container').classList.add('hide');

    // Dynamically generate Order Confirmed message
    const orderConfirmSection = createBasicElement(htmlElementTable.section, 
                                                   'order-confirm-container', 
                                                   'order-confirm-container'
    );
    const orderConfirmMessage = createBasicElement(htmlElementTable.p, 
                                                    'order-confirm__message', 
                                                    'order-confirm__message'
    );

    orderConfirmSection.append(orderConfirmMessage);
    orderConfirmMessage.textContent = `Thanks, ${customerName}! Your order is on its way!`;
    document.getElementById('main-container').appendChild(orderConfirmSection);
    
    setTimeout(() => {
        document.getElementById('main-container').removeChild(orderConfirmSection);

    }, 8000);
    
    // Reset data for new order submission
    Object.values(menuObjects).forEach((obj) => {
        obj.reset();
    });
    customerOrder = [];

    // Reset the order list
    document.getElementById('order__list').innerHTML = '';
});

modal.addEventListener('click', (event) => {
    if (event.target.id === 'modal__button--dismiss') {
        paymentForm.reset();
        modal.classList.add('hide');
    }
});