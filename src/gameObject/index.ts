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

    beforeRender: RenderEvent;
    afterRender: RenderEvent;
    beforeDestroy: RenderEvent;
    afterDestroy: RenderEvent;
    
    public _keyCallbackMap: {
        [key in KeyEvents]: KeyCallbackMap
    }

    position: Vector2D;

    id: string;

    constructor(gameInstance: Game, options?: initOptions){
        this.gameInstance = gameInstance;
        this.beforeRender = emptyRenderEvent;
        this.afterRender = emptyRenderEvent;
        this.beforeDestroy = emptyRenderEvent;
        this.afterDestroy = emptyRenderEvent;

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

    render(canvas: Game["canvas"]){}
    
}

export default GameObject;
