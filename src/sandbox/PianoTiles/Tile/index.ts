import Vector2D from '../../../math/vector2d';
import Game from '../../../game';
import GameObject from '../../../gameObject';
import Hitbox, { HitboxType } from '../../../gameObject/hitbox';
import { CollisionSides } from 'physics/collision';
import Board from '../Board';

class Tile extends GameObject {
	size: number;
	key: string;

	constructor(game: Game, startingPos: Vector2D, endingPos: Vector2D, key: string) {
		super(game);

		this.position = startingPos;

		this.velocityAsVector = new Vector2D(endingPos.subtract(startingPos).setMag(2).x, 2);

		this.size = 10;

		this.hitboxes.push(
			new Hitbox(this, HitboxType.square, {
				xSize: this.size,
				ySize: this.size,
				// debug: true,
				offset: new Vector2D(0, 0)
			})
		);
		this.key = key;
	}

	render(canvas: Game['canvas']) {
		canvas.ellipse(0, 0, this.size, this.size);
	}

	update() {
		this.size += 50 / 225;
		this.velocityAsVector = this.velocityAsVector.multiply(1.02);
		this.hitboxes[0].xSize = this.size;
		this.hitboxes[0].ySize = this.size;
	}

	handleExitScreen() {
		this.delete();
	}

	handleCollision(other: GameObject, sides: CollisionSides) {
		if (other.is(Board)) {
			if (this.gameInstance.keyHandler.keysHeld.includes(this.key)) {
				console.log('HITTED ME');
				this.delete();
			}
		}
		return false;
	}
}

export default Tile;
