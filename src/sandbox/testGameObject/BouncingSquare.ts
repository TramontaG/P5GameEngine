import Vector2D from '../../math/vector2d';
import Game from '../../game';
import GameObject from '../../gameObject';
import Hitbox, { HitboxType } from '../../gameObject/hitbox';
import Wall from './Wall';
import { CollisionSides } from '../../physics/collision';

class BouncingSquare extends GameObject {
	width: number;
	height: number;

	constructor(game: Game) {
		super(game);

		this.position = new Vector2D(80, 40);
		this.width = 10;
		this.height = 10;
		this.solid = true;

		this.hitboxes.push(
			new Hitbox(this, HitboxType.square, {
				xSize: this.width,
				ySize: this.height,
				debug: true
			})
		);

		this.setGravity(1);
		console.log(this);
	}

	handleCollision(other: GameObject, sides: CollisionSides) {
		if (other.is(Wall)) {
			return this.bounce(sides, 0.8);
		}
		return false;
	}

	onLeftDragMe(_: Game['canvas'], mousePos: Vector2D) {
		this.disableMovement = true;
		this.position = mousePos.copy();
	}

	onLeftMouseButtonUp() {
		this.velocityAsVector = new Vector2D(0, 0);
		this.beingDragged = false;
	}

	render(canvas: Game['canvas']) {
		canvas.rectMode('center');
		canvas.fill(255, 255, 0);
		canvas.rect(0, 0, this.width, this.height);
	}
}

export default BouncingSquare;
