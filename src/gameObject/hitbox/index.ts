import Game from '../../game';
import GameObject from '..';
import Vector2D from '../../math/vector2d';

type HitboxOptions = {
	debug?: boolean;
	offset?: Vector2D;
	xSize: number;
	ySize: number;
};

export enum HitboxType {
	square,
	circle
}

class Hitbox {
	belongsTo: GameObject;
	debug: boolean;
	offset: Vector2D;
	type: HitboxType;

	xSize: number;
	ySize: number;

	constructor(gameObject: GameObject, type: HitboxType, options: HitboxOptions) {
		this.belongsTo = gameObject;
		this.debug = options.debug || false;
		this.offset = options.offset || new Vector2D(0, 0);
		this.type = type;

		this.xSize = options.xSize;
		this.ySize = options.ySize;
	}

	render(canvas: Game['canvas']) {
		if (!this.debug) return;

		canvas.fill(255, 0, 255, 100);
		canvas.rectMode('center');
		canvas.stroke(255, 0, 255);

		if (this.type === HitboxType.square) {
			canvas.rect(this.offset.x, this.offset.y, this.xSize, this.ySize);
		}

		if (this.type === HitboxType.circle) canvas.ellipse(this.offset.x, this.offset.y, this.xSize, this.ySize);
	}
}

export default Hitbox;
