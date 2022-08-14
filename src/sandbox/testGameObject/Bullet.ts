import Vector2D from "math/vector2d";
import Game from "../../Game";
import GameObject from "../../gameObject";
import Wall from "./Wall";

class Bullet extends GameObject {

    constructor(game: Game, pos: Vector2D, vel: number, angle: number){
        super(game);
        this.position = pos;
        this.velocity = vel;
        this.rotationAngle = angle;
        
        setTimeout(() => {
            this.delete();
        }, 1000)
    }

    render(canvas: import("p5")): void {
        canvas.fill(0,0,255);
        canvas.noStroke();
        canvas.circle(0, 0, 3);
    }

    handleCollision(other: GameObject){
        if (other.is(Wall)){
            this.delete();
            console.log("Bullet collided with wall");
        }
    }

}

export default Bullet;