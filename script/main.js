
// This is the main entry point for the application.
import { router } from './router.js';

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
