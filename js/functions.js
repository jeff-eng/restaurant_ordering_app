const htmlElementTable = {
    article: 'article',
    div: 'div',
    span: 'span',
    h3: 'h3',
    p: 'p',
    button: 'button',
    i: 'i',
    li: 'li'
};

function renderMenu(menuArr) {
    return menuArr.map((menuObj) => createMenuItem(menuObj));
}

function renderMenu2(menuObjects) {
    // Create array from menuObjects, sort array by id, and create HTML for each item
    return Object.entries(menuObjects)
    .sort(([_ignoreA, objA], [_ignoreB, objB]) => objA.data.id - objB.data.id)
    .map(([key, value]) => createMenuItem2(key, value));
}

function createMenuItem(menuObject) {
    const { id, name, ingredients, price, emoji } = menuObject;
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
    <button class="menu-item__button--add" id="${name}" data-id="${id}">+</button>`;
    
    return article;
}

function createMenuItem2(menuItemObjKey, menuItemObjVal) {
    const name = menuItemObjKey;
    const { id, ingredients, price, emoji } = menuItemObjVal.data;
    console.log(id, ingredients, price, emoji);
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
    <button class="menu-item__button" id="menu-item__button--plus-${name}" data-item="${name}">+</button>`
    
    return article;
}

function createBasicElement(tagType, idName='', ...classNames) {
    const htmlElement = document.createElement(tagType);

    htmlElement.id = idName;
    htmlElement.classList.add(...classNames);

    return htmlElement;
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
            <i class="fa-solid fa-chevron-left" data-less="${menuItemString}"></i>
            <span>${qty}</span>
            <i class="fa-solid fa-chevron-right" data-more="${menuItemString}"></i>
        </div>
        <p class="order__item-price">$${data.price * qty}</p>`;

    return li;
}

function changeMenuItemQuantity(increaseQty, menuObject) {
    increaseQty ? menuObject.increment() : menuObject.decrement();

    return menuObject.qty;
}

export { 
    renderMenu, 
    renderMenu2, 
    createMenuItem, 
    createBasicElement, 
    renderOrder, 
    createOrderListItem,
    changeMenuItemQuantity 
};