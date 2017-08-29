//Variables
var cuadrados;
var desaparecer_cuadros = false;
var last_known_scroll_position = 0;
var ticking = false;
var totalWidth,
    totalHeight;
var fuente;
var texto;
// funcion de precarga de archivos
function preload() {
    fuente = loadFont('/fonts/hotpizza.ttf');
}
// funcion de setup del sketch
function setup() {
    totalWidth = window.innerWidth;
    totalHeight = window.innerHeight * 0.8;
    //creo un canvas asignado a mi id
    var myCanvas = createCanvas(totalWidth, totalHeight);
    myCanvas.parent('sketch1');
    //inicializo el grupo de sprites
    cuadrados = new Group();
    inicializar();
}

//funcion de dibujoo constante de mis sprites
function draw() {
    //pinta el fondo
    background(0, 0, 0);

    //Asigno el rebote a mi grupo de sprites
    cuadrados.bounce(cuadrados);
    // verifico cada sprite y sus posiciones con los margenes para hacerlos rebotar-
    // en sentido opuesto, desparecerlos y cambiar su velocidad on scroll
    for (var i = 0; i < allSprites.length; i++) {
        var s = allSprites[i];

        if (s.position.x < 0) {
            s.position.x = 1;
            s.velocity.x = abs(s.velocity.x);
            s.count++;
        }

        if (s.position.x > totalWidth) {
            s.position.x = totalWidth - 1;
            s.velocity.x = -abs(s.velocity.x);
            s.count++;
        }

        if (s.position.y < 0) {
            s.position.y = 1;
            s.velocity.y = abs(s.velocity.y);
            s.count++;
        }

        if (s.position.y > totalHeight) {
            s.position.y = totalHeight - 1;
            s.velocity.y = -abs(s.velocity.y);
            s.count++;
        }
        if (s.count > 4 || s.position.y < 2) {
            s.remove();
        }
        if (desaparecer_cuadros) {
            s.velocity.y = -20;
        }
        if (allSprites.length > 90) {
            s.restitution = 3;
        }

    }
    // creo los sprites despues de aplicadas las funciones de cada ciclo
    drawSprites();
    //pinta el texto
    fill(255);
    //Alineacion del texto
    textFont(fuente, [28]);
    textAlign(CENTER);
    text(texto, totalWidth / 2, totalHeight / 2);
}
function inicializar() {
    for (var i = 0; i < 5; i++) {
        var s = createSprite(random(0, totalWidth), random(0, totalHeight), 30, 30);
        s.velocity.x = random(-5, 5);
        s.velocity.y = random(-5, 5);
        s.scale = random(0.5, 1);
        s.mass = s.scale;
        s.count = 0;
        s.restitution = 1;
        cuadrados.add(s);
    }
    texto = "Click me!";
}
// funcion de reseteo del texto
function cambioTexto() {
    setTimeout(() => {
        texto = "Click me!"
    }, 5000);
}

// funcion para manejar los eventos del scroll
function manejadorScroll(scroll_pos) {
    //si el scroll sobrepasa cierto valor las figuras cambian de velocidad
    if (scroll_pos > totalHeight / 6) {
        desaparecer_cuadros = true;

    } else if (scroll_pos < (totalHeight / 6) && desaparecer_cuadros) {
        desaparecer_cuadros = false;
        for (var i = 0; i < allSprites.length; i++) {
            var s = allSprites[i];
            s.velocity.x = random(-5, 5);
            s.velocity.y = random(-5, 5);
        }
    }
    //print("coord", scroll_pos);
}
// manejador de scroll listener
window
    .addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window
                .requestAnimationFrame(function () {
                    manejadorScroll(last_known_scroll_position);
                    ticking = false;
                });
        }
        ticking = true;
    });
//Manejador de presion del mouse
function mousePressed() {
    // crea 10 sprites y los asigna a una posicion y velocidad random asi como las
    // adiciona a mi grupo de cuadros, se les asigna masa para un rebote

    if (allSprites.length > 90) {
        texto = "Calma vaquero!";
        cambioTexto();
    } else {
        for (var i = 0; i < 20; i++) {
            var s = createSprite(random(0, totalWidth), random(0, totalHeight), 30, 30);
            s.velocity.x = random(-5, 5);
            s.velocity.y = random(-5, 5);
            s.scale = random(0.5, 1);
            s.mass = s.scale;
            s.count = 0;
            s.restitution = 1;
            cuadrados.add(s);
        }
    }

}
// funcion touch para devices
function touchStarted() {
    for (var i = 0; i < 10; i++) {
        var s = createSprite(random(0, totalWidth), random(0, totalHeight), 30, 30);
        s.velocity.x = random(-5, 5);
        s.velocity.y = random(-5, 5);
        s.scale = random(0.5, 1);
        s.mass = s.scale;
        s.count = 0;
        s.restitution = 1;
        cuadrados.add(s);
    }
}
// manejador responsive de canvas
function windowResized() {
    totalWidth = window.innerWidth;
    totalHeight = window.innerHeight * 0.8;
    resizeCanvas(window.innerWidth, totalHeight);
}