const btnAbrir = document.getElementById('btnAbrirMapa');
const btnCerrar = document.getElementById('btnCerrarMapa');
const container = document.getElementById('mapContainer');
const loader = document.getElementById('mapLoader');
const iframe = document.getElementById('azgaarMap');

// Detecta automáticamente si estás en local o en GitHub
const isGitHub = window.location.hostname.includes('github.io');
const mapPath = 'Terra2026-02-02-03-57.map';
const mapUrl = "https://bagrejr.github.io/DnDSpam/Terra2026-02-02-03-57.map";
    ? `${window.location.origin}${window.location.pathname.replace('index.html', '')}${mapPath}`
    : `${window.location.origin}/${mapPath}`;

btnAbrir.onclick = () => {
    container.style.display = 'block';
    loader.style.display = 'flex';
    
    const azgaarBase = "https://azgaar.github.io/Fantasy-Map-Generator/";
    const fullUrl = `${azgaarBase}?maplink=${encodeURIComponent(mapUrl)}`;

    if (iframe.src !== fullUrl) {
        iframe.src = fullUrl;
    }

    iframe.onload = () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 3000);
    };
};

document.getElementById('btnCerrarMapa').onclick = () => {
    container.style.display = 'none';

};




