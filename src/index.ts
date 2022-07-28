import p5 from 'p5';

const canvas = new p5((game) => {
    game.width = 250;
    game.heigt = 250;
    game.setup = () => game.fill(0);
    game.update = () => {};
    return game;
}, document.getElementById('root') as HTMLElement)
const framerate = 60;
const pregame = canvas.createCanvas(250,250)

let size = 0;

const game = {
    ...canvas,
    width: 250,
    height: 250,
    setup: () => canvas.fill(0),
    update: (cb: () => any) => {
        console.log("updating canvas");
        cb();
    }
}

game.setup();

console.log({game});



const updateCanvas = (g: typeof game) => {
    g.update(() => {
        size += 0.1;
        canvas.stroke(255);
        canvas.square(10,10, size);
    })
    setTimeout(() => updateCanvas(game), 1/framerate);
}

updateCanvas(game);
