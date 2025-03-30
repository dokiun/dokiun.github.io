export function setupMenuToggle() {
    const icon = document.querySelector(".icon");
    const menu = document.querySelector(".nav ul");

    if (icon && menu) {
        icon.addEventListener("click", () => {
            menu.classList.toggle("active");
        });
    }
}