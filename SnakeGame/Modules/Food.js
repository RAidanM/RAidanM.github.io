import GameComponent from "./GameComponent.js";
export default class Food extends GameComponent{
    power = 1;
    
    constructor(x,y){
        super(x,y,0);
    }

    get power(){
        return this.power;
    }

}