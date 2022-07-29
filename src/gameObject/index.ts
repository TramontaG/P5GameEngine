import Game from "../game";
import { RenderEvent, SceneRenderFn } from "../Models/Scenes";
import { emptyRender, emptyRenderEvent } from "../utils/Scenes";

class GameObject {
    private gameInstance: Game;

    render: SceneRenderFn;
    beforeRender: RenderEvent;
    afterRender: RenderEvent;
    beforeDestroy: RenderEvent;
    afterDestroy: RenderEvent;

    id: string;

    constructor(gameInstance: Game){
        this.gameInstance = gameInstance;
        this.render = emptyRender;  
        this.beforeRender = emptyRenderEvent;
        this.afterRender = emptyRenderEvent;
        this.beforeDestroy = emptyRenderEvent;
        this.afterDestroy = emptyRenderEvent;

        this.id = Math.round(Math.random() * 0xFFFFFFFF).toString(16);
    }


}

export default GameObject;
