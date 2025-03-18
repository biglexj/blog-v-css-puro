// Sistema de rutas para manejar alias como @pages
const routes = {
    '@pages': 'pages',
    '@assets': 'assets',
    '@components': 'components',
    '@scripts': 'scripts',
    '@modules': 'modules',
    '@auth': 'components/Auth',
    '@home': 'home.html'
};

// Función para transformar rutas
function transformPath(originalPath) {
    if (!originalPath) return originalPath; // Evitar errores con valores nulos o vacíos

    // Evitar modificar rutas absolutas
    if (originalPath.startsWith('http') || originalPath.startsWith('/') || originalPath.startsWith('./') || originalPath.startsWith('../')) {
        return originalPath;
    }

    // Verificar si la ruta usa un alias
    for (const [alias, route] of Object.entries(routes)) {
        if (originalPath.startsWith(alias)) {
            let newPath = originalPath.replace(alias, route);

            // Asegurar que la ruta no agregue "src/" dos veces
            if (!newPath.startsWith('src/') && !window.location.pathname.includes('/src/')) {
                newPath = 'src/' + newPath;
            }

            return newPath;
        }
    }

    return originalPath; // Si no coincide con un alias, devolver la ruta original
}

// Aplicar la transformación a los elementos relevantes
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href], img[src], script[src], link[href]').forEach(el => {
        const attr = el.hasAttribute('href') ? 'href' : (el.hasAttribute('src') ? 'src' : null);
        if (!attr) return;

        const originalPath = el.getAttribute(attr);
        const newPath = transformPath(originalPath);

        if (originalPath !== newPath) {
            el.setAttribute(attr, newPath);
            console.log(`Ruta transformada: ${originalPath} -> ${newPath}`);
        }
    });
});
