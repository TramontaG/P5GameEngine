import SceneManager from '../Scenes/SceneManager';
import Game from '../game';
import Layer from '../Scenes/Layer';
import KeyPressedEventManager from '../eventManagers/keyPressed';

import Board from './PianoTiles/Board';

const game = new Game({
	height: 250,
	width: 250
});

const sceneManager = new SceneManager(game);
const keyPressedEventManager = new KeyPressedEventManager(game);

const board = new Board(game);

game.gameReady.then(() => {
	sceneManager.createScene('scene1');
	sceneManager.setScene('scene1');

	sceneManager.pushLayerToScene(
		'scene1',
		new Layer({
			beforeRender: (canvas) => {
				canvas.background(0, 0, 0);
			},
			gameObjects: [board]
		})
	);

	keyPressedEventManager.addCallbackMapFromCurrentScene();
});

export default game;
