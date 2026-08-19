async function loadComponent(id, path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }

    const html = await response.text();

    const container = document.getElementById(id);

    if (!container) return;

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const scripts = Array.from(temp.querySelectorAll("script"));
    scripts.forEach(script => script.remove());

    container.outerHTML = temp.innerHTML;

    for (const oldScript of scripts) {
        const newScript = document.createElement("script");

        if (oldScript.type)
            newScript.type = oldScript.type;

        if (oldScript.src) {
            newScript.src = oldScript.src;

            await new Promise((resolve, reject) => {
                newScript.onload = resolve;
                newScript.onerror = reject;
                document.body.appendChild(newScript);
            });

        } else {

            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);

        }
    }
}

(async () => {

    await loadComponent(
        "site-header",
        "components/site-header.html"
    );

    await loadComponent(
        "footer",
        "components/footer.html"
    );

})();