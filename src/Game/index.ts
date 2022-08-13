import GameObject from '../gameObject';
import p5 from 'p5';
import SceneManager from '../Scenes/SceneManager';

type GameOptions = {
    width: number;
    height: number;
    fps?: number;
}

type UpdateFn = () => any;

type GameCanvas = p5

class Game {
    canvas: GameCanvas;
    gameReady: Promise<boolean>
    updateQueue: UpdateFn[];
    private sceneManagerInsance?: SceneManager;

    private resolver?: (ready: boolean) => any;

    constructor(options: GameOptions){
        this.gameReady = new Promise<boolean>(resolve => {
            this.resolver = resolve;
        })

        document.getElementById('root')?.addEventListener("contextmenu", e => e.preventDefault());

        const canvas = new p5((game: p5) => {
            game.setup = () => {
                game.resizeCanvas(options.width, options.height, false);
                game.background(0);
                this.setGameReady(this.resolver);
            }
            game.draw = this.updateFn.bind(this);
            game.frameRate(options.fps || 60);

            return game;
        }, document.getElementById('root') as HTMLElement);
        
        canvas.createCanvas(options.width, options.height);
        
        this.canvas = canvas;
        this.updateQueue = [];
    }

    public get sceneManager() {
        return this.sceneManagerInsance as SceneManager;
    }

    public set sceneManager(sm: SceneManager){
        this.sceneManagerInsance = sm;
    }

    public addUpdateToQueue(update: UpdateFn){
        this.updateQueue.push(update);
    }

    private setGameReady(resolve?: (ready: boolean) => any) {
        resolve?.(true);
    }

    private updateFn() {
        this.updateQueue.forEach(update => update());
    }

    set fps(fps: number) {
        this.canvas.frameRate(fps)
    }

}

export default Game;
