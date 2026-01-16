// This is the main entry point for the application.
import { router } from './router.js';

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// main.js
import { initMenu } from '../public/script/menu.js';

window.addEventListener('DOMContentLoaded', () => {
    initMenu(); // esto activa el menú hamburguesa
    
    // Registrar service worker para cachear modelos 3D
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('🔧 Service Worker registrado:', registration.scope);
                })
                .catch((error) => {
                    console.log('❌ Error al registrar Service Worker:', error);
                });
        });
    }
});