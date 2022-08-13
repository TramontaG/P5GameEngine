import SceneManager from '../Scenes/SceneManager';
import Game from '../game';
import Layer from '../Scenes/Layer';
import KeyPressedEventManager from '../eventManagers/keyPressed';
import TestGameObject from './testGameObject';
import PointerEventsManager from '../eventManagers/mouseClick';

const game = new Game({
    height: 250,
    width: 250,
});
const sceneManager = new SceneManager(game);
const keyPressedEventManager = new KeyPressedEventManager(game);
const pointerEventsManager = new PointerEventsManager(game);

game.gameReady.then(() => {
    const myGameObject = new TestGameObject(game);
    keyPressedEventManager.addCallbackMapFromGameObject(myGameObject);
    pointerEventsManager.addCallbackMapFromGameObject(myGameObject);

    sceneManager.createScene("scene1");

    sceneManager.pushLayerToScene("scene1", new Layer({
        beforeRender: (canvas) => {
            canvas.background(255, 0, 0);
        },
        gameObjects: [myGameObject],
    }));

    sceneManager.setScene("scene1");
})

export default game;
