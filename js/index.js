import { menuObjects } from './data.js';
import { 
    renderMenu, 
    changeMenuItemQuantity, 
    createBasicElement,
    reRenderOrderList,
    htmlElementTable } from './functions.js';

let customerOrder = [];

const menuContainer = document.getElementById('menu-container');
const mainContainer = document.getElementById('main-container');
const orderContainer = document.getElementById('order-container');
const paymentForm = document.getElementById('modal__payment-form');
const modal = document.getElementById('modal');
const orderList = document.getElementById('order__list');

// Dynamically generate menu
menuContainer.append(...renderMenu(menuObjects));

//Event listeners
menuContainer.addEventListener('click', (event) => {
    const addItem = event.target.dataset.add;

    if (addItem) {
        // Increment item quantity
        const updatedQuantity = changeMenuItemQuantity(true, menuObjects[addItem]);
        // Check if item is already in customerOrder array
        const isItemInOrder = customerOrder.includes(addItem);
        // If updated quantity is > 0 and item is not already in order array, then add
        updatedQuantity && !isItemInOrder ? customerOrder.push(addItem) : null;

        reRenderOrderList(menuObjects, customerOrder);
        // Scroll to order section after adding menu item
        orderContainer.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" }
        );
    }
});

orderList.addEventListener('click', (event) => {
    const { decrementedItem, incrementedItem, removedItem } = event.target.dataset;
    
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

orderContainer.addEventListener('click', (event) => {
    const completeOrderBtn = event.target;

    // Display modal
    if (completeOrderBtn.id === 'order__button--complete') {
        setTimeout(() => modal.showModal(), 500);
    }
});

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const paymentFormData = new FormData(paymentForm);
    const customerName = paymentFormData.get('fullName');

    paymentForm.reset();

    modal.close();
    orderContainer.classList.add('hide');

    // Dynamically generate Order Confirmed message
    const orderConfirmSection = createBasicElement(htmlElementTable.section, 
                                                   'order-confirm-container', 
                                                   'order-confirm-container'
    );
    const orderConfirmMessage = createBasicElement(htmlElementTable.p, 
                                                    'order-confirm__message', 
                                                    'order-confirm__message'
    );

    // Show the message
    orderConfirmSection.append(orderConfirmMessage);
    orderConfirmMessage.textContent = `Thanks, ${customerName}! Your order is on its way!`;
    mainContainer.appendChild(orderConfirmSection);
    
    // Remove the message after 8 seconds
    setTimeout(() => {
        mainContainer.removeChild(orderConfirmSection);
        document.querySelector('header').scrollIntoView( { behavior: 'smooth', block: 'start'} );    
    }, 8000);
    
    // Reset data for new order submission
    Object.values(menuObjects).forEach((obj) => {
        obj.reset();
    });
    customerOrder = [];

    // Reset the order list
    orderList.innerHTML = '';
});

// Dismiss modal and return to order page
modal.addEventListener('click', (event) => {
    if (event.target.dataset.btn === 'dismiss') {
        paymentForm.reset();
        modal.close();
    }
});