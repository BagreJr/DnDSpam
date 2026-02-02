const btnAbrir = document.getElementById('btnAbrirMapa');
const btnCerrar = document.getElementById('btnCerrarMapa');
const container = document.getElementById('mapContainer');
const loader = document.getElementById('mapLoader');
const iframe = document.getElementById('azgaarMap');

// Detecta automáticamente si estás en local o en GitHub
const isGitHub = window.location.hostname.includes('github.io');
const mapPath = 'Terra2026-02-02-03-57.map';
const mapUrl = isGitHub 
    ? `${window.location.origin}${window.location.pathname.replace('index.html', '')}${mapPath}`
    : `${window.location.origin}/${mapPath}`;

btnAbrir.onclick = () => {
    container.style.display = 'block';
    loader.style.display = 'flex';
    
    // Método Maplink (el más estable en producción)
    const azgaarBase = "https://azgaar.github.io/Fantasy-Map-Generator/";
    const fullUrl = `${azgaarBase}?maplink=${encodeURIComponent(mapUrl)}`;

    if (iframe.src !== fullUrl) {
        iframe.src = fullUrl;
    }

    iframe.onload = () => {
        // En GitHub, la carga suele ser rápida
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2500);
    };
};

document.getElementById('btnCerrarMapa').onclick = () => {
    container.style.display = 'none';
};