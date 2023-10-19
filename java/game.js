//Se selecciona la etiqueta canvas del html.
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
//Se seleccionan los botones de html
const botonArriba = document.querySelector('#up');
const botonIzquierda = document.querySelector('#left');
const botonDerecha = document.querySelector('#right');
const botonAbajo = document.querySelector('#down');

//Constantes let scope
//Se define una variables let para el tamaño de canvas, size
let canvasSize;
let elementosSize;

//Carga de la ventana canvas, inicio juego
window.addEventListener('load', colocarCanvasTamanio);
window.addEventListener('resize', colocarCanvasTamanio);

//Con esta funcion se cambia el tamanio al canvas
function colocarCanvasTamanio()
{
    if(window.innerWidth > window.innerHeight)
    {
        canvasSize = window.innerHeight * 0.8;
    }
    else
    {
        canvasSize = window.innerWidth * 0.8;
    }
    //Atribotos de la anchura y altura
    canvas.setAttribute('width',canvasSize)
    canvas.setAttribute('height',canvasSize)
    //Se define el bloque para los pixelees de cada emoji, elementos tamaño
    elementosSize = canvasSize / 10;

    inicioGame();
}
//Funcion para iniciar el juego en canvas
function inicioGame()
{
    console.log({ canvasSize,elementosSize });
    
    game.font = elementosSize + 'px Verdana';
    game.textAlign = 'end';

    //Creacion array del mapa
    const map = maps[2];
    console.log(map);
    //.trim elimina espacios al string al comienzo y final, .split divide el string en arrays
    const mapFilas = map.trim().split('\n');
    //Se crea un string para cada fila de arreglos, map crea un nuevo array
    const mapFilaCols = mapFilas.map(row => row.trim().split(''));
    console.log({map, mapFilas, mapFilaCols});

    //Creacion ciclo forEach para recorrer el array, .fillText permite dibujar en el canvas
    // +1, es porque en canvas los emojis empiezan en 0
    mapFilaCols.forEach((row, filaI) => {
        row.forEach((col, columnaI) => {
            const emoji = emojis[col];
            const posX  = elementosSize * (columnaI + 1);
            const posY  = elementosSize * (filaI + 1);
            game.fillText(emoji, posX, posY);
        });
    });
}

//Bloque movimiento por teclas y botones html
//Al pulsar las teclas
window.addEventListener('keydown', movePorTeclas);
botonArriba.addEventListener('click', moveArriva);
botonIzquierda.addEventListener('click', moverIzquierda);
botonDerecha.addEventListener('click', moverDerecha);
botonAbajo.addEventListener('click', moverAbajo);

function movePorTeclas(event)
{
    if(event.key == "ArrowUp") moveArriva();
    else if(event.key == "ArrowLeft") moverIzquierda();
    else if(event.key == "ArrowRight") moverDerecha();
    else if(event.key == "ArrowDown") moverAbajo();
}

function moveArriva()
{
    console.log("Me quiero mover hacia arriba");
}
function moverIzquierda()
{
    console.log("Me quiero mover hacia la izquierda");
}
function moverDerecha()
{
    console.log("Me quiero mover hacia la derecha");
}
function moverAbajo()
{
    console.log("Me quiero mover abajo");
}