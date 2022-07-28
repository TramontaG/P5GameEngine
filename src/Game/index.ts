import p5 from 'p5';

type GameOptions = {
    width: number;
    height: number;
    fps?: number;
}

type GameCanvas = p5 & {
    update: (cb: (canvas: p5) => any) => any;
}

class Game {
    fps: number  = 60;
    instance: GameCanvas;

    constructor(options: GameOptions){
        const canvas = new p5((game: p5) => {
            game.setup = () => {
                game.resizeCanvas(options.width, options.height);
                game.fill(0);
            }
            return game;
        }, document.getElementById('root') as HTMLElement);

        canvas.createCanvas(options.width, options.height);
        canvas.setup();

        const gameCanvas = {
            ...canvas,
            update: (cb: (canvas: p5) => any) => {
                console.log('updating');
                cb(canvas);
            }
        }

        this.fps = options.fps || 60;
        this.instance = gameCanvas as p5 & {
            update: (cb: (canvas: p5) => any) => any;
        };
    }    
}

export default Game;
