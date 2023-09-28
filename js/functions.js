import { promotions } from './data.js';

const htmlElementTable = {
    article: 'article',
    section: 'section',
    div: 'div',
    span: 'span',
    h3: 'h3',
    p: 'p',
    button: 'button',
    i: 'i',
    li: 'li'
};

function createBasicElement(tagType, idName='', ...classNames) {
    const htmlElement = document.createElement(tagType);

    htmlElement.id = idName;
    htmlElement.classList.add(...classNames);

    return htmlElement;
}

function renderMenu(menuObjects) {
    // Create array from menuObjects, sort array by id, and create HTML for each item
    return Object.entries(menuObjects)
    .sort(([_ignoreA, objA], [_ignoreB, objB]) => objA.data.id - objB.data.id)
    .map(([key, value]) => createMenuItem(key, value));
}

function createMenuItem(menuItemObjKey, menuItemObjVal) {
    const name = menuItemObjKey;
    const { id, ingredients, price, emoji } = menuItemObjVal.data;
    const article = createBasicElement(htmlElementTable.article, `menu-item-${id}`, 'menu-item');

    article.innerHTML = 
    `<div class="menu-item__content-wrapper">
        <span class="menu-item__graphic" role="img" aria-label="${name} emoji">${emoji}</span>
        <div class="menu-item__details-wrapper">
            <h3 class="menu-item__name">${name}</h3>
            <p class="menu_item__ingredients">${ingredients.join(', ')}</p>
            <p class="menu_item__price">$${price}</p>
        </div>
    </div>
    <button class="menu-item__button" id="menu-item__button--plus-${name}" data-add="${name}">+</button>`
    
    return article;
}

function renderOrder(menuObjects, orderArray) {
    return orderArray.map((itemName) => createOrderListItem(menuObjects, itemName));
}

function createOrderListItem(menuObjects, menuItemString) {
    const { qty, data } = menuObjects[menuItemString];
    const li = createBasicElement(htmlElementTable.li, `order-list-item-${menuItemString}`, 'order__list-item');

    li.innerHTML = `
        <div class="order__item-wrapper">
            <h3 class="order__item-name">${menuItemString}</h3>
            <button class="order__button--remove" data-remove="${menuItemString}">remove</button>
            <i class="order__button--qty-chg fa-solid fa-chevron-left" data-less="${menuItemString}"></i>
            <span>${qty}</span>
            <i class="order__button--qty-chg fa-solid fa-chevron-right" data-more="${menuItemString}"></i>
        </div>
        <p class="order__item-price">$${data.price * qty}</p>`;

    return li;
}

function changeMenuItemQuantity(isQtyIncrease, menuObject) {
    isQtyIncrease ? menuObject.increment() : menuObject.decrement();

    return menuObject.qty;
}

function calculateOrderTotal(menuObjs, orderArr) {
    let rawTotal = Object.values(menuObjs).reduce((total, currentMenuItem) => {
        return total + (currentMenuItem.qty * currentMenuItem.data.price);
    }, 0);

    if (promotions.mealDeal.qualifiesForPromotion(orderArr)) {
        return rawTotal -= rawTotal * promotions.mealDeal.discountRate;
    }

    return rawTotal;
}

function reRenderOrderList(menuObjs, orderArr) {
    const orderTotalSpan = document.getElementById('total__amount');
    const orderList = document.getElementById('order__list');
    const orderContainer = document.getElementById('order-container');
    
    // Re-render the order list
    orderList.innerHTML = '';
    orderList.append(...renderOrder(menuObjs, orderArr));
    
    const calculatedTotal = calculateOrderTotal(menuObjs, orderArr);
    
    if (calculatedTotal) {
        orderTotalSpan.textContent = calculatedTotal;
        orderContainer.classList.remove('hide');
    } else {
        orderContainer.classList.add('hide');
    }
}

export { renderMenu, 
        renderOrder, 
        changeMenuItemQuantity, 
        createBasicElement,
        reRenderOrderList, 
        htmlElementTable }; 