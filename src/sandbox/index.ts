import SceneManager from '../Scenes/SceneManager';
import Game from '../Game';
import Layer from '../Scenes/Layer';
import KeyPressedEventManager from '../eventManagers/keyPressed';
import TestGameObject from './testGameObject';
import PointerEventsManager from '../eventManagers/mouseClick';
import Wall from './testGameObject/Wall';
import BouncingSquare from './testGameObject/BouncingSquare';

const game = new Game({
    height: 250,
    width: 250,
});

const sceneManager = new SceneManager(game);
const keyPressedEventManager = new KeyPressedEventManager(game);
const pointerEventsManager = new PointerEventsManager(game);
const wall = new Wall(game);
const bouncingSquare = new BouncingSquare(game)

game.gameReady.then(() => {
    const myGameObject = new TestGameObject(game);
    keyPressedEventManager.addCallbackMapFromGameObject(myGameObject);
    pointerEventsManager.addCallbackMapFromGameObject(myGameObject);

    sceneManager.createScene("scene1");

    sceneManager.pushLayerToScene("scene1", new Layer({
        beforeRender: (canvas) => {
            canvas.background(0, 0, 0);
        },
        gameObjects: [myGameObject, wall, bouncingSquare],
    }));

    sceneManager.setScene("scene1");
})

export default game;
