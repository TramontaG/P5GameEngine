import Game from "game";
import Layer from "./Layer";

type ScenesMap = {
    [key: string]: Layer[];
}

class SceneManager {
    game: Game;
    scenesMap: ScenesMap;
    private currentSceneName: keyof ScenesMap = "";

    constructor(game: Game){
        this.game = game;
        this.scenesMap = {};
        
        this.game.canvas.draw = this.renderScenes.bind(this);
    }

    setScene(sceneName: keyof ScenesMap){
        this.currentSceneName = sceneName;
    }
    
    get currentScene(){
        return this.scenesMap[this.currentSceneName];
    }

    getSceneByName(name: keyof ScenesMap){
        return this.scenesMap[name];
    }

    renderScenes(){
        this.currentScene.forEach(layer => {
            layer.beforeRender(this.game.canvas);
            layer.render(this.game);
            layer.afterRender(this.game.canvas);
        }); 
    }

    pushLayerToScene(sceneName: string, layer: Layer){
        layer.setup(this.game.canvas);
        this.getSceneByName(sceneName).push(layer);
    }

    popLayerFromCurrentScene(){
        const lastLayer = this.currentScene[this.currentScene.length - 1];
        lastLayer.beforeDestroy(this.game.canvas);
        this.currentScene.pop();
        lastLayer.afterDestroy(this.game.canvas);
        return lastLayer;
    }

    createScene(sceneName: string){
        if (this.scenesMap[sceneName]) return;
        this.scenesMap[sceneName] = [];
    }
}

export default SceneManager;
