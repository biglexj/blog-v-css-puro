document.addEventListener("DOMContentLoaded", function () {
    // Determine the correct path based on current location
    let basePath = "";
    const currentPath = window.location.pathname;
    
    // Check if we're in a subdirectory of src
    if (currentPath.includes('/src/') && currentPath.split('/').length > 3) {
        // We're in a subdirectory, need to go up more levels
        const pathDepth = currentPath.split('/').length - 3; // -3 accounts for empty first element and src/
        basePath = "../".repeat(pathDepth);
    }
    
    fetch(`${basePath} social-links/social-links.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el footer");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("social-links").innerHTML = data;
        })
        .catch(error => {
            console.error("No se pudo cargar el footer:", error);
        });
});
