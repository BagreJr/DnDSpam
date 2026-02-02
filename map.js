const btnAbrir = document.getElementById('btnAbrirMapa');
const btnCerrar = document.getElementById('btnCerrarMapa');
const container = document.getElementById('mapContainer');
const loader = document.getElementById('mapLoader');
const iframe = document.getElementById('azgaarMap');

const mapUrl = "https://bagrejr.github.io/DnDSpam/Terra2026-02-02-03-57.map";
const azgaarBase = "https://azgaar.github.io/Fantasy-Map-Generator/";
const fullUrl = `${azgaarBase}?maplink=${encodeURIComponent(mapUrl)}`;

btnAbrir.onclick = () => {
    container.style.display = 'block';
    loader.style.display = 'flex';
    
    // FORZAR RECARGA: 
    // Al limpiar el src y volverlo a poner, obligamos a Azgaar a reiniciar 
    // el proceso de descarga del .map y sincronización.
    iframe.src = ''; 
    iframe.src = fullUrl;

    iframe.onload = () => {
        // Aumentamos un poco el tiempo para asegurar que el motor de Azgaar 
        // haya terminado de renderizar las capas después de la sincronización.
        setTimeout(() => {
            loader.style.display = 'none';
        }, 4000); 
    };
};

btnCerrar.onclick = () => {
    container.style.display = 'none';
    // Opcional: limpiar el src al cerrar para liberar memoria del navegador
    iframe.src = 'about:blank';
};


