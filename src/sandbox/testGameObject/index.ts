import Game from "../../game";
import GameObject from "../../gameObject";
import * as Controls from '../../utils/Controls';
import * as Colors from '../../utils/Colors';
import Vector2D from "math/vector2d";

class TestGameObject extends GameObject {
    private color: number[];
    private size: number;

    constructor(game: Game){
        super(game);

        this.color = [255,255,255];
        this.size = 10;
        this.rotationAngle = 0;
        
        this.keyCallbackMap = {
            keyHeld: {
                ...Controls.WASD(this),
                ["+"]: this.increaseSize.bind(this),
                ["-"]: this.decreaseSize.bind(this),
            },
            keyDown: {
                [" "]: this.changeColor.bind(this),
            }
        }
    }

    changeColor(){
        this.color = Colors.randomRGB();
    }

    increaseSize(){
        this.size += 1;
    }

    decreaseSize(){
        if (this.size <= 0) return;
        this.size -= 1;
    }

    render(canvas: Game["canvas"]){
        canvas.fill(this.color);
        canvas.square(0, 0, this.size);
    }

    beforeRender(canvas: Game["canvas"]){
        canvas.rectMode("center");
    }

    onLeftMouseButtonHeld(canvas: Game["canvas"], mousePos: Vector2D){
        this.rotationAngle += 1 / (360 / Math.PI);
    }
    
}

export default TestGameObject;
