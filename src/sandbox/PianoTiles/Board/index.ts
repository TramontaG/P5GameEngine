import Vector2D from '../../../math/vector2d';
import Game from '../../../game';
import GameObject from '../../../gameObject';
import Hitbox, { HitboxType } from '../../../gameObject/hitbox';
import Tile from '../Tile';
import { render } from './Model';

class Board extends GameObject {
	hitPos: number[];
	startingPos: number[];
	hitWindowHeight: number;

	keys: string[];

	constructor(game: Game) {
		super(game);
		this.position = new Vector2D(0.1, 0.1);

		this.hitPos = [0, 1, 2, 3, 4].map((n) => 30 + n * 48);
		this.startingPos = [0, 1, 2, 3, 4].map((n) => 65 + n * 30);
		this.hitWindowHeight = 225;

		this.hitboxes = this.hitPos.map(
			(pos) =>
				new Hitbox(this, HitboxType.square, {
					xSize: 35,
					ySize: 45,
					// debug: true,
					offset: new Vector2D(pos, this.hitWindowHeight)
				})
		);

		this.keyCallbackMap = {
			keyDown: {
				' ': this.spawnNote.bind(this)
			}
		};

		this.keys = ['a', 's', 'j', 'k', 'l'];

		setInterval(() => this.spawnNote(), 100);
	}

	render(canvas: Game['canvas']) {
		render(canvas, this);
	}

	spawnNote() {
		const randomIndex = Math.round(Math.random() * (this.startingPos.length - 1));
		const randomStart = this.startingPos[randomIndex];
		const startingPos = new Vector2D(randomStart, 0);
		const endingPos = new Vector2D(this.hitPos[randomIndex], 255);

		this.spawn(new Tile(this.gameInstance, startingPos, endingPos, this.keys[randomIndex]));
	}
}

export default Board;
