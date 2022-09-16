import Hitbox, { HitboxType } from "../../gameObject/hitbox";

export const checkCollisionBetween = (hb1: Hitbox, hb2: Hitbox) => {
    const  {circle, square} = HitboxType;

    if (hb1.type === square && hb2.type === square)
        return collideSquareWithSquare(hb1, hb2);

}

const collideSquareWithSquare = (sq1: Hitbox, sq2: Hitbox) => {
    const sq1Bounds = getSquareBounds(sq1);
    const sq2Bounds = getSquareBounds(sq2);

    const horizontalOverlap = sq1Bounds.rightBound > sq2Bounds.leftBound &&
                              sq1Bounds.leftBound < sq2Bounds.rightBound;    
    
    const verticalOverlap = sq1Bounds.lowerBound > sq2Bounds.upperBound &&
                            sq1Bounds.upperBound < sq2Bounds.lowerBound

    return verticalOverlap && horizontalOverlap;
}

const getSquareBounds = (hb: Hitbox) => {
    const pos = hb.belongsTo.position;
    const halfXSize = hb.xSize / 2;
    const halfYSize = hb.ySize / 2;

    return {
        upperBound: pos.y - halfYSize,
        leftBound: pos.x - halfXSize,
        rightBound: pos.x + halfXSize,
        lowerBound: pos.y + halfXSize,
    }
}