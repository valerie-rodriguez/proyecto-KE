// ============================================================
// CONFIGURABLE: Edita estos textos para personalizar la página
// ============================================================

// PUEDES CAMBIAR: El título principal
const TITULO_PRINCIPAL = "Carta al amor de mi vida 💗";

// PUEDES CAMBIAR: Los párrafos de introducción
const INTRODUCCION = [
    "Quizá no siempre sé cómo decirle lo que siento, y tal vez muchas veces parezca que soy fría o que no me importa demasiado. Pero detrás de cada silencio hay muchas cosas que quisiera decirle y que simplemente no sé cómo expresar.",
    "Por eso hice esto para usted. Para intentar poner en palabras un poquito de todo eso que a veces se me queda guardado.",
    "Así que... esta vez déjeme decirle, a mi manera, todo aquello que quizás no siempre sé cómo decirle. ❤️"
];

// PUEDES CAMBIAR: Las razones por las que le gusta la otra persona
const RAZONES = [
    "Me gusta cómo me hace sentir cuando estoy con usted.",
    "Me gusta la forma en que me trata y los pequeños detalles que tiene conmigo.",
    "Me gusta hablar con usted, incluso cuando hablamos de cosas simples.",
    "Me gusta su forma de ser y la manera en que poco a poco voy conociéndolo más.",
    "Me gusta la tranquilidad que siento cuando estoy hablando con usted.",
    "Me gustan mucho sus ojos, podría quedarme mirándolos por mucho tiempo.",
    "Me encanta su sonrisa, especialmente cuando sé que fui yo quien logró hacer que sonriera.",
    "Me gusta la atención que me da y cómo se interesa por mí.",
    "Me gusta que usted haya despertado en mí sentimientos que no sé explicar muy bien.",
    "Y quizá la razón que más me cuesta explicar: me gusta usted simplemente por ser usted. ❤️"
];

// PUEDES CAMBIAR: El mensaje final de la lluvia
const TITULO_MENSAJE_FINAL = "Todos los te amo que no siempre sé decirle... ❤️";
const TEXTO_MENSAJE_FINAL = "Pero que siento por usted.";

// ============================================================
// FIN DE LA ZONA DE CONFIGURACIÓN
// ============================================================

// Variables para controlar la lluvia
let lluvia_activa = false;
const colores_lluvia = [
    '#FF1493', // Rosa oscuro
    '#FF69B4', // Rosa fuerte
    '#FFB6D9', // Rosa pastel
    '#E91E63', // Rojo acento
    '#FF105E'  // Rosa rojo
];

const variantes_te_amo = [
    'Te amo ❤️',
    'Te amo 💗',
    'Te amo 💕',
    'Te amo',
    'Te amo mucho ❤️',
    '❤️ Te amo'
];

// ============================================================
// FUNCIÓN: Navegar entre secciones
// ============================================================
function irASeccion(nombreSeccion) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.classList.remove('visible');
    });

    // Mostrar la sección solicitada
    const seccion = document.getElementById(nombreSeccion);
    if (seccion) {
        seccion.classList.add('visible');

        // Si es la lluvia, iniciar animación
        if (nombreSeccion === 'lluvia') {
            iniciarLluvia();
        }

        // Si es el fin, ocultar el botón y limpiar lluvia
        if (nombreSeccion === 'fin') {
            const botonElFin = document.getElementById('boton-el-fin');
            if (botonElFin) {
                botonElFin.style.display = 'none';
            }
            limpiarLluvia();
        }
    }

    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// FUNCIÓN: Inicializar razones dinámicamente
// ============================================================
function inicializarRazones() {
    const listaRazones = document.getElementById('listaRazones');
    listaRazones.innerHTML = ''; // Limpiar contenido anterior

    RAZONES.forEach((razon, index) => {
        const razonDiv = document.createElement('div');
        razonDiv.className = 'razon-item';
        
        const razonHTML = `
            <span class="razon-numero">${index + 1}</span>
            <span class="razon-texto">${razon}</span>
        `;
        
        razonDiv.innerHTML = razonHTML;
        listaRazones.appendChild(razonDiv);
    });
}

// ============================================================
// FUNCIÓN: Iniciar lluvia de "Te amo"
// ============================================================
function iniciarLluvia() {
    if (lluvia_activa) return; // Evitar múltiples inicios
    lluvia_activa = true;

    const contenedorLluvia = document.getElementById('contenedor-lluvia');
    contenedorLluvia.innerHTML = ''; // Limpiar lluvia anterior

    // Mostrar mensaje final con retraso
    setTimeout(() => {
        const mensajeFinal = document.querySelector('.mensaje-final');
        if (mensajeFinal) {
            mensajeFinal.style.display = 'block';
        }
    }, 500);

    // Crear lluvia durante 10 segundos
    let tiempoLluvia = 0;
    const intervaloLluvia = setInterval(() => {
        // Crear múltiples "Te amo" por cada iteración
        for (let i = 0; i < 3; i++) {
            crearTeAmo(contenedorLluvia);
        }

        // Crear algunos corazones ocasionalmente
        if (Math.random() < 0.3) {
            crearCorazonLluvia(contenedorLluvia);
        }

        tiempoLluvia++;
        if (tiempoLluvia >= 12) { // Lluvia de 12 segundos
            clearInterval(intervaloLluvia);
            lluvia_activa = false;

            // Mostrar el botón "El fin" después de que termine la lluvia
            setTimeout(() => {
                const botonElFin = document.getElementById('boton-el-fin');
                if (botonElFin) {
                    botonElFin.style.display = 'block';
                }
            }, 1000);

            // Permitir volver a ver la lluvia
            setTimeout(() => {
                document.querySelector('.mensaje-final').style.display = 'none';
            }, 5000);
        }
    }, 500);
}

// ============================================================
// FUNCIÓN: Crear un elemento "Te amo" que cae
// ============================================================
function crearTeAmo(contenedor) {
    const teAmo = document.createElement('div');
    teAmo.className = 'te-amo';
    
    // Seleccionar variante aleatoria
    const textoTeAmo = variantes_te_amo[Math.floor(Math.random() * variantes_te_amo.length)];
    teAmo.textContent = textoTeAmo;

    // Posición horizontal aleatoria
    const posicionX = Math.random() * window.innerWidth;
    teAmo.style.left = posicionX + 'px';
    teAmo.style.top = '-50px';

    // Color aleatorio
    const color = colores_lluvia[Math.floor(Math.random() * colores_lluvia.length)];
    teAmo.style.color = color;

    // Tamaño aleatorio entre 1rem y 2rem
    const tamaño = 0.8 + Math.random() * 1.2;
    teAmo.style.fontSize = tamaño + 'rem';

    // Velocidad aleatoria (duración de la caída)
    const duracion = 3 + Math.random() * 3; // Entre 3 y 6 segundos
    teAmo.style.animationDuration = duracion + 's';

    // Añadir rotación aleatoria
    teAmo.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Opacidad aleatoria para más variedad
    teAmo.style.opacity = 0.6 + Math.random() * 0.4;

    contenedor.appendChild(teAmo);

    // Eliminar elemento después de que termine la animación para ahorrar memoria
    setTimeout(() => {
        teAmo.remove();
    }, duracion * 1000);
}

// ============================================================
// FUNCIÓN: Crear un corazón que cae en la lluvia
// ============================================================
function crearCorazonLluvia(contenedor) {
    const corazon = document.createElement('div');
    corazon.className = 'corazon-lluvia';
    corazon.textContent = '❤️';

    // Posición horizontal aleatoria
    const posicionX = Math.random() * window.innerWidth;
    corazon.style.left = posicionX + 'px';
    corazon.style.top = '-50px';

    // Velocidad aleatoria
    const duracion = 4 + Math.random() * 3; // Entre 4 y 7 segundos
    corazon.style.animationDuration = duracion + 's';

    // Tamaño aleatorio
    const tamaño = 20 + Math.random() * 40; // Entre 20px y 60px
    corazon.style.fontSize = tamaño + 'px';

    // Opacidad
    corazon.style.opacity = 0.7;

    contenedor.appendChild(corazon);

    // Eliminar elemento después de que termine la animación
    setTimeout(() => {
        corazon.remove();
    }, duracion * 1000);
}

// ============================================================
// FUNCIÓN: Crear corazones flotantes en el fondo
// ============================================================
function crearCorazonesFondo() {
    const fondoDecorativo = document.getElementById('fondo-decorativo');
    const cantidadCorazones = 8;

    for (let i = 0; i < cantidadCorazones; i++) {
        const corazon = document.createElement('div');
        corazon.className = 'corazon-flotante';
        
        // Seleccionar corazón aleatorio
        const corazones = ['❤️', '💗', '💕', '💖'];
        corazon.textContent = corazones[Math.floor(Math.random() * corazones.length)];

        // Posición aleatoria
        corazon.style.left = Math.random() * 100 + '%';
        corazon.style.top = Math.random() * 100 + '%';

        // Retraso de animación aleatorio
        corazon.style.animationDelay = (Math.random() * 3) + 's';

        fondoDecorativo.appendChild(corazon);
    }
}

// ============================================================
// FUNCTION: Limpiar lluvia al cambiar de sección
// ============================================================
function limpiarLluvia() {
    const contenedorLluvia = document.getElementById('contenedor-lluvia');
    if (contenedorLluvia) {
        // Eliminar todos los elementos de lluvia
        contenedorLluvia.innerHTML = '';
    }
    lluvia_activa = false;
}

// ============================================================
// INICIALIZACIÓN: Ejecutar cuando carga la página
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar razones
    inicializarRazones();

    // Crear corazones flotantes en el fondo
    crearCorazonesFondo();

    // Mostrar la sección inicial
    document.getElementById('inicio').classList.add('visible');

    // Evento para limpiar lluvia si el usuario navega
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        if (seccion.id !== 'lluvia') {
            seccion.addEventListener('click', limpiarLluvia);
        }
    });
});

// Limpieza de lluvia al hacer scroll
document.addEventListener('scroll', function() {
    if (lluvia_activa && window.scrollY > 100) {
        // Limpiar lluvia si el usuario hace scroll hacia arriba
        const seccionLluvia = document.getElementById('lluvia');
        if (!seccionLluvia.classList.contains('visible')) {
            limpiarLluvia();
        }
    }
});

// ============================================================
// ANIMACIÓN DEL CORAZÓN LATIENDO EN LA SECCIÓN FIN
// ============================================================

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 2 + Math.random() * 3;
        
        // Colores aleatorios: rosa, rojo y blanco
        const colores = [
            { r: 255, g: 105, b: 180 },  // Rosa fuerte
            { r: 255, g: 20, b: 147 },   // Rosa oscuro
            { r: 233, g: 30, b: 99 },    // Rojo acento
            { r: 255, g: 182, b: 217 },  // Rosa pastel
            { r: 255, g: 255, b: 255 }   // Blanco
        ];
        
        this.color = colores[Math.floor(Math.random() * colores.length)];
        this.opacity = 0.8 + Math.random() * 0.2;
        this.vidas = 255;
    }

    update(tiempo) {
        // Movimiento suave hacia el objetivo
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        
        this.vx += dx * 0.05;
        this.vy += dy * 0.05;
        
        // Fricción
        this.vx *= 0.95;
        this.vy *= 0.95;
        
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Pequeño destello
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x - this.radius / 2, this.y - this.radius / 2, this.radius / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Clase para animar el corazón
class CorazonAnimado {
    constructor() {
        this.canvas = document.getElementById('corazon-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.estado = 'esperando'; // esperando, formando, latiendo, ultimo_latido, fin
        this.tiempo = 0;
        this.escala = 1;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2 - 50;
        this.velocidadFormacion = 0;
        
        this.resizarCanvas();
        window.addEventListener('resize', () => this.resizarCanvas());
    }

    resizarCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2 - 50;
    }

    // Generar puntos en forma de corazón usando ecuación paramétrica
    generarPuntosCorazon(escala = 1) {
        const puntos = [];
        const densidad = 150; // Cantidad de partículas
        
        for (let i = 0; i < densidad; i++) {
            const t = (i / densidad) * Math.PI * 2;
            
            // Ecuación paramétrica del corazón
            const x = 16 * Math.sin(t) ** 3;
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            // Agregar algunas partículas aleatorias dentro del corazón
            const xFinal = this.centerX + x * 3 * escala;
            const yFinal = this.centerY + y * 3 * escala;
            
            puntos.push({ x: xFinal, y: yFinal });
            
            // Partículas internas para llenar el corazón
            if (Math.random() < 0.6) {
                const xAleatorio = x * (0.5 + Math.random() * 0.8);
                const yAleatorio = y * (0.5 + Math.random() * 0.8);
                puntos.push({
                    x: this.centerX + xAleatorio * 3 * escala,
                    y: this.centerY + yAleatorio * 3 * escala
                });
            }
        }
        
        return puntos;
    }

    iniciarAnimacion() {
        if (this.estado !== 'esperando') return;
        
        // Generar partículas en posiciones aleatorias
        const puntosCorazon = this.generarPuntosCorazon();
        
        for (let punto of puntosCorazon) {
            // Posición inicial aleatoria en la pantalla
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            const particle = new Particle(posX, posY);
            particle.targetX = punto.x;
            particle.targetY = punto.y;
            
            this.particles.push(particle);
        }
        
        this.estado = 'formando';
        this.tiempo = 0;
        this.animar();
    }

    animar = () => {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.estado === 'formando') {
            this.tiempo++;
            
            // Acelerar la velocidad de formación
            this.velocidadFormacion = Math.min(this.tiempo / 100, 1);
            
            for (let particle of this.particles) {
                const dx = particle.targetX - particle.x;
                const dy = particle.targetY - particle.y;
                
                particle.x += dx * (0.02 + this.velocidadFormacion * 0.08);
                particle.y += dy * (0.02 + this.velocidadFormacion * 0.08);
                particle.draw(this.ctx);
            }
            
            // Transición a latidos después de 2.5 segundos
            if (this.tiempo > 250) {
                this.estado = 'latiendo';
                this.tiempo = 0;
            }
        }
        else if (this.estado === 'latiendo') {
            this.tiempo++;
            
            // Latidos suaves inicialmente
            const latido1 = Math.sin(this.tiempo * 0.05) * 0.02 + 1;
            let latido = latido1;
            
            // Después de 3 segundos, latidos más fuertes
            if (this.tiempo > 300) {
                latido = 1 + Math.sin(this.tiempo * 0.08) * 0.08;
            }
            
            // Después de 6 segundos, ir al último latido
            if (this.tiempo > 600) {
                this.estado = 'ultimo_latido';
                this.tiempo = 0;
                latido = 1;
            }
            
            this.escala = latido;
            this.dibujarCorazon();
        }
        else if (this.estado === 'ultimo_latido') {
            this.tiempo++;
            
            // Último latido más dramático (0-400 frames = 6.67 segundos)
            let progreso = this.tiempo / 400;
            
            if (progreso < 0.3) {
                // Expansión rápida (primeros 0.3 segundos)
                this.escala = 1 + Math.sin(progreso * Math.PI / 0.3) * 0.4;
            } else if (progreso < 0.6) {
                // Contracción (0.3 a 0.6 segundos)
                const p = (progreso - 0.3) / 0.3;
                this.escala = 1.4 - p * 0.3;
            } else {
                // Vuelta a la normalidad (0.6+ segundos)
                this.escala = 1.1 - (progreso - 0.6) * 0.1;
            }
            
            // Efecto de iluminación durante el latido
            if (progreso < 0.3) {
                const brillo = Math.sin(progreso * Math.PI / 0.3);
                this.ctx.fillStyle = `rgba(255, 105, 180, ${brillo * 0.3})`;
                this.ctx.beginPath();
                this.ctx.arc(this.centerX, this.centerY, 150 * this.escala + 50, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Disparar algunas partículas
                if (progreso < 0.2 && Math.random() < 0.3) {
                    this.dispararParticula();
                }
            }
            
            this.dibujarCorazon();
            
            // Fin después del último latido
            if (this.tiempo > 400) {
                this.estado = 'fin';
            }
        }
        else if (this.estado === 'fin') {
            this.escala = 1;
            this.dibujarCorazon();
        }
        
        if (this.estado !== 'fin') {
            requestAnimationFrame(this.animar);
        }
    }

    dibujarCorazon() {
        for (let particle of this.particles) {
            // Aumentar brillo durante latidos fuertes
            if (this.estado === 'ultimo_latido' && this.tiempo < 120) {
                particle.opacity = Math.min(1, particle.opacity + 0.02);
            }
            
            particle.draw(this.ctx);
        }
    }

    dispararParticula() {
        if (this.particles.length === 0) return;
        
        const particle = this.particles[Math.floor(Math.random() * this.particles.length)];
        
        // Crear una partícula que sale disparada
        const dx = particle.x - this.centerX;
        const dy = particle.y - this.centerY;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        
        if (distancia > 0) {
            const vx = (dx / distancia) * 8;
            const vy = (dy / distancia) * 8;
            
            particle.vx = vx;
            particle.vy = vy;
        }
    }
}

// Inicializar cuando se llega a la sección "fin"
let corazonAnimado = null;

// Modificar la función irASeccion para iniciar el corazón
const irASeccionOriginal = irASeccion;
window.irASeccion = function(nombreSeccion) {
    irASeccionOriginal(nombreSeccion);
    
    if (nombreSeccion === 'fin' && !corazonAnimado) {
        setTimeout(() => {
            corazonAnimado = new CorazonAnimado();
            corazonAnimado.iniciarAnimacion();
        }, 1000);
    }
};
