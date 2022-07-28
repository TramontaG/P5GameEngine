import Game from './Game';

const game = new Game({
    height: 250,
    width: 250,
});

console.log(game);

let size = 0;

const updateCanvas = (g: typeof game.instance) => {
    size += 0.1;
    g.update((canvas) => {
        canvas.stroke(255);
        canvas.square(10,10, size);
    })
    setTimeout(() => updateCanvas(g), 1/60);
}

updateCanvas(game.instance);
