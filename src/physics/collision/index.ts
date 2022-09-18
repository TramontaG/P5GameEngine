import Vector2D from '../../math/vector2d';
import Hitbox, { HitboxType } from '../../gameObject/hitbox';
import GameObject from '../../gameObject';

export type CollisionSides = {
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
};

export const checkCollisionBetween = (hb1: Hitbox, hb2: Hitbox) => {
	const { circle, square } = HitboxType;

	if (hb1.type === square && hb2.type === square) {
		const sidesCollided = collideSquareWithSquare(hb1, hb2);

		if (sidesCollided?.down) preventVertcicalOverlap(hb1.belongsTo, hb1, hb2.belongsTo, hb2);
		if (sidesCollided?.up) preventVertcicalOverlap(hb2.belongsTo, hb2, hb1.belongsTo, hb1);
		if (sidesCollided?.left) preventHorizontalOverlap(hb2.belongsTo, hb2, hb1.belongsTo, hb1);
		if (sidesCollided?.right) preventHorizontalOverlap(hb1.belongsTo, hb1, hb2.belongsTo, hb2);

		return sidesCollided;
	}
};

const collideSquareWithSquare = (sq1: Hitbox, sq2: Hitbox) => {
	const sq1Bounds = getSquareBounds(sq1);
	const sq2Bounds = getSquareBounds(sq2);

	const horizontalOverlap = sq1Bounds.rightBound > sq2Bounds.leftBound && sq1Bounds.leftBound < sq2Bounds.rightBound;
	const verticalOverlap = sq1Bounds.lowerBound > sq2Bounds.upperBound && sq1Bounds.upperBound < sq2Bounds.lowerBound;

	if (verticalOverlap && horizontalOverlap) {
		const deltaX = getHitboxPosition(sq2).x - getHitboxPosition(sq1).x;
		const deltaY = getHitboxPosition(sq1).y - getHitboxPosition(sq2).y;

		const sides = {
			up: Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0,
			down: Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0,
			left: Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0,
			right: Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0
		};

		return sides;
	}

	return undefined;
};

export const collideSquareWithPoint = (sq1: Hitbox, point: Vector2D) => {
	const sq1Bounds = getSquareBounds(sq1);

	const verticalOverlap = point.x > sq1Bounds.leftBound && point.x < sq1Bounds.rightBound;
	const horizontalOverlap = point.y > sq1Bounds.upperBound && point.y < sq1Bounds.lowerBound;

	return verticalOverlap && horizontalOverlap;
};

const preventHorizontalOverlap = (go1: GameObject, sq1: Hitbox, go2: GameObject, sq2: Hitbox) => {
	if (!go1.solid || !go2.solid) return;
	const horizontalOverlapSize = getSquareBounds(sq1).rightBound - getSquareBounds(sq2).leftBound;

	if (Math.abs(horizontalOverlapSize) < 0) return;

	const go1OldPosition = go1.position.copy();
	const go2OldPosition = go2.position.copy();

	if (go1.imovable) {
		go2.position = new Vector2D(go2OldPosition.x + horizontalOverlapSize, go2OldPosition.y);
	} else if (go2.imovable) {
		go1.position = new Vector2D(go1OldPosition.x - horizontalOverlapSize, go1OldPosition.y);
	} else {
		go1.position = new Vector2D(go1OldPosition.x - horizontalOverlapSize / 2, go1OldPosition.y);
		go2.position = new Vector2D(go2OldPosition.x + horizontalOverlapSize / 2, go2OldPosition.y);
	}
};

const preventVertcicalOverlap = (go1: GameObject, sq1: Hitbox, go2: GameObject, sq2: Hitbox) => {
	if (!go1.solid || !go2.solid) return;
	const verticalOverlapSize = getSquareBounds(sq1).lowerBound - getSquareBounds(sq2).upperBound;

	if (Math.abs(verticalOverlapSize) < 0) return;

	const go1OldPosition = go1.position.copy();
	const go2OldPosition = go2.position.copy();

	if (go1.imovable) {
		go2.position = new Vector2D(go2OldPosition.x, go2OldPosition.y + verticalOverlapSize);
	} else if (go2.imovable) {
		go1.position = new Vector2D(go1OldPosition.x, go1OldPosition.y - verticalOverlapSize);
	} else {
		go1.position = new Vector2D(go1OldPosition.x, go1OldPosition.y - verticalOverlapSize / 2);
		go2.position = new Vector2D(go2OldPosition.x, go2OldPosition.y + verticalOverlapSize / 2);
	}
};

const getSquareBounds = (hb: Hitbox) => {
	const pos = hb.belongsTo.position;
	const halfXSize = hb.xSize / 2;
	const halfYSize = hb.ySize / 2;

	const bounds = {
		upperBound: pos.y + hb.offset.y - halfYSize,
		leftBound: pos.x + hb.offset.x - halfXSize,
		rightBound: pos.x + hb.offset.x + halfXSize,
		lowerBound: pos.y + hb.offset.y + halfXSize
	};

	return bounds;
};

const getHitboxPosition = (hb: Hitbox) => {
	return hb.belongsTo.position.add(hb.offset);
};
