// Añadir estas variables al inicio de token.js
let texPosX = 0, texPosY = 0, texScale = 1;

// Nuevos controles vinculados al dibujo
document.getElementById('borderWidth').oninput = draw;
document.getElementById('texturePosX').oninput = (e) => { texPosX = parseInt(e.target.value); draw(); };
document.getElementById('texturePosY').oninput = (e) => { texPosY = parseInt(e.target.value); draw(); };
document.getElementById('textureScale').oninput = (e) => { texScale = parseFloat(e.target.value); draw(); };
const tokenModal = document.getElementById('tokenModal');
const openBtn = document.getElementById('openTokenGenerator');
const closeBtn = document.getElementById('closeTokenModal');
const canvas = document.getElementById('tokenCanvas');
const ctx = canvas.getContext('2d');

// Variables de estado de la imagen
let img = new Image();
let imgLoaded = false;
let posX = 150, posY = 150; // Posición central inicial
let scale = 1;
let isDragging = false;
let startX, startY;
let textureImg = new Image();
let textureLoaded = false;

// Abrir/Cerrar
openBtn.onclick = () => tokenModal.style.display = 'flex';
closeBtn.onclick = () => tokenModal.style.display = 'none';

// Cargar Imagen
document.getElementById('uploadImage').onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        img.onload = () => {
            imgLoaded = true;
            // Resetear posición y escala al cargar nueva imagen
            posX = 150; posY = 150;
            scale = 1;
            document.getElementById('zoomInput').value = 1;
            draw();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};

// Controles
document.getElementById('zoomInput').oninput = (e) => {
    scale = parseFloat(e.target.value);
    draw();
};
document.getElementById('tokenShape').onchange = draw;
document.getElementById('borderColor').onchange = draw;

// Función Principal de Dibujo
// Actualizar la visibilidad de los controles de textura
document.getElementById('borderStyle').addEventListener('change', (e) => {
    const texControls = document.getElementById('textureControls');
    texControls.style.display = (e.target.value === 'texture') ? 'grid' : 'none';
    draw();
});

// Evento para cargar la textura
document.getElementById('uploadTexture').onchange = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        textureImg.onload = () => {
            textureLoaded = true;
            // Cambiar automáticamente el estilo a textura para ver el cambio
            document.getElementById('borderStyle').value = 'texture';
            draw();
        };
        textureImg.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};

// Evento para cargar la textura con validación
document.getElementById('uploadTexture').onchange = (e) => {
    // Verificamos que realmente se haya seleccionado un archivo
    if (!e.target.files || e.target.files.length === 0) {
        return; 
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        textureImg.onload = () => {
            textureLoaded = true;
            document.getElementById('borderStyle').value = 'texture';
            draw();
        };
        textureImg.src = event.target.result;
    };
    
    // Ahora es seguro llamar a readAsDataURL
    reader.readAsDataURL(e.target.files[0]);
};

function draw() {
    if (!imgLoaded) return;
    const size = 300;
    const shape = document.getElementById('tokenShape').value;
    const color = document.getElementById('borderColor').value;
    const style = document.getElementById('borderStyle').value;
    const bWidth = parseInt(document.getElementById('borderWidth').value); // Nuevo: Grosor dinámico

    ctx.clearRect(0, 0, size, size);
    
    function getPath(offset = 0) {
        const path = new Path2D();
        const center = size / 2;
        const r = 140 - offset;

        if (shape === 'circle') {
            path.arc(center, center, r, 0, Math.PI * 2);
        } else if (shape === 'square') {
            path.rect(center - r, center - r, r * 2, r * 2);
        } else if (shape === 'pyramid') {
            path.moveTo(center, center - r);
            path.lineTo(center + r, center + r);
            path.lineTo(center - r, center + r);
            path.closePath();
        } else if (shape === 'hexagon') {
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i - Math.PI / 2;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                if (i === 0) path.moveTo(x, y);
                else path.lineTo(x, y);
            }
            path.closePath();
        }
        return path;
    }

    // 1. Dibujar Imagen con Máscara
    ctx.save();
    ctx.clip(getPath(0));
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, posX - w/2, posY - h/2, w, h);
    ctx.restore();

    // 2. Dibujar Marco
    if (style !== 'none') {
        ctx.save();
        ctx.lineWidth = bWidth; // Aplicar grosor dinámico
        const mainPath = getPath(bWidth / 2); // Offset dinámico según grosor

        if (style === 'solid') {
            ctx.strokeStyle = color;
            ctx.stroke(mainPath);
        } 
        else if (style === 'double') {
            ctx.strokeStyle = color;
            ctx.lineWidth = bWidth / 2;
            ctx.stroke(mainPath);
            ctx.stroke(getPath(bWidth * 1.5)); 
        } 
        else if (style === 'dotted') {
            ctx.strokeStyle = color;
            ctx.setLineDash([bWidth, bWidth * 1.5]);
            ctx.lineCap = 'round';
            ctx.stroke(mainPath);
        } 
        else if (style === 'runic') {
            ctx.strokeStyle = color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = color;
            ctx.stroke(mainPath);
            ctx.setLineDash([40, 20]);
            ctx.lineWidth = bWidth + 4;
            ctx.stroke(mainPath);
        }
        else if (style === 'texture' && textureLoaded) {
            // Lógica avanzada para mover y escalar la textura del borde
            const pattern = ctx.createPattern(textureImg, 'repeat');
            const matrix = new DOMMatrix();
            
            // Aplicamos transformaciones a la textura
            matrix.translateSelf(texPosX, texPosY);
            matrix.scaleSelf(texScale, texScale);
            pattern.setTransform(matrix);
            
            ctx.strokeStyle = pattern;
            ctx.stroke(mainPath);
        }
        ctx.restore();
    }
}
// Eventos de Arrastre (Mouse y Touch)
canvas.onmousedown = (e) => {
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
};

window.onmousemove = (e) => {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    posX += (mouseX - startX);
    posY += (mouseY - startY);
    
    startX = mouseX;
    startY = mouseY;
    draw();
};

window.onmouseup = () => isDragging = false;

// Descarga
document.getElementById('downloadToken').onclick = () => {
    const link = document.createElement('a');
    link.download = 'token-dnd.png';
    link.href = canvas.toDataURL();
    link.click();
};

// Función auxiliar para no repetir código de formas
function defineShapePath(context, shape, size, offset) {
    const center = size / 2;
    const radius = center - offset;


}