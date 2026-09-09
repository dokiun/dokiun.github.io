export function setupMenuToggle() {
    const button = document.querySelector('.main-item');
    const menu = document.querySelector('.accordion-container > ul');

    if (button && menu) {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        button.setAttribute('aria-expanded', 'false');

        const toggleMenu = () => {
            const isOpen = button.classList.toggle('main-item--open');
            button.setAttribute('aria-expanded', String(isOpen));
        };

        button.addEventListener('click', () => {
            toggleMenu();
        });

        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });

        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                closeMobileMenu();
            }
        });
    }
}

export function closeMobileMenu() {
    const menuButton = document.querySelector('.main-item');

    if (menuButton) {
        menuButton.classList.remove('main-item--open');
        menuButton.setAttribute('aria-expanded', 'false');
    }
}