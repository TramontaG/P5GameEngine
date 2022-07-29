import Game from "game";

type Scene = {
    setup: (game: Game["canvas"]) => any;
    render: (game: Game["canvas"]) => any;
    onDestroy: (game: Game["canvas"]) => any;
    _setupAlreadyRan?: boolean;
}

type ScenesMap = {
    [key: string]: Scene;
}

class SceneManager {
    game: Game;
    activeScenes: Scene[];
    scenesMap: ScenesMap;


    constructor(game: Game){
        this.game = game;
        this.activeScenes = [];
        this.scenesMap = {};
        
        this.game.canvas.draw = this.renderScenes.bind(this);
    }

    renderScenes(){
        this.activeScenes.forEach(scene => {
            scene.render(this.game.canvas);
        });
    }

    pushScene(scene: Scene){
        scene.setup(this.game.canvas);
        console.log("scene setup RAN");

        this.activeScenes.push(scene);
    }

    popScene(){
        const lastScene = this.activeScenes.pop();
        lastScene?.onDestroy(this.game.canvas);
        if (this.activeScenes.length === 0) 
            console.warn("Careful! There are no scenes being rendered at the moment")
        return lastScene;
    }

    clearAllScenes() {
        while (this.activeScenes.length > 0) {
            this.popScene();
        }
    }

    setScene(scene: Scene){
        this.clearAllScenes();
        this.pushScene(scene);
    }
}

export default SceneManager;
