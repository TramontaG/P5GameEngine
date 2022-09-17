import Vector2D from '../../math/vector2d';
import Game from '../../game';
import GameObject from '../../gameObject';
import Hitbox, { HitboxType } from '../../gameObject/hitbox';
import Wall from './Wall';
import { CollisionSides } from '../../physics/collision';

class BouncingSquare extends GameObject {
	width: number;
	height: number;

	jumpCount: number;
	maxJumps: number;
	jumpRequest?: NodeJS.Timeout;

	constructor(game: Game) {
		super(game);

		this.position = new Vector2D(80, 40);
		this.width = 10;
		this.height = 10;
		this.solid = true;

		this.maxJumps = 2;
		this.jumpCount = this.maxJumps;

		this.hitboxes.push(
			new Hitbox(this, HitboxType.square, {
				xSize: this.width,
				ySize: this.height,
				debug: true
			})
		);

		this.keyCallbackMap = {
			keyDown: {
				[' ']: this.requestJump.bind(this)
			}
		};

		this.setGravity(1);
	}

	requestJump() {
		if (this.jumpCount > 0) return this.jump();
		this.jumpRequest = setTimeout(() => {
			this.clearJumpRequest();
		}, 100);
	}

	jump() {
		if (this.jumpRequest) {
			this.clearJumpRequest();
		}
		this.velocityAsVector = new Vector2D(0, -2);
		this.jumpCount--;
		return true;
	}

	clearJumpRequest() {
		if (this.jumpRequest) clearInterval(this.jumpRequest);
		this.jumpRequest = undefined;
	}

	handleCollision(other: GameObject, sides: CollisionSides) {
		if (other.is(Wall)) {
			this.jumpCount = this.maxJumps;
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
	}

	render(canvas: Game['canvas']) {
		canvas.rectMode('center');
		canvas.fill(255, 255, 0);
		canvas.rect(0, 0, this.width, this.height);
	}
}

export default BouncingSquare;
