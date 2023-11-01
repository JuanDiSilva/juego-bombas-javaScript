//Se selecciona la etiqueta canvas del html.
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
//Se seleccionan los botones de html
const botonArriba = document.querySelector('#up');
const botonIzquierda = document.querySelector('#left');
const botonDerecha = document.querySelector('#right');
const botonAbajo = document.querySelector('#down');
const spanLives = document.querySelector('#vidas');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResultado = document.querySelector('#resultado');

//Constantes let scope
//Se define una variables let para el tamaño de canvas, size
let canvasSize;
let elementosSize;
let nivel = 0;
let vidas = 3;

let tiempoInicio;
let timepoJugador;
let tiempoIntervalo;

//Creacion constantes posicion usuario
const jugadorPosicion = {
  x: undefined,
  y: undefined,
};

//Creacion de la posicion del regalo
const regaloPosicion = {
    x: undefined,
    y: undefined,
};

//Creacion array posicion enemigo
let enemigoPosicion = [];

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
    const map = maps[nivel];
    //Si la condicion es verdadera
    if(!map)
    {
      juegoGanado();
      return;
    }
    
    if(!tiempoInicio)
    {
        //Date.now() devuelve el numero de miliseguendos entre 00
        tiempoInicio = Date.now();
        console.log("tiempo:" + tiempoInicio);
        tiempoIntervalo = setInterval(mostrarTiempo, 100);
        mostrarRecord();
    }
    //.trim elimina espacios al string al comienzo y final, .split divide el string en arrays
    const mapFilas = map.trim().split('\n');

    //Se crea un string para cada fila de arreglos, map crea un nuevo array
    const mapFilaCols = mapFilas.map(row => row.trim().split(''));
    console.log({map, mapFilas, mapFilaCols});
    //Se llama la funcion mostrar vidas
    mostrarVidas();
    //Definicion array de los enemigos
    enemigoPosicion = [];

    //Para que no se muestre toda la calabera
    game.clearRect(0,0, canvasSize, canvasSize);

    //Creacion ciclo forEach para recorrer el array, .fillText permite dibujar en el canvas
    // +1, es porque en canvas los emojis empiezan en 0
    mapFilaCols.forEach((row, filaI) => {
        row.forEach((col, columnaI) => {
            const emoji = emojis[col];
            const posX  = elementosSize * (columnaI + 1);
            const posY  = elementosSize * (filaI + 1);
            
            if(col == 'O')
            {
              //Si la posicion en x y la posicion en Y estan definidas entra al siguiente ciclo if
              if (!jugadorPosicion.x && !jugadorPosicion.y)
              {
                jugadorPosicion.x = posX;
                jugadorPosicion.y = posY;
                console.log({jugadorPosicion}); 
              }
            }
            else if(col == 'I')
            {
              regaloPosicion.x = posX;
              regaloPosicion.y = posY;
            }
            else if(col == 'X')
            {
              enemigoPosicion.push({
                x: posX,
                y:posY,
              });
            }
              
            game.fillText(emoji, posX, posY);
        });
    });
    movJugador();
}

//Funcion movimiento del jugador
function movJugador()
{
    //Cuando hay colision con el regalo
    const regaloColisionX = jugadorPosicion.x.toFixed(3) == regaloPosicion.x.toFixed(3);
    const regaloColisionY = jugadorPosicion.y.toFixed(3) == regaloPosicion.y.toFixed(3);
    const regaloColision = regaloColisionX && regaloColisionY;

    if(regaloColision)
    {
        nivelGanado();
    }

    //Creacion de la funcion colision
    const enemigoCollision = enemigoPosicion.find(enemy => {
        const enemigoColisionX = enemy.x.toFixed(3) == jugadorPosicion.x.toFixed(3);
        const enemigoColisionY = enemy.y.toFixed(3) == jugadorPosicion.y.toFixed(3);
        return enemigoColisionX && enemigoColisionY;
    });

    if(enemigoCollision)
    {
        nivelFallido();
    }
    game.fillText(emojis['PLAYER'], jugadorPosicion.x, jugadorPosicion.y);
}
//Funcion Juego Ganado
function nivelGanado()
{
    console.log('Subiste de nivel');
    nivel++;
    inicioGame();
}
//Funcion nivel Fallido
function nivelFallido()
{
    console.log("CHOCO CON UN ENEMIGO :(");
    vidas--;

    console.log("Vidas: " + vidas);

    if(vidas <= 0)
    {
       nivel = 0;
       vidas = 3;
       tiempoInicio = undefined;
    }

    jugadorPosicion.x = undefined;
    jugadorPosicion.y = undefined;
    inicioGame();
}
//Funcion ganar el juego
function juegoGanado()
{
    console.log('!GAME OVER');
    clearInterval(tiempoIntervalo);

    const recordTime =  localStorage.getItem('record_time');
    const playerTime = Date.now() - tiempoInicio;

    if(recordTime)
    {
        if(recordTime >= playerTime)
        {
            localStorage.setItem('record_time', playerTime);
            pResultado.innerHTML = 'Superaste el RECORD :)';
        }
        else
        {
            pResultado.innerHTML = "Lo sentimos, No superaste el RECORD :(";
        }
    }
    console.log("Records: " + {recordTime,playerTime});
}
//Funcion para mostrar el numero de vidas
function mostrarVidas()
{
    const heartsArray = Array(vidas).fill(emojis['HEART']);
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
}
//Funcion para mostar el tiempo en pantalla
function mostrarTiempo()
{
    spanTime.innerHTML = Date.now() - tiempoInicio;
}
//Funcion para mostarr el record del juagador
function mostrarRecord()
{
    spanRecord.innerHTML = localStorage.getItem('record_time');
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
    if ((jugadorPosicion.y - elementosSize) < elementosSize) 
    {
        console.log('ESTA AFUERA');
    }
    else
    {
       //-= contador decendente jugadorPosicion.y = jugadorPosicion - elementosSize
       jugadorPosicion.y -= elementosSize;
       inicioGame();   
    }
}
function moverIzquierda()
{
    console.log("Me quiero mover hacia la izquierda");
    if ((jugadorPosicion.x - elementosSize) < elementosSize)
    {
      console.log('ESTA AFUERA');
    }
    else
    {
      jugadorPosicion.x -= elementosSize;
      inicioGame();
    }
}
function moverDerecha()
{
    console.log("Me quiero mover hacia la derecha");
    if ((jugadorPosicion.x + elementosSize) > canvasSize)
    {
      console.log('ESTA AFUERA');   
    }
    else
    {
       jugadorPosicion.x += elementosSize;
       inicioGame();
    }
}
function moverAbajo()
{
    console.log("Me quiero mover abajo");
    if ((jugadorPosicion.y + elementosSize) > canvasSize)
    {
      console.log("ESTA AFUERA");    
    }
    else
    {
      jugadorPosicion.y += elementosSize;
      inicioGame();
    }
}