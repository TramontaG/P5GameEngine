import { Game } from "index";

type Scene = {
    setup: () => any;
    update: () => any;
}

type ScenesMap = {
    [key: string]: Scene;
}

class SceneManager {
    gameInstance: Game;
    activeScenes: Scene[];
    scenesMap: ScenesMap;

    constructor(gameInstance: Game){
        this.gameInstance = gameInstance;
        this.activeScenes = [];
        this.scenesMap = {};

        
    }

    addScene(scene: Scene){
        this.activeScenes
    }



}
