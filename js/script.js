document.addEventListener("click", function (event) {
    const menuToggle = event.target.closest("#menuToggle");

    if (menuToggle) {
        const nav = document.querySelector("nav");

        if (nav) {
            nav.classList.toggle("active");
        }
    }
});
