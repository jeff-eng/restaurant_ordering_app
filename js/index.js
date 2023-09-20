import menuArray from './data.js';
import { renderMenu } from './functions.js';

let customerOrder = [];

// Dynamically generate menu
document.getElementById('menu-container').append(...renderMenu(menuArray));
