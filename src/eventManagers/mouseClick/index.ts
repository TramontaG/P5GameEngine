import Vector2D from '../../math/vector2d';
import Game from '../../Game';
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

type eventMap = {
    [key in MouseButtons]: (e: MouseEvent) => any
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

            const eventMap: eventMap = {
                [MouseButtons.LeftButton]: this.handleLeftButtonDown.bind(this),
                [MouseButtons.RightButton]: this.handleRightButtonDown.bind(this),
                [MouseButtons.Scroll]: (e) => undefined
            }

            return eventMap[clickedButton as MouseButtons]?.(e);
        });

        document.getElementById('root')?.addEventListener('mouseup', e => {
            const clickedButton = e.button;

            const eventMap: eventMap = {
                [MouseButtons.LeftButton]: this.handleLeftButtonUp.bind(this),
                [MouseButtons.RightButton]: this.handleRightButtonUp.bind(this),
                [MouseButtons.Scroll]: (e) => undefined
            }

            return eventMap[clickedButton as MouseButtons]?.(e);
        });

        document.getElementById("root")?.addEventListener("scroll", e => {
            // I`m wodking without a mouse rn, gonna code that later lmao
            console.log(e);
        })

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

    private handleButtonDown(e: MouseEvent, button: MouseButtons){
        this.buttonsHeld.push(button);
        return new Vector2D(e.clientX, e.clientY);
    }

    private handleButtonUp(e: MouseEvent, button: MouseButtons){
        this.buttonsHeld = this.buttonsHeld.filter(b => b !== button);
        return new Vector2D(e.clientX, e.clientY);
    }

    private handleLeftButtonDown(e: MouseEvent){
        const mousePos = this.handleButtonDown(e, MouseButtons.LeftButton);

        this.callbackMap.leftButtonDown?.forEach(cb => {
            cb(this.game.canvas, mousePos, e);
        });
    }

    private handleLeftButtonUp(e: MouseEvent){
        const mousePos = this.handleButtonUp(e, MouseButtons.LeftButton);

        this.callbackMap.leftButtonUp?.forEach(cb => {
            cb(this.game.canvas, mousePos, e);
        });
    }
    
    private handleRightButtonDown(e: MouseEvent){
        const mousePos = this.handleButtonDown(e, MouseButtons.RightButton);

        this.callbackMap.rightButtonDown?.forEach(cb => {
            cb(this.game.canvas, mousePos, e);
        });
    }

    private handleRightButtonUp(e: MouseEvent){
        const mousePos = this.handleButtonUp(e, MouseButtons.RightButton);

        this.callbackMap.rigthButtonUp?.forEach(cb => {
            cb(this.game.canvas, mousePos, e);
        });
    }


    addCallbackMapFromGameObject(gameObject: GameObject){
        this.upsertEventCallback(PointerEvents.LeftButtonDown, [gameObject.onLeftMouseButtonDown.bind(gameObject)]);
        this.upsertEventCallback(PointerEvents.LeftButtonHeld, [gameObject.onLeftMouseButtonHeld.bind(gameObject)]);
        this.upsertEventCallback(PointerEvents.LeftButtonUp, [gameObject.onLeftMouseButtonUp.bind(gameObject)]);
        this.upsertEventCallback(PointerEvents.RightButonDown, [gameObject.onRightMouseButtonDown.bind(gameObject)]);
        this.upsertEventCallback(PointerEvents.RightButtonHeld, [gameObject.onRightMouseButtonHeld.bind(gameObject)]);
        this.upsertEventCallback(PointerEvents.RigthButtonUp, [gameObject.onRightMouseButtonUp.bind(gameObject)]);
    }


}

export default PointerEventsManager;
