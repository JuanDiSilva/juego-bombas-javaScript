//Se selecciona la etiqueta canvas del html.
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//Constantes let scope
//Se define una variables let para el tamaño de canvas, size
let canvasSize;
let elementosSize;

//Carga de la ventana canvas, inicio juego
window.addEventListener('load', colocarCanvasTamanio);
windows.addEventListener('resize', colocarCanvasTamanio);

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

    for(let i = 1; i <= 10; i++)
    {
        for(let j =1; j<=10; j++)
        {
          //Se coloca +(lementosSize/5) y -(elementosSize/5) para que se adapte a cualquier pantalla
          game.fillText(emojis['X'], (elementosSize * i)+(elementosSize/5), (elementosSize * j)-(elementosSize/5));
        }
    }
}