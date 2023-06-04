import GameComponent from "./GameComponent";
export default class Food extends GameComponent{
    power = 1;
    
    constructor(){
        super(0,0,0);
    }

    get power(){
        return this.power;
    }

}