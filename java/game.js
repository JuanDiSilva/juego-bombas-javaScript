//Se selecciona la etiqueta canvas del html.
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

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
    const map = maps[0];
    console.log(map);
    //.trim elimina espacios al string al comienzo y final, .split divide el string en arrays
    const mapFilas = map.trim().split('\n');
    //Se crea un string para cada fila de arreglos, map crea un nuevo array
    const mapFilaCols = mapFilas.map(row => row.trim().split(''));
    console.log({map, mapFilas, mapFilaCols});

    for(let fila = 1; fila <= 10; fila++)
    {
        for(let columna =1; columna<=10; columna++)
        {
          //Se coloca +(lementosSize/5) y -(elementosSize/5) para que se adapte a cualquier pantalla
          game.fillText(emojis[mapFilaCols[fila-1][columna-1]], elementosSize * columna, elementosSize * fila);
        }
    }
}