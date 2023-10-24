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

-Add 1 to all segments
    if number is above body size then replace with -1
-Check to see if collision of head on a segment
    if food then remove food and add to body size variable
-Place food if not enough food on the board 
*/
import PlayArea from './Modules/PlayArea.js';
import SnakeHead from './Modules/SnakeHead.js';
import GameComponent from './Modules/GameComponent.js';
import SnakeBody from './Modules/SnakeBody.js';
import Food from './Modules/Food.js';

var gameSpeed = 100;

var playArea = new PlayArea(25,25);

var snakeLength = 10;
var snakePointWord = ["Right"];
var snakeDirectionWord = "Right";
var snakeDirection = [0,1];

var head = new SnakeHead(3,3);

var gameComponents = [];
gameComponents.push(head);
gameComponents.push(
    new SnakeBody(head.x, head.y, head.value+1)
);

var foodAmount = 1;
var foodInPlay = 0;

window.addEventListener('keydown', (event) => {
    var eventCode = event.code;
    // Alert the key name and key code on keydown
    //alert(`Key pressed ${name} \r\n Key code value: ${eventCode}`);

    if ((eventCode === ("KeyW")) || (eventCode === ("ArrowUp"))){
        if(snakePointWord.length<2)snakePointWord.push("Up");
    }
    else if ((eventCode === ("KeyD")) || (eventCode === ("ArrowRight"))){
        if(snakePointWord.length<2)snakePointWord.push("Right");
    }
    else if ((eventCode === ("KeyS")) || (eventCode === ("ArrowDown"))){
        if(snakePointWord.length<2)snakePointWord.push("Down");
    }
    else if ((eventCode === ("KeyA")) || (eventCode === ("ArrowLeft"))){
        if(snakePointWord.length<2)snakePointWord.push("Left");
    }
    
}, false);

var runGame = setInterval(gameTick, gameSpeed);

function gameTick(){

    //Add food
    // while(foodInPlay<foodAmount){
    //     nextFood;
    // }

    //Moving snake body
    gameComponents.push(
        new SnakeBody(head.x, head.y, head.value+1)
    );

    //it stops moving because snakePointWOrd is not empty but it doesn't add a 
    if(snakePointWord.length===0){
        snakePointWord[0]=snakeDirectionWord;
    }

    console.log("trying to go "+snakePointWord[0]+" while it is going "+snakeDirectionWord)
    if ((snakePointWord[0] === "Up") && !(snakeDirectionWord === "Down")){
        snakeDirection = [0,1];
        snakeDirectionWord = snakePointWord[0];
        snakePointWord.shift();
    }
    else if ((snakePointWord[0] === "Right") && !(snakeDirectionWord === "Left")){
        snakeDirection = [1,0];
        snakeDirectionWord = snakePointWord[0];
        snakePointWord.shift();
    }
    else if ((snakePointWord[0] === "Down") && !(snakeDirectionWord === "Up")){
        snakeDirection = [0,-1];
        snakeDirectionWord = snakePointWord[0];
        snakePointWord.shift();
    }
    else if ((snakePointWord[0] === "Left") && !(snakeDirectionWord === "Right")){
        snakeDirection = [-1,0];
        snakeDirectionWord = snakePointWord[0];
        snakePointWord.shift();
    }

    head.move(snakeDirection[0],snakeDirection[1]);

    gameComponents.forEach(component => {
        if(component instanceof SnakeBody){
            component.age();

            let index = gameComponents.findIndex(component => component.life > snakeLength);
            if (!(index === -1)){
                gameComponents.splice(index, 1);
            }

        }
    });

    //Collision
    gameComponents.forEach(component => {
        if(!(component instanceof SnakeHead)&&(component.x===head.x && component.y===head.y)){
            if(component instanceof SnakeBody){
                component.value = 3;
                lose();
            }
            else if (component instanceof Food){
                snakeLength += component.power;
                component.value = -1;
                foodInPlay--;
                let index = gameComponents.findIndex(component => component.value -1);
                if (!(index === -1)){
                    gameComponents.splice(index, 1);
                }
            }
            
        }
    });
    if(head.x < 0 || playArea.width <= head.x || head.y < 0 || playArea.height <= head.y){
        lose();
    }

    //new food
    nextFood();

    //wrender
    playArea.clear();
    gameComponents.forEach(component => {
        playArea.update(component.x, component.y, component.value);
    });
    document.getElementById("board").innerHTML = render(playArea);
    document.getElementById("score").innerHTML = snakeLength;
}

function render(text){

    
    text = String(text).replaceAll("-1", "⬜");
    text = String(text).replaceAll("1", "🟠");
    text = String(text).replaceAll("2", "🟧");
    text = String(text).replaceAll("3", "❌");
    text = String(text).replaceAll("0", "🍑");
    return text;
}

function lose(){
    alert("You lose!");
    clearInterval(runGame);
    
}

function nextFood(){
    if(foodInPlay<foodAmount){
        gameComponents.push(
            new Food(
                Math.floor((Math.random() * playArea.width)), 
                Math.floor((Math.random() * playArea.height))
        ));
        foodInPlay++;
    }
}
