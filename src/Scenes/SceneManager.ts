import GameObject from '../gameObject';
import Game from '../game';
import Layer from './Layer';

type ScenesMap = {
	[key: string]: Layer[];
};

class SceneManager {
	game: Game;
	scenesMap: ScenesMap;
	private currentSceneName: keyof ScenesMap = '';

	constructor(game: Game) {
		this.game = game;
		game.sceneManager = this;
		game.addUpdateToQueue(this.renderScenes.bind(this));
		this.scenesMap = {};
	}

	setScene(sceneName: keyof ScenesMap) {
		this.currentSceneName = sceneName;
	}

	get currentScene() {
		return this.scenesMap[this.currentSceneName];
	}

	getSceneByName(name: keyof ScenesMap) {
		return this.scenesMap[name];
	}

	renderScenes() {
		this.currentScene.forEach((layer) => {
			layer.beforeRender(this.game.canvas);
			layer.render(this.game);
			layer.afterRender(this.game.canvas);
		});
	}

	pushLayerToScene(sceneName: string, layer: Layer) {
		layer.setup(this.game.canvas);
		this.getSceneByName(sceneName).push(layer);
	}

	popLayerFromCurrentScene() {
		const lastLayer = this.currentScene[this.currentScene.length - 1];
		lastLayer.beforeDestroy(this.game.canvas);
		this.currentScene.pop();
		lastLayer.afterDestroy(this.game.canvas);
		return lastLayer;
	}

	createScene(sceneName: string) {
		if (this.scenesMap[sceneName]) return this.scenesMap[sceneName];
		const scene = [] as Layer[];
		this.scenesMap[sceneName] = scene;
		return scene;
	}

	getLayersWithGameObject(gameObject: GameObject) {
		return this.currentScene.filter((layer) => {
			return layer.gameObjects[gameObject.id];
		});
	}

	getAllGameObjectsInCurrentScene() {
		return this.currentScene
			.map((layer) => {
				return Object.values(layer.gameObjects);
			})
			.flat(1);
	}
}

export default SceneManager;
