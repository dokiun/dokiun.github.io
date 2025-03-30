document.getElementById("dropdownButton").addEventListener("click", function(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "inline-block";
    } else {
        dropdownMenu.style.display = "none";
    }
});