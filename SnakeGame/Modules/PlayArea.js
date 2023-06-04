export default class PlayArea {
    width;
    height;
    board = [];
    
    constructor(width, height){
        this.width = width;
        this.height = height;

        let row = new Array(width);
        for (let i = 0; i<width; i++){
            let column = new Array(height);
            for (let j = 0; j<height; j++){
                column[j]=-1;
            }
            row[i]=column;
        }
        this.board = row;
    }

    clear(){
        for (let i = 0; i<this.width; i++){
            for (let j = 0; j<this.height; j++){
                this.board[i][j]=-1;
            }
        }
    }

    update(x, y, value){
        this.board[x][y]=value;
    }

    toString(){
        var out = "";

        for (let i = this.height-1; i>=0; i--){
            for (let j = 0; j<this.width; j++){
                out = out + this.board[j][i];
            }
            out = out + "\n";
        }
        return out;
    }
}
