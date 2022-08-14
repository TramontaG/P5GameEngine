import Vector2D from "../../math/vector2d";
import Game from "../../Game";
import GameObject from "../../gameObject";

class Wall extends GameObject {
    width: number;
    height: number;
    
    constructor(game: Game){
        super(game);
    
        this.position = new Vector2D(20, 40);
        this.width = 20;
        this.height= 40;
    }


    render(canvas: Game["canvas"]){
        canvas.rectMode("center");
        canvas.fill(255,255,0);
        canvas.rect(0,0,this.width, this.height);
    }
}

export default Wall;