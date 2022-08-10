import Game from '../../game';
import GameObject from '../../gameObject';
import {KeyCallbackMap, keyCallbackFn, AllKeyEventsCallbackMap} from './models';

export enum KeyEvents {
    KeyDown = "keyDown",
    KeyUp = "keyUp",
    KeyHeld = "keyHeld",
}

class KeyPressedEventManager {
    private game: Game;

    onKeyDownCallbacks: AllKeyEventsCallbackMap
    onKeyUpCallbacks: AllKeyEventsCallbackMap;
    onKeyHeldCallbacks: AllKeyEventsCallbackMap;

    keysHeld: string[];

    constructor(game: Game){
        this.game = game;

        this.onKeyDownCallbacks = {}
        this.onKeyUpCallbacks = {};
        this.onKeyHeldCallbacks = {};

        this.keysHeld = [];

        game.canvas.keyPressed = this.keyPressedUpdateFn.bind(this);
        game.canvas.keyReleased = this.keyReleasedUpdateFN.bind(this);
        game.addUpdateToQueue(this.keyHeldUpdateFn.bind(this));
    }

    private keyPressedUpdateFn(){
        const keypressed = this.game.canvas.key;
        this.keysHeld.push(keypressed);

        Object.keys(this.onKeyDownCallbacks).forEach(key => {
            const allCallbacks = this.onKeyDownCallbacks[key];
        
            if (this.game.canvas.key === key){
                allCallbacks.forEach(callback => {
                    callback(this.game.canvas);
                })
            }
        });
    }

    private keyReleasedUpdateFN(){
        const keyreleased = this.game.canvas.key;
        this.keysHeld = this.keysHeld.filter(k => k !== keyreleased);
        Object.keys(this.onKeyUpCallbacks).forEach(key => {
            const allCallbacks = this.onKeyUpCallbacks[key];
        
            if (this.game.canvas.key === key){
                allCallbacks.forEach(callback => {
                    callback(this.game.canvas);
                })
            }
        });
    }

    private keyHeldUpdateFn(){
        Object.keys(this.onKeyHeldCallbacks).forEach(key => {
            const allCallbacks = this.onKeyHeldCallbacks[key];
        
            if (this.keysHeld.includes(key)){
                allCallbacks.forEach(callback => {
                    callback(this.game.canvas);
                })
            }
        });
    }

    private onKeyDown(key: string, callback: keyCallbackFn){
        if (!this.onKeyDownCallbacks[key]) this.onKeyDownCallbacks[key] = [];
        this.onKeyDownCallbacks[key].push(callback);
    }

    private onKeyUp(key: string, callback: keyCallbackFn){
        if (!this.onKeyUpCallbacks[key]) this.onKeyUpCallbacks[key] = [];
        this.onKeyUpCallbacks[key].push(callback);
    }

    private onKeyHeld(key: string, callback: keyCallbackFn){
        if (!this.onKeyHeldCallbacks[key]) this.onKeyHeldCallbacks[key] = [];
        this.onKeyHeldCallbacks[key].push(callback);
    }

    public addCallBackMap(event: KeyEvents, map: KeyCallbackMap){
        const addMap = (adderFn: (key: string, cb: keyCallbackFn) => void) => {
            Object.keys(map).forEach(key => {
                adderFn(key, map[key]);
            })
        }

        if (event === KeyEvents.KeyDown) addMap(this.onKeyDown.bind(this));
        if (event === KeyEvents.KeyUp) addMap (this.onKeyUp.bind(this));
        if (event === KeyEvents.KeyHeld) addMap( this.onKeyHeld.bind(this));
    }

    public addCallbackMapFromGameObject(gameObject: GameObject){
        this.addCallBackMap(KeyEvents.KeyDown, gameObject._keyCallbackMap.keyDown);
        this.addCallBackMap(KeyEvents.KeyHeld, gameObject._keyCallbackMap.keyHeld);
        this.addCallBackMap(KeyEvents.KeyUp, gameObject._keyCallbackMap.keyUp);

        const eventCbs = {
            keyDown: this.onKeyDownCallbacks,
            keyUp: this.onKeyUpCallbacks,
            keyHeld: this.onKeyHeldCallbacks,
        }
    }
}

export default KeyPressedEventManager;
