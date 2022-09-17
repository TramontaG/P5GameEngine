import Hitbox, { HitboxType } from '../../gameObject/hitbox';

export type CollisionSides = {
	left: boolean;
	right: boolean;
	up: boolean;
	down: boolean;
};

export const checkCollisionBetween = (hb1: Hitbox, hb2: Hitbox) => {
	const { circle, square } = HitboxType;

	if (hb1.type === square && hb2.type === square) return collideSquareWithSquare(hb1, hb2);
};

const collideSquareWithSquare = (sq1: Hitbox, sq2: Hitbox) => {
	const sq1Bounds = getSquareBounds(sq1);
	const sq2Bounds = getSquareBounds(sq2);

	const horizontalOverlap = sq1Bounds.rightBound > sq2Bounds.leftBound && sq1Bounds.leftBound < sq2Bounds.rightBound;

	const verticalOverlap = sq1Bounds.lowerBound > sq2Bounds.upperBound && sq1Bounds.upperBound < sq2Bounds.lowerBound;

	if (verticalOverlap && horizontalOverlap) {
		const down = sq1Bounds.lowerBound > sq2Bounds.upperBound && sq1Bounds.upperBound < sq2Bounds.upperBound;
		const up = sq1Bounds.upperBound < sq2Bounds.lowerBound && sq1Bounds.lowerBound > sq2Bounds.lowerBound;
		const right = sq1Bounds.rightBound > sq2Bounds.leftBound && sq1Bounds.leftBound > sq2Bounds.leftBound;
		const left = sq1Bounds.leftBound < sq2Bounds.rightBound && sq1Bounds.rightBound > sq2Bounds.rightBound;

		return {
			up,
			down,
			left,
			right
		};
	}

	return undefined;
};

const getSquareBounds = (hb: Hitbox) => {
	const pos = hb.belongsTo.position;
	const halfXSize = hb.xSize / 2;
	const halfYSize = hb.ySize / 2;

	return {
		upperBound: pos.y - halfYSize,
		leftBound: pos.x - halfXSize,
		rightBound: pos.x + halfXSize,
		lowerBound: pos.y + halfXSize
	};
};
