import { closeMobileMenu } from '../public/script/menu-desp.js';

const pageModules = import.meta.glob('./pages/*.js', {
    eager: true,
    import: 'default'
});

const routes = Object.fromEntries(
    Object.entries(pageModules).map(([filePath, page]) => {
        const fileName = filePath.split('/').pop().replace('.js', '');
        const route = fileName === 'home' ? '/' : `/${fileName}`;

        return [route, page];
    })
);

function getPageLabel(route) {
    if (route === '/') return 'Inicio';

    return route
        .slice(1)
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

function renderNavigation() {
    const navigationLists = document.querySelectorAll('[data-navigation]');
    const pageRoutes = Object.keys(routes).sort((firstRoute, secondRoute) => {
        if (firstRoute === '/') return -1;
        if (secondRoute === '/') return 1;
        return firstRoute.localeCompare(secondRoute);
    });

    navigationLists.forEach(navigation => {
        navigation.replaceChildren(...pageRoutes.map(route => {
            const item = document.createElement('li');
            const link = document.createElement('a');

            link.href = `#${route}`;
            link.dataset.link = route;
            link.textContent = getPageLabel(route);
            item.appendChild(link);

            return item;
        }));
    });
}

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
        renderNavigation();
        updateActiveNav();
        closeMobileMenu();
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