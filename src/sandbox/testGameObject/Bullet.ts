import Hitbox, { HitboxType } from '../../gameObject/hitbox';
import Vector2D from 'math/vector2d';
import Game from '../../game';
import GameObject from '../../gameObject';
import Wall from './Wall';

class Bullet extends GameObject {
	constructor(game: Game, pos: Vector2D, vel: number, angle: number) {
		super(game);
		this.position = pos;
		this.velocity = vel;
		this.rotationAngle = angle;

		this.hitboxes.push(
			new Hitbox(this, HitboxType.square, {
				xSize: 10,
				ySize: 10,
				debug: true
			})
		);
	}

	render(canvas: import('p5')): void {
		canvas.fill(0, 0, 255);
		canvas.noStroke();
		canvas.circle(0, 0, 3);
	}

	handleCollision(other: GameObject) {
		if (other.is(Wall)) {
			this.delete();
		}
		return false;
	}

	handleExitScreen() {
		this.delete();
	}
}

export default Bullet;
