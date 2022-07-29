import p5 from 'p5';
import game from 'sandbox';

type GameOptions = {
    width: number;
    height: number;
    fps?: number;
}

type GameCanvas = p5

class Game {
    canvas: GameCanvas;
    gameReady: Promise<boolean>
    private resolver?: (ready: boolean) => any

    constructor(options: GameOptions){
        this.gameReady = new Promise<boolean>(resolve => {
            this.resolver = resolve;
        })

        const canvas = new p5((game: p5) => {
            game.setup = () => {
                game.resizeCanvas(options.width, options.height, false);
                game.background(0);
                console.log("Game ready");
                this.setGameReady(this.resolver);
            }
            game.frameRate(options.fps || 60);
            return game;
        }, document.getElementById('root') as HTMLElement);
        
        canvas.createCanvas(options.width, options.height);
        
        this.canvas = canvas;
    }

    setGameReady(resolve?: (ready: boolean) => any) {
        resolve?.(true);
    }

    set fps(fps: number) {
        this.canvas.frameRate(fps)
    }
}

export default Game;
