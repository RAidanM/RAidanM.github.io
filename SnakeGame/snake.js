/*
Snake Game

Tick System
Board represented by numbers
--1 empty space
-0 food
-1 snake head
-2...+ body
Body Growth - each segment counts up until it is over the size of the snake
Movement - movement keys change direction arieable - every tick it moces the head in the set direction and replaced its former location with segment

Order of Operations
Tick
-Moved head
    if food then remove food and add to body size variable
-Add 1 to all segments
    if number is above body size then replace with -1
-Check to see if collision of head on a segment
-Place food if not enough food on the board 
*/
import PlayArea from './Modules/PlayArea.js';
import SnakeHead from './Modules/SnakeHead.js';
import GameComponent from './Modules/GameComponent.js';
import SnakeBody from './Modules/SnakeBody.js';


var snakeLength = 10;
var snakeDirection = [1,0];

var head = new SnakeHead(0,0);

var gameComponents = [];
gameComponents.push(head);
gameComponents.push(
    new SnakeBody(head.x, head.y, head.value+1)
);

var foodAmount;
var foodInPlay;

var playArea = new PlayArea(50,50);

window.addEventListener('keydown', (event) => {
    var eventCode = event.code;
    // Alert the key name and key code on keydown
    //alert(`Key pressed ${name} \r\n Key code value: ${eventCode}`);

    if (eventCode === ("KeyW") && snakeDirection != [0,-1]){
        snakeDirection = [0,1];
    }
    else if (eventCode === ("KeyD" || "ArrowRight")){
        snakeDirection = [1,0];
    }
    else if (eventCode === ("KeyS" || "ArrowDown")){
        snakeDirection = [0,-1];
    }
    else if (eventCode === ("KeyA" || "ArrowLeft")){
        snakeDirection = [-1,0];
    }
    
}, false);

setInterval(gameTick, 100);

function gameTick(){

    gameComponents.push(
        new SnakeBody(head.x, head.y, head.value+1)
    );
    head.move(snakeDirection[0],snakeDirection[1])

    gameComponents.forEach(component => {
        if(component instanceof SnakeBody){
            component.age();

            let index = gameComponents.findIndex(component => component.life > snakeLength);
            if (!(index === -1)){
                gameComponents.splice(index, 1);
            }

        }
        else if(component){

        }
    });

    //wrender
    playArea.clear();
    gameComponents.forEach(component => {
        playArea.update(component.x, component.y, component.value);
    });
    document.getElementById("board").innerHTML = render(playArea);

}

function render(text){

    
    text = String(text).replaceAll("-1", "⬜");
    text = String(text).replaceAll("1", "🟠");
    for(let i = 1; i<snakeLength+1; i++){
        text = String(text).replaceAll(""+i, "🟧");
    }
    return text;
}

