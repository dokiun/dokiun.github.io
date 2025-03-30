import home from './pages/home.js';
import about from './pages/about.js';
import blog from './pages/blog.js';
import proyectos from './pages/proyectos.js';

const routes = {
    '/': home,
    '/about': about,
    '/blog': blog,
    '/proyectos': proyectos,
};

export function router() {
    const path = location.hash.slice(1) || '/';
    const app = document.getElementById('app');
    const page = routes[path];

    if (page) {
        app.innerHTML = '';
        const content = page();
        app.appendChild(content);

        if (typeof page.afterRender === 'function') {
            page.afterRender(); // ← aquí va tu lógica post-render
        }
        updateActiveNav();
    } else {
        app.innerHTML = '<h2>Página no encontrada</h2>';
    }
}

function updateActiveNav() {
    const links = document.querySelectorAll('nav a[data-link]');
    const currentPath = location.hash.slice(1) || '/';

    links.forEach(link => {
        const target = link.getAttribute('data-link');
        if (target === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}