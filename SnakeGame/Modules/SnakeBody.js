import GameComponent from "./GameComponent.js";
export default class SnakeBody extends GameComponent{

    life;

    constructor(xPosition, yPosition, value) {
        super(xPosition, yPosition, value);
        this.life = value;
    }

    age(){
        this.life++;
    }

    get life (){
        return this.life;
    }

}