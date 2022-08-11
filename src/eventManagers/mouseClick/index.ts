import Vector2D from '../../math/vector2d';
import Game from '../../game';
import GameObject from '../../gameObject';

export enum PointerEvents {
    RightButonDown = "rightButtonDown",
    LeftButtonDown = "leftButtonDown",
    RigthButtonUp = "rigthButtonUp",
    LeftButtonUp = "leftButtonUp",
    LeftButtonHeld = "leftButtonHeld",
    RightButtonHeld = "rightButtonHeld",
    ScrollButtonDown = "scrollButtonDown",
    ScrollButtonUp = "scrollButtonUp",
    ScrollDown = "scrollDown",
    ScrollUp = "scrollUp",
    ScrollHeld = "scrollHeld",
    DoubleLeftClick = "doubleLeftClick",
    DoubleRightClick = "doubleRightClick",
    MouseHover = "mouseHover",
    TouchStart = "touchStart",
    TouchEnd = "touchEnd",
    TouchMoved = "touchMoved",
}

export enum MouseButtons {
    LeftButton,
    Scroll,
    RightButton
}

export type PointerEventCallback = (canvas: Game["canvas"], mousePos: Vector2D, e?: MouseEvent) => any;

export type PointerEventCallbackMap = {
    [key in PointerEvents]?: PointerEventCallback[];
}

class PointerEventsManager {
    private game: Game;
    private buttonsHeld: MouseButtons[];
    private callbackMap: PointerEventCallbackMap;


    constructor(game: Game){
        this.game = game;
        this.buttonsHeld = [];
        this.callbackMap = {};
    
        document.getElementById('root')?.addEventListener('mousedown', e => {
            const clickedButton = e.button;
            if (clickedButton === MouseButtons.LeftButton) {
                this.handleLeftButtonDown(e);
            }
        });

        document.getElementById('root')?.addEventListener('mouseup', e => {
            const clickedButton = e.button;
            if (clickedButton === MouseButtons.LeftButton) {
                this.handleLeftButtonUp(e);
            }
        });

        game.addUpdateToQueue(() => {
            this.callbackMap.leftButtonHeld?.forEach(cb => {
                if (this.buttonsHeld.includes(MouseButtons.LeftButton))
                    cb(game.canvas, new Vector2D(game.canvas.mouseX, game.canvas.mouseY));
            });

            this.callbackMap.rightButtonHeld?.forEach(cb => {
                if (this.buttonsHeld.includes(MouseButtons.RightButton))
                    cb(game.canvas, new Vector2D(game.canvas.mouseX, game.canvas.mouseY));
            });

            this.callbackMap.scrollHeld?.forEach(cb => {
                if (this.buttonsHeld.includes(MouseButtons.Scroll))
                    cb(game.canvas, new Vector2D(game.canvas.mouseX, game.canvas.mouseY));
            });
        })
    }

    private upsertEventCallback(event: PointerEvents, callbacks: PointerEventCallback[]){
        if (!this.callbackMap[event]) this.callbackMap[event] = [];
        (this.callbackMap[event] as PointerEventCallback[]).push(...callbacks);
    }

    private handleLeftButtonDown(e: MouseEvent){
        this.buttonsHeld.push(MouseButtons.LeftButton);
        const mousePos = new Vector2D(e.clientX, e.clientY);

        this.callbackMap.leftButtonDown?.forEach(cb => {
            cb(this.game.canvas, mousePos, e);
        });
    }

    private handleLeftButtonUp(e: MouseEvent){
        this.buttonsHeld = this.buttonsHeld.filter(b => b !== MouseButtons.LeftButton);
        const mousePos = new Vector2D(e.clientX, e.clientY);

        this.callbackMap.leftButtonUp?.forEach(cb => {
            cb(this.game.canvas, mousePos, e);
        });
    }


    addCallbackMapFromGameObject(gameObject: GameObject){
        this.upsertEventCallback(PointerEvents.LeftButtonDown, [gameObject.onLeftMouseButtonDown.bind(gameObject)]);
        this.upsertEventCallback(PointerEvents.LeftButtonHeld, [gameObject.onLeftMouseButtonHeld.bind(gameObject)]);
    }


}

export default PointerEventsManager;
