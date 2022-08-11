import Game from "../game";
import GameObject from "../gameObject";
import { RenderEvent, SceneRenderFn } from "../Models/Scenes"
import { emptyRender, emptyRenderEvent } from "../utils/Scenes";

type LayerConstructorProps = {
    setup?: SceneRenderFn,
    render?: SceneRenderFn,
    gameObjects?: GameObject[];
    shouldRender?: boolean;
    beforeRender?: RenderEvent;
    afterRender?: RenderEvent;
    beforeDestroy?: RenderEvent;
    afterDestroy?: RenderEvent;
}

type GameObjectMap = {
    [key: string]: GameObject;
}


class Layer {
    shouldRender: boolean;
    setup: SceneRenderFn;
    beforeRender: RenderEvent;
    afterRender: RenderEvent;
    beforeDestroy: RenderEvent;
    afterDestroy: RenderEvent;
    gameObjects: GameObjectMap;

    constructor(props: LayerConstructorProps){
        this.shouldRender = props.shouldRender || true;
        this.setup = props.setup || emptyRender;
        this.beforeRender = props.beforeRender || emptyRenderEvent;
        this.afterRender = props.afterRender || emptyRenderEvent;
        this.beforeDestroy = props.beforeDestroy || emptyRenderEvent;
        this.afterDestroy = props.afterDestroy || emptyRender;

        this.gameObjects = {};
        props.gameObjects?.forEach(gameObject => {
            this.registerGameObject(gameObject.id, gameObject);
        });
    }

    render(game: Game){
        Object.values(this.gameObjects).forEach(gameObject => {
            gameObject.beforeRender(game.canvas);
            gameObject._render(game.canvas);
        });

    }

    registerGameObject(key: keyof GameObjectMap, gameObject: GameObject) {
        if (this.gameObjects[key]) throw ([
            "There is already a Game Object with this name.",
            "Please use Game.upsertGameObject to update it, or make sure you unregister it before trying to register again."
        ].join('\n'));

        this.gameObjects[key] = gameObject;
        return this.gameObjects;
    }

    upsertGameObject(key: keyof GameObjectMap, gameObject: GameObject){
        this.gameObjects[key] = gameObject;
        return this.gameObjects;
    }

    unregisterGameObject(key: keyof GameObjectMap) {
        delete this.gameObjects[key];
    }
}

export default Layer;
