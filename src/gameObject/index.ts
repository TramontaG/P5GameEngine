import Vector2D from "../math/vector2d";
import Game from "../game";
import { RenderEvent, SceneRenderFn } from "../Models/Scenes";
import { emptyRender, emptyRenderEvent } from "../utils/Scenes";
import {KeyCallbackMap, keyCallbackFn} from '../eventManagers/keyPressed/models';
import { KeyEvents } from "../eventManagers/keyPressed";

type initOptions = {
    keyCallbackMap?: {
        [key in KeyEvents]?: KeyCallbackMap
    }
}

class GameObject {
    private gameInstance: Game;

    afterRender: RenderEvent;
    beforeDestroy: RenderEvent;
    afterDestroy: RenderEvent;
    
    public _keyCallbackMap: {
        [key in KeyEvents]: KeyCallbackMap
    }

    position: Vector2D;
    protected rotationAngle: number;

    id: string;

    constructor(gameInstance: Game, options?: initOptions){
        this.gameInstance = gameInstance;
        this.afterRender = emptyRenderEvent;
        this.beforeDestroy = emptyRenderEvent;
        this.afterDestroy = emptyRenderEvent;

        this.rotationAngle = 0;

        this._keyCallbackMap = {
            [KeyEvents.KeyDown]: {},
            [KeyEvents.KeyHeld]: {},
            [KeyEvents.KeyUp]: {},
            ...options?.keyCallbackMap,
        };

        this.id = Math.round(Math.random() * 0xFFFFFFFF).toString(16);

        this.position = new Vector2D(0,0);
        
    }

    set keyCallbackMap(map: {
        [key in KeyEvents]?: KeyCallbackMap
    }){
        this._keyCallbackMap = {
            ...this._keyCallbackMap,
            ...map,
        }
    }

    _render(canvas: Game["canvas"]){
        canvas.push();
        canvas.translate(this.position.x, this.position.y);
        canvas.rotate(this.rotationAngle);

        this.render(canvas);

        canvas.pop();
    }

    render(canvas: Game["canvas"]){}
    beforeRender(canvas: Game["canvas"]){}
    onLeftMouseButtonDown(canvas: Game["canvas"], mousePos: Vector2D, e?: MouseEvent){}
    onLeftMouseButtonHeld(canvas: Game["canvas"], mousePos: Vector2D, e?: MouseEvent){}
}

export default GameObject;
