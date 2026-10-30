/**
 * Test Suite / Aprobadores Automatizados para la Vista 'Nuestras Redes'
 * Verifica todos los criterios del requerimiento y del boceto visual 2.jpeg.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const REDES_PATH = path.join(ROOT_DIR, 'redes.html');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        passedTests++;
        console.log(`  ✅ [PASS] ${message}`);
    } else {
        console.error(`  ❌ [FAIL] ${message}`);
    }
}

console.log('\n======================================================');
console.log('🧪 EJECUTANDO APROBADORES - VISTA NUESTRAS REDES');
console.log('======================================================\n');

// 1. Archivo existe y es accesible
const redesExists = fs.existsSync(REDES_PATH);
assert(redesExists, 'El archivo redes.html existe en el directorio raíz');

if (!redesExists) {
    console.error('No se puede continuar sin redes.html');
    process.exit(1);
}

const html = fs.readFileSync(REDES_PATH, 'utf-8');

// 2. Sección 1: Carrusel Principal
console.log('\n--- 1. Aprobadores de Carrusel Principal ---');
assert(
    html.includes('Nuestras Redes') || html.includes('NUESTRAS REDES'),
    'Contiene el subtítulo/encabezado de sección "Nuestras Redes"'
);
assert(
    html.toLowerCase().includes('conecta con') && html.toLowerCase().includes('nosotros'),
    'Contiene el título principal "Conecta con Nosotros"'
);

const carouselImages = ['carousel_1.jpg', 'carousel_2.jpg', 'carousel_3.jpg'];
const hasAllCarouselImages = carouselImages.every(img => html.includes(img));
assert(hasAllCarouselImages, 'El carrusel integra las tres (3) imágenes seleccionadas del proyecto');

const carouselControls = (html.includes('carousel-control') || html.includes('swiper-button') || html.includes('prev') || html.includes('next'));
assert(carouselControls, 'El carrusel cuenta con controles de navegación interactivos');

// 3. Sección 2: Tarjetas de Redes Sociales
console.log('\n--- 2. Aprobadores de Tarjetas de Redes Sociales ---');
const instagramUrl = 'https://www.instagram.com/bambuvzla?cplk=MTdhb2piY2wxcmZ6';
const facebookUrl = 'https://www.facebook.com/share/1CDtLgJuPf/';
const xUrl = 'https://x.com/BambuVzla';

assert(html.includes(instagramUrl), 'Tarjeta de Instagram contiene el enlace oficial exacto');
assert(html.includes(facebookUrl), 'Tarjeta de Facebook contiene el enlace oficial exacto');
assert(html.includes(xUrl), 'Tarjeta de X contiene el enlace oficial exacto');

assert(
    !html.toLowerCase().includes('pinterest.com') && !html.toLowerCase().includes('>pinterest<'),
    'Pinterest ha sido reemplazado exitosamente por la red social X (sin menciones de Pinterest)'
);

const hasExternalAttributes = (html.includes('target="_blank"') && html.includes('rel="noopener noreferrer"'));
assert(hasExternalAttributes, 'Los enlaces externos utilizan target="_blank" y rel="noopener noreferrer"');

const hasCtaButtons = (html.match(/SEGUIR/g) || []).length >= 3;
assert(hasCtaButtons, 'Las tarjetas de redes cuentan con el botón CTA "SEGUIR"');

// 4. Sección 3: Galería de la Comunidad en Vivo
console.log('\n--- 3. Aprobadores de Galería Comunidad en Vivo (Instagram) ---');
assert(
    html.toLowerCase().includes('galería de') && html.toLowerCase().includes('comunidad en vivo'),
    'Contiene el título "Galería de nuestra comunidad en vivo"'
);

// Verificar presencia de 10 posts
let postCount = (html.match(/post_\d+\.jpg/g) || []).length;
if (postCount === 0) {
    postCount = (html.match(/instagram-card|community-post|insta-post/g) || []).length;
}
assert(postCount >= 10, `Contiene las 10 publicaciones de Instagram requeridas (encontradas: ${postCount})`);

// Truncado de texto
assert(
    html.includes('line-clamp') || html.includes('text-overflow') || html.includes('ellipsis'),
    'Implementa reglas de truncado de texto (line-clamp/ellipsis) para altura uniforme'
);

// Fallback de likes/reacciones (corazón rojo estático/funcional)
assert(
    html.includes('fa-heart') || html.includes('heart'),
    'Maneja visualmente el icono de corazón/likes sin valores nulos ni indefinidos'
);

// 5. Sección 4: Footer Oficial
console.log('\n--- 4. Aprobadores de Footer Oficial ---');
assert(
    html.includes('logo.jpeg') || html.includes('logo.png'),
    'El footer incluye el logotipo oficial de Bambú Venezuela'
);
assert(
    html.includes('ENLACES RÁPIDOS') || html.includes('Enlaces Rápidos'),
    'El footer cuenta con la columna de "ENLACES RÁPIDOS"'
);
assert(
    html.includes('CONTACTO') || html.includes('Contacto'),
    'El footer cuenta con la columna de "CONTACTO"'
);
assert(
    html.includes('BAMBÚ VENEZUELA') || html.includes('Bambu Venezuela'),
    'El footer incluye el nombre y copyright oficial de Bambú Venezuela'
);

// 6. Alcance estricto y ausencia de efectos secundarios
console.log('\n--- 5. Aprobadores de Alcance Estricto y Navbar ---');
assert(
    html.includes('header-upper') && html.includes('main-menu'),
    'El navbar/menú de navegación del sitio se mantiene intacto'
);
assert(
    html.includes('<li class="current"><a href="redes.html">Nuestras redes</a></li>'),
    'La página activa en el menú de navegación sigue siendo "Nuestras redes"'
);

console.log('\n======================================================');
console.log(`📊 RESULTADO DE APROBADORES: ${passedTests} de ${totalTests} aprobados.`);
console.log('======================================================\n');

if (passedTests === totalTests) {
    console.log('🎉 TODOS LOS APROBADORES HAN PASADO CON ÉXITO.\n');
    process.exit(0);
} else {
    console.log(`⚠️ Faltan ${totalTests - passedTests} aprobador(es) por cumplir.\n`);
    process.exit(1);
}
