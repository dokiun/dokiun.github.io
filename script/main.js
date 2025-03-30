// This is the main entry point for the application.
import { router } from './router.js';

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// main.js
import { initMenu } from '../public/script/menu.js';

window.addEventListener('DOMContentLoaded', () => {
    initMenu(); // esto activa el menú hamburguesa
});