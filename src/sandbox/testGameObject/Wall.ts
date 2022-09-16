import Vector2D from "../../math/vector2d";
import Game from "../../Game";
import GameObject from "../../gameObject";
import Hitbox, { HitboxType } from "../../gameObject/hitbox";

class Wall extends GameObject {
    width: number;
    height: number;
    
    constructor(game: Game){
        super(game);
    
        this.position = new Vector2D(80, 80);
        this.width = 20;
        this.height= 20;
        
        this.hitboxes.push(new Hitbox(this, HitboxType.square, {
            xSize: this.width,
            ySize: this.height,
            debug: true,
        }));
    }


    render(canvas: Game["canvas"]){
        canvas.rectMode("center");
        canvas.fill(255,255,0);
        canvas.rect(0,0,this.width, this.height);
    }
}

export default Wall;