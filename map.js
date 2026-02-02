const btnAbrir = document.getElementById('btnAbrirMapa');
const btnCerrar = document.getElementById('btnCerrarMapa');
const container = document.getElementById('mapContainer');
const loader = document.getElementById('mapLoader');
const iframe = document.getElementById('azgaarMap');

// URL directa de tu archivo en GitHub
const mapUrl = "https://bagrejr.github.io/DnDSpam/Terra2026-02-02-03-57.map";

btnAbrir.onclick = () => {
    container.style.display = 'block';
    loader.style.display = 'flex';
    
    const azgaarBase = "https://azgaar.github.io/Fantasy-Map-Generator/";
    const fullUrl = `${azgaarBase}?maplink=${encodeURIComponent(mapUrl)}`;

    // Solo actualizamos el src si es diferente para evitar recargas infinitas
    if (iframe.src !== fullUrl) {
        iframe.src = fullUrl;
    }

    iframe.onload = () => {
        // Tiempo de espera para que Azgaar procese el archivo externo
        setTimeout(() => {
            loader.style.display = 'none';
        }, 3000);
    };
};

btnCerrar.onclick = () => {
    container.style.display = 'none';
};
