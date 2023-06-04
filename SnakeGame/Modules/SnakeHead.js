import GameComponent from "./GameComponent.js";

export default class SnakeHead extends GameComponent{

    constructor(xPosition, yPosition) {
        super(xPosition,yPosition,1);
    }

    move(x,y){
        this.xPosition += x;
        this.yPosition += y;
    }

    d
}