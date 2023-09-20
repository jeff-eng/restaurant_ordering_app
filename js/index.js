import menuArray from './data.js';

const htmlElementTable = {
    article: 'article',
    div: 'div',
    span: 'span',
    h3: 'h3',
    p: 'p',
    button: 'button',
    i: 'i'
};

let customerOrder = [];

const menuSectionEl = document.getElementById('menu-container');
menuSectionEl.append(...renderMenu(menuArray));

function renderMenu(menuArr) {
    return menuArr.map((menuObj) => createMenuItem(menuObj));
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
    <button class="menu-item__button--add" data-id="${id}">
        <i class="fa-solid fa-plus"></i>
    </button>`;
    
    return article;
}

function createBasicElement(tagType, idName='', ...classNames) {
    const htmlElement = document.createElement(tagType);

    htmlElement.classList.add(...classNames);
    htmlElement.id = idName;

    return htmlElement;
}