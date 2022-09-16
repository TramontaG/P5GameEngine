import Vector2D from "../../math/vector2d";
import Game from "../../Game";
import GameObject from "../../gameObject";
import Hitbox, { HitboxType } from "../../gameObject/hitbox";
import Wall from "./Wall";

class BouncingSquare extends GameObject {
    width: number;
    height: number;
    
    constructor(game: Game){
        super(game);
    
        this.position = new Vector2D(80, 40);
        this.width = 10;
        this.height= 10;
        
        this.hitboxes.push(new Hitbox(this, HitboxType.square, {
            xSize: this.width,
            ySize: this.height,
            debug: true,
        }));
        
        this.setGravity(1);
    }

    handleCollision(other: GameObject){
        if (other.is(Wall)){
            const oldVelocity = this.velocityAsVector;
            const newVelocity = this.velocityAsVector.multiply(-1);

            console.log({oldVelocity, newVelocity});
            this.velocityAsVector = this.velocityAsVector.multiply(-1).add(new Vector2D(0, 0.1));
        }
    }

    render(canvas: Game["canvas"]){
        canvas.rectMode("center");
        canvas.fill(255,255,0);
        canvas.rect(0,0,this.width, this.height);
    }
}

export default BouncingSquare;