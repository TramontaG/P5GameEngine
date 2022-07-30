import GameObject from '../../gameObject';
import {KeyCallbackMap, keyCallbackFn, AllKeyEventsCallbackMap} from './models';

class KeyPressedEventManager {

    allKeyEvents: AllKeyEventsCallbackMap

    constructor(){
        this.allKeyEvents = {}

        document.addEventListener('keypress', e => {
            console.log(e.key);
            Object.keys(this.allKeyEvents).forEach(key => {
                const allCallbacks = this.allKeyEvents[key];
                if (e.key === key){
                    allCallbacks.forEach(callback => {
                        callback(e);
                    })
                }
            })
        })
    }

    addCallback(key: string, callback: keyCallbackFn){
        if (!this.allKeyEvents[key]) this.allKeyEvents[key] = [];
        this.allKeyEvents[key].push(callback);
    }

    addCallbackMapFromGameObject(gameObject: GameObject){
        Object.keys(gameObject.keyCallbackMap).forEach(key => {
            this.addCallback(key, gameObject.keyCallbackMap[key]);
        }) 
    }
}

export default KeyPressedEventManager;
