//Se selecciona la etiqueta canvas del html.
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

//Carga de la ventana canvas, inicio juego
window.addEventListener('load', inicioGame);

//Con esta funcion se trabaja sobre el canvas
function inicioGame()
{
    //Se define una variable loca para el tamaño de canvas, size
    let canvasSize;
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
    const elementosSize = canvasSize / 10;
    console.log({ canvasSize,elementosSize });
    
    game.font = elementosSize + 'px Verdana';
    game.textAlign = 'end';

    for(let i = 1; i <= 10; i++)
    {
        game.fillText(emojis['X'], elementosSize * i, elementosSize);
    }
    //game.fillRect(0,50,100,100);
    //game.clearRect(50,50,50,50);
    //game.clearRect();
    //game.clearRect(0,0,50,50);
    
    //Para que el texto tenga color, tamaño y se vea centrado
    
    //game.fillStyle = 'purple';
    //game.textAlign = 'center';
    //game.fillText('JulioGame', 80, 50);
}