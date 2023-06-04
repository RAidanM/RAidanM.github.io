export default class GameComponent {
    xPosition;
    yPosition;
    value;

    constructor(xPosition,yPosition,value){
        this.xPosition=xPosition;
        this.yPosition=yPosition;
        this.value=value;
    }

    get x() {
        return this.xPosition;
    }

    get y() {
        return this.yPosition;
    }

    get value() {
        return this.value;
    }

}